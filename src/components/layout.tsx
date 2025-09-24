import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Navbar } from "./navbar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div
        className="min-h-screen flex w-full"
        // style={{
        //   backgroundImage: `url('/1758473819 (1).png')`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundAttachment: 'fixed',
        // }}
      >
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}