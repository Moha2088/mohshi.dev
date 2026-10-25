
export interface ExperienceTabProps {
    id?: number
    duration: string
    position: string
    company: string,
    text: string
}


export function ExperienceTab(props: ExperienceTabProps) {
    const { duration, text, position, company } = props

    return (
        <div className="w-50 h-fit rounded-2xl transition-colors hover:bg-stone-100 dark:hover:bg-stone-900">
            <div className="p-3 flex flex-col">
                <div className="mb-5">
                    <div>
                        <p className="font-bold">
                            {position}
                        </p>
                    </div>

                    <div className="font-bold">
                        {company}
                    </div>
    
                    <div className="text-xs">
                        {duration}
                    </div>
                </div>

                <div className="text-xs">
                    {text}
                </div>
                
            </div>
        </div>
    )
}