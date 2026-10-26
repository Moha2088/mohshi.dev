import { animate } from 'motion';
import {
  cancelFrame,
  frame,
  motionValue,
  press,
  transformValue,
  type AnimationPlaybackControls,
  type MotionValue,
  type Process,
} from 'motion-dom';
import { threeEffect } from 'motion/three';
import * as THREE from 'three/webgpu';
import type { UniformNode } from 'three/webgpu';
import {
  attribute,
  cos,
  mix,
  positionLocal,
  sin,
  time,
  uniform,
  vec3,
} from 'three/tsl';

interface LoadedPhoto {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
  map: THREE.Texture;
}

export interface ParticleMorphController {
  dispose: () => void;
}

type FloatUniform = UniformNode<'float', number>;

const COLUMNS = 200;
const PHOTO_URLS = ['/my-image.jpg'];

const highResolutionMix = (globeAmount: number) => {
  const amount = Math.max(globeAmount, 0);
  const start = 0.005;
  const end = 0.035;
  const t = Math.min(1, Math.max(0, (amount - start) / (end - start)));

  return 1 - t * t * (3 - 2 * t);
};

const pickPhoto = () => {
  if (PHOTO_URLS.length === 1) {
    return PHOTO_URLS[0];
  }

  const previousPhoto = sessionStorage.getItem('three-tsl-photo');
  const photoChoices = PHOTO_URLS.filter((photo) => photo !== previousPhoto);

  return (
    photoChoices[Math.floor(Math.random() * photoChoices.length)] ??
    PHOTO_URLS[0]
  );
};

const loadPhoto = (url: string) =>
  new Promise<LoadedPhoto>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const source = document.createElement('canvas');
      source.width = image.naturalWidth;
      source.height = image.naturalHeight;

      const context = source.getContext('2d', {
        willReadFrequently: true,
      });

      if (!context) {
        reject(new Error('Could not create a 2D canvas context'));
        return;
      }

      context.drawImage(image, 0, 0);

      const map = new THREE.Texture(image);
      map.colorSpace = THREE.SRGBColorSpace;
      map.needsUpdate = true;

      resolve({
        width: source.width,
        height: source.height,
        pixels: context.getImageData(0, 0, source.width, source.height).data,
        map,
      });
    };

    image.onerror = () => reject(new Error('Could not load the photograph'));
    image.src = url;
  });

const createParticles = (photo: LoadedPhoto, globe: FloatUniform) => {
  const imageAspect = photo.width / photo.height;
  const rows = Math.round(COLUMNS / imageAspect);
  const count = COLUMNS * rows;
  const imagePositions = new Float32Array(count * 3);
  const globePositions = new Float32Array(count * 3);
  const colours = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const colour = new THREE.Color();

  for (let index = 0; index < count; index++) {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const sampleX = Math.min(
      photo.width - 1,
      Math.floor(((column + 0.5) / COLUMNS) * photo.width),
    );
    const sampleY = Math.min(
      photo.height - 1,
      Math.floor(((row + 0.5) / rows) * photo.height),
    );
    const pixel = (sampleY * photo.width + sampleX) * 4;
    const offset = index * 3;

    colour.setRGB(
      photo.pixels[pixel] / 255,
      photo.pixels[pixel + 1] / 255,
      photo.pixels[pixel + 2] / 255,
      THREE.SRGBColorSpace,
    );
    colours[offset] = colour.r;
    colours[offset + 1] = colour.g;
    colours[offset + 2] = colour.b;
    phases[index] = Math.random() * Math.PI * 2;
    speeds[index] = 0.7 + Math.random() * 0.35;
  }

  const geometry = new THREE.InstancedBufferGeometry().copy(
    new THREE.PlaneGeometry(1, 1) as unknown as THREE.InstancedBufferGeometry,
  );
  geometry.instanceCount = count;
  geometry.setAttribute(
    'imagePosition',
    new THREE.InstancedBufferAttribute(imagePositions, 3),
  );
  geometry.setAttribute(
    'globePosition',
    new THREE.InstancedBufferAttribute(globePositions, 3),
  );
  geometry.setAttribute(
    'colour',
    new THREE.InstancedBufferAttribute(colours, 3),
  );
  geometry.setAttribute('phase', new THREE.InstancedBufferAttribute(phases, 1));
  geometry.setAttribute('speed', new THREE.InstancedBufferAttribute(speeds, 1));

  const imagePosition = attribute<'vec3'>('imagePosition');
  const spherePosition = attribute<'vec3'>('globePosition');
  const phase = attribute<'float'>('phase');
  const speed = attribute<'float'>('speed');
  const particleSize = uniform(new THREE.Vector2(0.01, 0.01));
  const turbulence = vec3(
    sin(
      time
        .mul(speed.add(0.6))
        .add(phase),
    ).mul(0.045),
    cos(
      time
        .mul(speed.add(0.37))
        .add(phase.mul(1.71)),
    ).mul(0.035),
    sin(
      time
        .mul(speed.add(0.22))
        .add(phase.mul(2.13)),
    ).mul(0.045),
  );
  const material = new THREE.MeshBasicNodeMaterial({
    toneMapped: false,
  });

  material.colorNode = attribute<'color'>('colour');
  const particleCenter = mix(
    imagePosition,
    spherePosition.add(turbulence),
    globe,
  );
  material.positionNode = particleCenter.add(
    vec3(positionLocal.xy.mul(particleSize), 0),
  );

  return {
    imageAspect,
    columns: COLUMNS,
    rows,
    particleSize,
    object: new THREE.Mesh(geometry, material),
  };
};

const createPhotoOverlay = (photo: LoadedPhoto) => {
  const photoMaterial = new THREE.MeshBasicMaterial({
    map: photo.map,
    toneMapped: false,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    opacity: 0,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), photoMaterial);
  mesh.renderOrder = 1;
  return mesh;
};

const layoutParticles = (
  particles: ReturnType<typeof createParticles>,
  photoMesh: ReturnType<typeof createPhotoOverlay>,
  aspect: number,
  globeYaw: number,
) => {
  const { columns, imageAspect, object, particleSize, rows } = particles;
  const imageHalfHeight = Math.min(0.72, (0.86 * aspect) / imageAspect);
  const imageHalfWidth = imageHalfHeight * imageAspect;
  const globeRadius = Math.min(0.58, aspect * 0.82);
  const position = object.geometry.getAttribute('imagePosition');
  const sphere = object.geometry.getAttribute('globePosition');
  const yawCos = Math.cos(globeYaw);
  const yawSin = Math.sin(globeYaw);
  const tilt = -0.28;

  for (let index = 0; index < position.count; index++) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = (column + 0.5) / columns;
    const y = (row + 0.5) / rows;
    const sphereY = 1 - (index / Math.max(position.count - 1, 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
    const angle = index * 2.39996323;
    const sphereX = Math.cos(angle) * ringRadius;
    const sphereZ = Math.sin(angle) * ringRadius;
    const spunX = sphereX * yawCos + sphereZ * yawSin;
    const spunZ = -sphereX * yawSin + sphereZ * yawCos;

    position.setXYZ(
      index,
      (x - 0.5) * imageHalfWidth * 2,
      (0.5 - y) * imageHalfHeight * 2,
      0,
    );
    sphere.setXYZ(
      index,
      spunX * globeRadius,
      (sphereY * Math.cos(tilt) - spunZ * Math.sin(tilt)) * globeRadius,
      (sphereY * Math.sin(tilt) + spunZ * Math.cos(tilt)) * globeRadius,
    );
  }

  position.needsUpdate = true;
  sphere.needsUpdate = true;
  particleSize.value.set(
    ((imageHalfWidth * 2) / columns) * 1.01,
    ((imageHalfHeight * 2) / rows) * 1.01,
  );
  photoMesh.scale.set(imageHalfWidth * 2, imageHalfHeight * 2, 1);
};

const runParticleMotion = (
  globe: FloatUniform,
  globeValue: MotionValue<number>,
  photoMesh: ReturnType<typeof createPhotoOverlay>,
  canvas: HTMLCanvasElement,
  track: (animation: AnimationPlaybackControls) => void,
) => {
  threeEffect(globe, { value: globeValue });
  threeEffect(photoMesh.material, {
    opacity: transformValue(() => highResolutionMix(globeValue.get())),
  });

  track(
    animate(globeValue, 0, {
      type: 'spring',
      stiffness: 55,
      damping: 16,
      mass: 1,
      delay: 0.8,
    }),
  );

  return press(canvas, () => {
    track(
      animate(globeValue, 1, {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.9,
      }),
    );

    return () => {
      track(
        animate(globeValue, 0, {
          type: 'spring',
          stiffness: 70,
          damping: 16,
          mass: 1,
        }),
      );
    };
  });
};

export const createParticleMorph = (
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
): ParticleMorphController => {
  let disposed = false;
  let renderer: THREE.WebGPURenderer | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let releasePress: (() => void) | null = null;
  let renderProcess: Process | null = null;
  let scene: THREE.Scene | null = null;
  const animations = new Set<AnimationPlaybackControls>();

  const track = (animation: AnimationPlaybackControls) => {
    animations.add(animation);
    return animation;
  };

  const dispose = () => {
    if (disposed) {
      return;
    }

    disposed = true;
    animations.forEach((animation) => animation.stop());
    animations.clear();
    releasePress?.();
    releasePress = null;

    if (renderProcess) {
      cancelFrame(renderProcess);
      renderProcess = null;
    }

    resizeObserver?.disconnect();
    resizeObserver = null;

    if (scene) {
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();

        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material?.dispose();
        }
      });
      scene.clear();
      scene = null;
    }

    renderer?.dispose();
    renderer = null;
    canvas.removeAttribute('data-ready');
  };

  void (async () => {
    try {
      renderer = new THREE.WebGPURenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      await renderer.init();

      if (disposed) {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);

      const photoUrl = pickPhoto();
      const photo = await loadPhoto(photoUrl);

      if (disposed) {
        photo.map.dispose();
        return;
      }

      sessionStorage.setItem('three-tsl-photo', photoUrl);

      const globeYaw = Math.random() * Math.PI * 2;
      const globe: FloatUniform = uniform(1);
      const globeValue = motionValue(1);
      const particles = createParticles(photo, globe);
      const photoMesh = createPhotoOverlay(photo);
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

      scene = new THREE.Scene();
      camera.position.z = 4;
      scene.add(particles.object);
      scene.add(photoMesh);

      const resize = () => {
        if (!renderer || !scene) {
          return;
        }

        const width = Math.max(stage.clientWidth, 1);
        const height = Math.max(stage.clientHeight, 1);
        const aspect = width / height;

        renderer.setSize(width, height, false);
        camera.left = -aspect;
        camera.right = aspect;
        camera.top = 1;
        camera.bottom = -1;
        camera.updateProjectionMatrix();
        layoutParticles(particles, photoMesh, aspect, globeYaw);
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(stage);
      resize();
      releasePress = runParticleMotion(
        globe,
        globeValue,
        photoMesh,
        canvas,
        track,
      );
      canvas.dataset.ready = 'true';

      renderProcess = frame.render(() => {
        if (renderer && scene) {
          renderer.render(scene, camera);
        }
      }, true);
    } catch (error) {
      console.error(error);
      dispose();
    }
  })();

  return { dispose };
};
