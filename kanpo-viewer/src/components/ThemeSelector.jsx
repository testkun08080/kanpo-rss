import { useState, useEffect } from 'react'

const themes = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 
  'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 
  'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 
  'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 
  'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'
]

function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-lg">🎨 テーマ選択</h2>
        <div className="form-control">
          <select 
            className="select select-bordered w-full"
            value={currentTheme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="w-4 h-4 rounded bg-primary"></div>
          <div className="w-4 h-4 rounded bg-secondary"></div>
          <div className="w-4 h-4 rounded bg-accent"></div>
          <div className="w-4 h-4 rounded bg-neutral"></div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector