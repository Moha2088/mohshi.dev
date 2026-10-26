import { motion } from "framer-motion";
import { usePageTitle } from "../hooks/usePageTitle";
import { FadeInSection } from "../utils/FadeInSection";
import { ExperienceTab, ExperienceTabProps } from "../components/ExperienceTab";


const Experience = () => {
    usePageTitle("Experience");

    const experiences: ExperienceTabProps[] = [
        {
            id: 4,
            duration: "Jan 2026 — Mar 2026",
            position: "Full Stack Developer",
            company: "JOYN ApS",
            text: "",
            skills: []
        },
        {
            id: 3,
            duration: "Oct 2025",
            position: "Developer",
            company: "Ignite Odense",
            text: "Monitoring performance and errors, for an app used by attendees, during one of the largest startup networking events in Odense.",
            skills: []
        },
        {
            id: 2,
            duration: "Sep 2025 — Dec 2025",
            position: "Full Stack Developer Intern",
            company: "JOYN ApS",
            text: `Developed components and built custom hooks with Next.js, TypeScript and Tanstack Query.
            Developed endpoints with Fastify and integration tests with Jest.`,
            skills: ["Fastify", "Node.js", "TypeScript", "React", "Next.js", "PostgreSQL", "PostHog", "Jest"]
        },
        {
            id: 1,
            duration: "Jul 2024 - Oct 2024",
            position: "Backend Developer Intern",
            company: "BSS",
            text: "API Development with Azure, C#/.NET and EF Core.",
            skills: ["C#", ".NET", "Entity Framework"]
        },
    ];

    return (
        <div>
            <FadeInSection>
                <motion.h1 className="text-3xl font-bold">Experience</motion.h1>
                <motion.p className="text-sm mt-5 sm:text-base leading-relaxed mb-20">
                    Past and current work experiences
                </motion.p>
            </FadeInSection>

            <FadeInSection delay={1}>
                {experiences.map((exp) => (
                    <div className="mb-5">
                        <ExperienceTab
                            key={exp.id}
                            position={exp.position}
                            duration={exp.duration}
                            company={exp.company}
                            text={exp.text}
                            skills={exp.skills}
                        />
                    </div>
                ))}
            </FadeInSection>
        </div>
    );
};

export default Experience;
