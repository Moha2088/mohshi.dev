import { useEffect, useState } from "react"
import { ThemeDropdown } from "../components/Switch"


export function Index() {
    const [theme, setTheme] = useState<"system" | "light" | "dark">(() => {
    const saved = localStorage.getItem('theme')
    return (saved === "system" || saved === "light" || saved === "dark") ? saved : "system"
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
        if (theme === "system") {
            document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light')
        } else {
            document.documentElement.setAttribute('data-theme', theme)
        }
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [theme])

  return (
    <>
        <ThemeDropdown
            theme={theme}
            setTheme={setTheme}
        />

        <div className='main-div'>
            <div className='name-div'>
                <div className='badge'>
                    <div>
                        Open for opportunities
                    </div>
                    
                    <div className='circle' />
                </div>

                <h1>
                    Mohamed Shil
                </h1>
            </div>

            <div className='description-div'>
                <p>
                    Full Stack Developer
                </p>
            </div>

            <div className='paragraph-div'>
                <p>
                    I'm a Software Developer based in Odense, Denmark with experience in designing, developing and testing software applications.
                    I have experience in both Frontend and Backend development in various programming languages and frameworks, which allows me to be flexible
                </p>
            </div>

            <div className='links-div'>
                <a className='social-link' href='https://github.com/Moha2088' target='_blank'>
                    Github
                </a>

                <a  className='social-link' href="https://linkedin.com/in/mohamed-shil" target="_blank">
                    LinkedIn
                </a>
            </div>
        </div>
    </>
  )
}