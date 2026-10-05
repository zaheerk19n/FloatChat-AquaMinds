import { motion } from "framer-motion"
import { Waves, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OceanHealthScoreProps {
  score: number
  trend: "up" | "down" | "stable"
  region: string
  lastUpdated: string
}

export function OceanHealthScore({ score, trend, region, lastUpdated }: OceanHealthScoreProps) {
  const getScoreClass = (score: number) => {
    if (score >= 80) return "health-excellent"
    if (score >= 60) return "health-good"
    if (score >= 40) return "health-warning"
    return "health-critical"
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      default:
        return <AlertTriangle className="h-4 w-4 text-warning" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass border-primary/20 glow-animation">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Ocean Health</CardTitle>
            </div>
            {getTrendIcon()}
          </div>
          <CardDescription>{region}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`text-4xl font-bold ${getScoreClass(score)}`}
              >
                {score}/100
              </motion.div>
              <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
            </div>
            
            <Progress 
              value={score} 
              className="h-3"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Critical</span>
              <span>Excellent</span>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Last updated: {lastUpdated}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}