interface SkillLabelProps {
    skill: string
}


export function SkillLabel(props: SkillLabelProps) {
    const { skill } = props

    return (
        <div className=" bg-stone-300 dark:bg-stone-800 px-3 py-1 rounded-2xl">
            <p className="text-[9px] dark:text-stone-300">
                {skill}
            </p>
        </div>
    )
}