import { usePageTitle } from "../hooks/usePageTitle"
import { FadeInSection } from "../utils/FadeInSection"
import { motion } from "framer-motion"

const About = () => {
    usePageTitle("About")

    const skills = [
        "C#", "TypeScript", "Python", "Next.js","React","Vue", ".NET", "Azure DevOps", "Node.js", "Fastify", 
        "PostgreSQL","Github Actions","Cloudflare R2", "Tanstack Query"
    ]

    return (
        <div>
            <FadeInSection>
                <motion.h1 className="text-3xl font-bold">
                    About
                </motion.h1>
            </FadeInSection>

            <FadeInSection 
                delay={1}
            >
                <div className="mt-5 mb-20">
                    I'm a Software Developer with experience in Front and Backend development. 
                    Some of the technologies I have worked with are:
                </div>

                <div className="flex justify-center mb-20">
                    <ul className="flex flex-col gap-3">
                        {skills.map((s) => (
                            <li className="list-disc">
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeInSection>
        </div>
    )
}

export default About