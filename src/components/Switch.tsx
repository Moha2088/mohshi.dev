import { useEffect } from "react"

interface SwitchProps {
    isDark: boolean
    setIsDark: (val: boolean) => void
}


export function Switch(props: SwitchProps) {
    const { isDark, setIsDark } = props

    useEffect(() => {
        document.documentElement.setAttribute("data-switch-to", isDark ? "dark" : "light")
    }, [isDark])

    return (
        <div className="switch-root" onClick={() => {
                if(isDark) {
                    document.documentElement.setAttribute("data-switch-to", "light")
                    setIsDark(false)
                    return
                }

                document.documentElement.setAttribute("data-switch-to", "dark")
                setIsDark(true)
            }}
        >
            <div className="switch-thumb" /> 
        </div>
    )
}