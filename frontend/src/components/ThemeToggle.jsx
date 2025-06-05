import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  return (
    <div className="flex items-center space-x-2">
      <Switch id="theme-mode" checked={isDark} onCheckedChange={setIsDark} />
      <Label htmlFor="theme-mode">Dark Mode</Label>
    </div>
  )
}
