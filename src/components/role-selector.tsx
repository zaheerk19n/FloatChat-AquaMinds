import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Anchor, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  Waves,
  BarChart3
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const roles = [
  {
    id: "researcher",
    title: "Ocean Researcher",
    description: "Deep analysis of oceanographic data and trends",
    icon: GraduationCap,
    color: "bg-gradient-ocean",
    features: ["Advanced Analytics", "Research Tools", "Data Export"]
  },
  {
    id: "marine-biologist",
    title: "Marine Biologist",
    description: "Biological and ecological ocean data insights",
    icon: Waves,
    color: "bg-gradient-surface",
    features: ["BGC Parameters", "Ecosystem Health", "Species Analysis"]
  },
  {
    id: "policy-maker",
    title: "Policy Maker",
    description: "Strategic insights for ocean governance",
    icon: Building2,
    color: "bg-gradient-coral",
    features: ["Trend Reports", "Impact Analysis", "Policy Insights"]
  },
  {
    id: "student",
    title: "Student",
    description: "Educational exploration of ocean science",
    icon: UserCheck,
    color: "bg-gradient-deep",
    features: ["Learning Mode", "Guided Tours", "Simple Explanations"]
  },
  {
    id: "captain",
    title: "Ship Captain",
    description: "Navigation and operational ocean data",
    icon: Anchor,
    color: "bg-primary",
    features: ["Weather Data", "Navigation Aids", "Safety Reports"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Statistical analysis and data visualization",
    icon: BarChart3,
    color: "bg-accent",
    features: ["Custom Charts", "Statistical Tools", "Data Mining"]
  }
]

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void
  selectedRole?: string
}

export function RoleSelector({ onRoleSelect, selectedRole }: RoleSelectorProps) {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {roles.map((role) => {
        const Icon = role.icon
        const isSelected = selectedRole === role.id
        const isHovered = hoveredRole === role.id

        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredRole(role.id)}
            onHoverEnd={() => setHoveredRole(null)}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? "ring-2 ring-primary shadow-lg shadow-primary/25" 
                  : "hover:shadow-md"
              } ${isHovered ? "glow-animation" : ""}`}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${role.color} rounded-lg float-animation`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{role.title}</h3>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1">
                    {role.features.map((feature, index) => (
                      <div key={feature} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}