import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { usePageTitle } from '../hooks/usePageTitle';
import { FadeInSection } from '../utils/FadeInSection';
import { ParticleMorph } from '../three-js/particle-effect/ParticleMorph';

const Home = () => {
  usePageTitle('');  // Empty string for home page

  return (
    <div>
      <FadeInSection>
        <section className="space-y-4">
          <motion.div
            className="text-2xl sm:text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                'hi im mohamed',
              ]}
              wrapper="h1"
              cursor={true}
              repeat={0}
              speed={50}
              style={{ display: 'inline-block' }}
            />
          </motion.div>
          <motion.p
            className="text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Full Stack Software Developer from Odense.
          </motion.p>
        </section>
      </FadeInSection>

      <FadeInSection delay={2}>
          <div className='mt-10'>
              <ParticleMorph />
          </div>
      </FadeInSection>
    </div>
  );
};

export default Home; 