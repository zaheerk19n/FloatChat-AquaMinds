import { motion } from "framer-motion"
import { Activity, Droplets, Thermometer, Waves, TrendingUp, MapPin } from "lucide-react"
import { ChartWrapper } from "@/components/chart-wrapper"
import { MapWrapper } from "@/components/map-wrapper"
import { OceanHealthScore } from "@/components/ocean-health-score"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

// Mock data for ocean parameters
const temperatureData = [
  { month: "Jan", temperature: 26.5, depth_50m: 25.2, depth_100m: 23.8 },
  { month: "Feb", temperature: 27.1, depth_50m: 25.8, depth_100m: 24.1 },
  { month: "Mar", temperature: 28.2, depth_50m: 26.5, depth_100m: 24.7 },
  { month: "Apr", temperature: 29.1, depth_50m: 27.2, depth_100m: 25.3 },
  { month: "May", temperature: 29.8, depth_50m: 27.9, depth_100m: 26.1 },
  { month: "Jun", temperature: 30.2, depth_50m: 28.4, depth_100m: 26.8 },
]

const salinityData = [
  { month: "Jan", salinity: 36.2, variance: 0.3 },
  { month: "Feb", salinity: 36.4, variance: 0.2 },
  { month: "Mar", salinity: 36.1, variance: 0.4 },
  { month: "Apr", salinity: 35.9, variance: 0.3 },
  { month: "May", salinity: 35.8, variance: 0.5 },
  { month: "Jun", salinity: 36.0, variance: 0.2 },
]

const argoFloatLocations = [
  { id: "4901234", lat: 15.5, lon: 68.2, status: "active", lastUpdate: "2 hours ago" },
  { id: "4901567", lat: 12.8, lon: 72.1, status: "active", lastUpdate: "4 hours ago" },
  { id: "4901890", lat: 18.2, lon: 65.8, status: "inactive", lastUpdate: "2 days ago" },
  { id: "4902123", lat: 20.1, lon: 70.5, status: "active", lastUpdate: "1 hour ago" },
]

const quickStats = [
  {
    title: "Active ARGO Floats",
    value: "247",
    change: "+12",
    icon: Activity,
    color: "text-success"
  },
  {
    title: "Average Temperature",
    value: "28.7°C",
    change: "+0.8°C",
    icon: Thermometer,
    color: "text-primary"
  },
  {
    title: "Salinity Level",
    value: "36.1 PSU",
    change: "-0.2 PSU",
    icon: Droplets,
    color: "text-accent"
  },
  {
    title: "Data Points Today",
    value: "15.2K",
    change: "+2.1K",
    icon: TrendingUp,
    color: "text-secondary"
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
          Ocean Data Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time insights from ARGO float network in the Arabian Sea region
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass hover:glow-animation transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Ocean Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OceanHealthScore
          score={78}
          trend="up"
          region="Arabian Sea"
          lastUpdated="2 hours ago"
        />
        
        <Card className="glass col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              Quick Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Temperature Anomaly Detected</p>
                  <p className="text-xs text-muted-foreground">Float 4901234 - 1.2°C above average</p>
                </div>
                <Badge variant="outline">2h ago</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New Data Available</p>
                  <p className="text-xs text-muted-foreground">3 floats transmitted successfully</p>
                </div>
                <Badge variant="outline">1h ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper
          title="Temperature Profiles"
          description="Surface and depth temperature variations over time"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" strokeWidth={2} name="Surface" />
              <Line type="monotone" dataKey="depth_50m" stroke="hsl(var(--accent))" strokeWidth={2} name="50m Depth" />
              <Line type="monotone" dataKey="depth_100m" stroke="hsl(var(--secondary))" strokeWidth={2} name="100m Depth" />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper
          title="Salinity Levels"
          description="Practical Salinity Units (PSU) with variance"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salinityData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="salinity" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* ARGO Float Map */}
      <MapWrapper
        title="ARGO Float Locations"
        description="Real-time positions of active ocean monitoring floats"
      >
        <div className="absolute inset-0 bg-gradient-surface rounded-b-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <Waves className="h-16 w-16 text-primary mx-auto animate-float" />
            <div>
              <h3 className="text-lg font-semibold text-primary">Interactive Ocean Map</h3>
              <p className="text-sm text-muted-foreground">Real-time ARGO float positions would be displayed here</p>
            </div>
            
            {/* Mock float positions */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-xs">
              {argoFloatLocations.map((float) => (
                <div key={float.id} className="flex items-center gap-2 p-2 bg-card/80 rounded border">
                  <div className={`w-2 h-2 rounded-full ${float.status === 'active' ? 'bg-success' : 'bg-muted'}`} />
                  <div>
                    <p className="font-mono font-medium">{float.id}</p>
                    <p className="text-muted-foreground">{float.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MapWrapper>
    </div>
  )
}