import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { MapPin } from "lucide-react"

interface MapWrapperProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function MapWrapper({ title, description, children, className = "" }: MapWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="chart-container overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-primary">{title}</CardTitle>
          </div>
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative min-h-[400px] bg-gradient-surface rounded-b-lg">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}