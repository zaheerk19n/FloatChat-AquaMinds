import { motion } from "framer-motion"
import { ArrowRight, Waves, BarChart3, Bot, FileText, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OceanHealthScore } from "@/components/ocean-health-score"

const features = [
  {
    icon: Bot,
    title: "AI-Powered Chat",
    description: "Natural language queries for oceanographic data exploration",
    gradient: "bg-gradient-ocean"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Interactive visualizations and statistical analysis",
    gradient: "bg-gradient-surface"
  },
  {
    icon: FileText,
    title: "Automated Reports",
    description: "Generate comprehensive reports with one click",
    gradient: "bg-gradient-coral"
  },
  {
    icon: Waves,
    title: "Ocean Health Monitoring",
    description: "Track ecosystem health and environmental changes",
    gradient: "bg-gradient-deep"
  }
]

const stats = [
  { value: "2.4M+", label: "Data Points Processed" },
  { value: "247", label: "Active ARGO Floats" },
  { value: "12", label: "Monitoring Regions" },
  { value: "99.2%", label: "System Uptime" }
]

const useCases = [
  {
    title: "Marine Research",
    description: "Advanced tools for oceanographic research and analysis",
    users: "Scientists & Researchers",
    icon: "🔬"
  },
  {
    title: "Environmental Monitoring",
    description: "Track ocean health and climate change indicators",
    users: "Environmental Agencies",
    icon: "🌊"
  },
  {
    title: "Maritime Operations",
    description: "Support navigation and operational decision making",
    users: "Maritime Industry",
    icon: "⚓"
  },
  {
    title: "Educational Resources",
    description: "Interactive learning platform for ocean sciences",
    users: "Students & Educators",
    icon: "📚"
  }
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 py-12"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-ocean rounded-2xl flex items-center justify-center glow-animation"
          >
            <Waves className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight ">
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              Intelligent Ocean
            </span>
            <br />
            <span className="text-foreground">Data Discovery</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            FloatChat brings AI-powered conversation to oceanographic data exploration. 
            Query, visualize, and analyze ARGO float data with natural language.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="btn-ocean group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="group">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Ocean Health Preview */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <div className="max-w-sm">
          <OceanHealthScore
            score={78}
            trend="up"
            region="Arabian Sea"
            lastUpdated="2 hours ago"
          />
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="text-muted-foreground">
            Everything you need to explore and understand ocean data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="glass hover:glow-animation transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${feature.gradient} rounded-xl float-animation`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Built for Everyone</h2>
          <p className="text-muted-foreground">
            From researchers to students, FloatChat serves diverse ocean science needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Card className="glass h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{useCase.icon}</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {useCase.users}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center space-y-6 py-12"
      >
        <Card className="glass max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Ready to Explore the Ocean?
              </h2>
              <p className="text-muted-foreground">
                Start your journey with FloatChat and discover the power of AI-driven ocean data analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="btn-ocean">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}