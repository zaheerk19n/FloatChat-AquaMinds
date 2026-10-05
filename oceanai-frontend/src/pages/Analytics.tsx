import { motion } from "framer-motion"
import { BarChart3, TrendingUp, PieChart, Activity, Calendar, Filter } from "lucide-react"
import { ChartWrapper } from "@/components/chart-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts"

// Mock data for analytics
const trendsData = [
  { month: "Jan", temperature: 26.5, salinity: 36.2, oxygen: 185, chlorophyll: 0.45 },
  { month: "Feb", temperature: 27.1, salinity: 36.4, oxygen: 178, chlorophyll: 0.52 },
  { month: "Mar", temperature: 28.2, salinity: 36.1, oxygen: 172, chlorophyll: 0.38 },
  { month: "Apr", temperature: 29.1, salinity: 35.9, oxygen: 165, chlorophyll: 0.41 },
  { month: "May", temperature: 29.8, salinity: 35.8, oxygen: 158, chlorophyll: 0.48 },
  { month: "Jun", temperature: 30.2, salinity: 36.0, oxygen: 162, chlorophyll: 0.44 },
]

const depthProfileData = [
  { depth: 0, temperature: 30.2, salinity: 36.0, density: 23.1 },
  { depth: 50, temperature: 28.4, salinity: 36.2, density: 23.8 },
  { depth: 100, temperature: 26.8, salinity: 36.3, density: 24.5 },
  { depth: 200, temperature: 22.1, salinity: 36.1, density: 25.9 },
  { depth: 500, temperature: 15.3, salinity: 35.8, density: 27.2 },
  { depth: 1000, temperature: 8.2, salinity: 35.2, density: 28.1 },
]

const floatStatusData = [
  { name: "Active", value: 187, color: "hsl(var(--success))" },
  { name: "Inactive", value: 34, color: "hsl(var(--warning))" },
  { name: "Maintenance", value: 12, color: "hsl(var(--destructive))" },
  { name: "Deployed", value: 23, color: "hsl(var(--primary))" },
]

const anomalyData = [
  { week: "W1", temperature: 2, salinity: 1, bgc: 0 },
  { week: "W2", temperature: 1, salinity: 3, bgc: 2 },
  { week: "W3", temperature: 4, salinity: 2, bgc: 1 },
  { week: "W4", temperature: 3, salinity: 1, bgc: 3 },
]

const scatterData = [
  { temperature: 26.5, salinity: 36.2, size: 120 },
  { temperature: 27.1, salinity: 36.4, size: 98 },
  { temperature: 28.2, salinity: 36.1, size: 135 },
  { temperature: 29.1, salinity: 35.9, size: 87 },
  { temperature: 29.8, salinity: 35.8, size: 156 },
  { temperature: 30.2, salinity: 36.0, size: 142 },
]

const analyticsMetrics = [
  {
    title: "Data Points Analyzed",
    value: "2.4M",
    change: "+18.2%",
    period: "vs last month",
    icon: Activity,
    color: "text-primary"
  },
  {
    title: "Active Monitoring Regions",
    value: "12",
    change: "+2",
    period: "new regions",
    icon: BarChart3,
    color: "text-success"
  },
  {
    title: "Anomalies Detected",
    value: "23",
    change: "+7",
    period: "this week",
    icon: TrendingUp,
    color: "text-warning"
  },
  {
    title: "Model Accuracy",
    value: "94.2%",
    change: "+1.8%",
    period: "improvement",
    icon: PieChart,
    color: "text-accent"
  }
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
            Ocean Data Analytics
          </h1>
          <p className="text-muted-foreground">
            Advanced statistical analysis and insights from oceanographic data
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="arabian-sea">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
              <SelectItem value="bay-bengal">Bay of Bengal</SelectItem>
              <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Analytics Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analyticsMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass hover:glow-animation transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.period}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Temporal Trends</TabsTrigger>
          <TabsTrigger value="profiles">Depth Profiles</TabsTrigger>
          <TabsTrigger value="status">Fleet Status</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWrapper
              title="Multi-Parameter Trends"
              description="Temperature, salinity, and BGC parameters over time"
            >
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendsData}>
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
                  <Line type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" strokeWidth={2} name="Temperature (°C)" />
                  <Line type="monotone" dataKey="salinity" stroke="hsl(var(--accent))" strokeWidth={2} name="Salinity (PSU)" />
                  <Line type="monotone" dataKey="oxygen" stroke="hsl(var(--secondary))" strokeWidth={2} name="Oxygen (μmol/kg)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <ChartWrapper
              title="Anomaly Detection"
              description="Weekly anomaly counts by parameter type"
            >
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="temperature" fill="hsl(var(--primary))" name="Temperature" />
                  <Bar dataKey="salinity" fill="hsl(var(--accent))" name="Salinity" />
                  <Bar dataKey="bgc" fill="hsl(var(--secondary))" name="BGC" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <ChartWrapper
            title="Ocean Depth Profiles"
            description="Temperature, salinity, and density variation with depth"
            className="col-span-full"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={depthProfileData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="depth" type="number" reversed className="text-xs" label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" strokeWidth={2} name="Temperature (°C)" />
                <Line type="monotone" dataKey="salinity" stroke="hsl(var(--accent))" strokeWidth={2} name="Salinity (PSU)" />
                <Line type="monotone" dataKey="density" stroke="hsl(var(--secondary))" strokeWidth={2} name="Density (kg/m³)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWrapper
              title="ARGO Float Status Distribution"
              description="Current operational status of all monitored floats"
            >
              <ResponsiveContainer width="100%" height={350}>
                <RechartsPieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Pie
                    data={floatStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {floatStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Fleet Summary
                </CardTitle>
                <CardDescription>Detailed breakdown of float network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {floatStatusData.map((status, index) => (
                  <motion.div
                    key={status.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="font-medium">{status.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{status.value}</span>
                      <p className="text-xs text-muted-foreground">
                        {((status.value / floatStatusData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <ChartWrapper
            title="Temperature vs Salinity Correlation"
            description="Scatter plot showing relationship between temperature and salinity measurements"
            className="col-span-full"
          >
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="temperature" name="Temperature" unit="°C" className="text-xs" />
                <YAxis dataKey="salinity" name="Salinity" unit="PSU" className="text-xs" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Scatter dataKey="salinity" fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </TabsContent>
      </Tabs>
    </div>
  )
}