import { Moon, Sun, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-ocean rounded-lg float-animation">
              <Waves className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                FloatChat
              </h1>
              <p className="text-xs text-muted-foreground">AquaMind Intelligence</p>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </a>
          <a href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </a>
          <a href="/chat" className="text-sm font-medium transition-colors hover:text-primary">
            Chat
          </a>
          <a href="/analytics" className="text-sm font-medium transition-colors hover:text-primary">
            Analytics
          </a>
          <a href="/reports" className="text-sm font-medium transition-colors hover:text-primary">
            Reports
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="glow-animation"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}