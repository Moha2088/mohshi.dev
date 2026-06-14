import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

interface ThemeDropdownProps {
    theme: "system" | "light" | "dark"
    setTheme: (val: "system" | "light" | "dark") => void
}

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
)

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
)

const MonitorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8" /><path d="M12 17v4" />
    </svg>
)

const options:     { value: "system" | "light" | "dark"; label: string; icon: () => ReactNode }[] = [
    { value: "system", label: "System", icon: MonitorIcon },
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
]

export function ThemeDropdown(props: ThemeDropdownProps) {
    const { theme, setTheme } = props
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.documentElement.setAttribute("data-switch-to", theme)
    }, [theme])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedOption = options.find((o) => o.value === theme) ?? options[0]

    return (
        <div className="theme-select" ref={ref}>
            <button
                className="theme-select-trigger"
                onClick={() => setOpen((p) => !p)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="theme-select-trigger-label">
                    <selectedOption.icon />
                    {selectedOption.label}
                </span>
                <svg
                    className="theme-select-chevron"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div className="theme-select-content" role="listbox">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className="theme-select-item"
                            role="option"
                            aria-selected={theme === opt.value}
                            onClick={() => {
                                setTheme(opt.value)
                                setOpen(false)
                            }}
                        >
                            <span className="theme-select-item-text">
                                <opt.icon />
                                {opt.label}
                            </span>
                            {theme === opt.value && (
                                <svg
                                    className="theme-select-check"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
