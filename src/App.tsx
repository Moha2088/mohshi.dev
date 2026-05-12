import { useState, useEffect } from 'react'
import './App.css'
import { Switch } from './components/Switch'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <>
        {/* <button 
          className='theme-toggle'
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle light/dark mode"
        >
          {isDark ? <IconSun color='white' /> : <IconMoonFilled/>}
        </button> */}

        <Switch
            isDark={isDark}
            setIsDark={setIsDark}
        />

        <div className='main-div'>
            <div className='name-div'>
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

export default App
