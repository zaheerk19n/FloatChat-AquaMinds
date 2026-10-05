import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Download, 
  FileText, 
  BarChart3, 
  Calendar, 
  Globe, 
  Settings,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const reportTemplates = [
  {
    id: "ocean-health",
    title: "Ocean Health Assessment",
    description: "Comprehensive analysis of ocean conditions and ecosystem health",
    icon: Globe,
    estimatedTime: "5-10 min",
    parameters: ["Temperature", "Salinity", "BGC", "Oxygen"],
    formats: ["PDF", "CSV", "Excel"]
  },
  {
    id: "float-status",
    title: "ARGO Float Status Report",
    description: "Detailed operational status and performance metrics for all floats",
    icon: BarChart3,  
    estimatedTime: "2-5 min",
    parameters: ["Location", "Status", "Last Contact", "Battery"],
    formats: ["PDF", "CSV"]
  },
  {
    id: "anomaly-analysis",
    title: "Anomaly Detection Summary",
    description: "Statistical analysis of detected oceanographic anomalies",
    icon: AlertCircle,
    estimatedTime: "3-7 min", 
    parameters: ["Temperature Anomalies", "Salinity Anomalies", "BGC Anomalies"],
    formats: ["PDF", "Excel", "JSON"]
  },
  {
    id: "temporal-trends",
    title: "Temporal Trend Analysis",
    description: "Long-term trends and seasonal patterns in ocean parameters",
    icon: Calendar,
    estimatedTime: "10-15 min",
    parameters: ["Multi-year Data", "Seasonal Patterns", "Forecasting"],
    formats: ["PDF", "CSV", "PNG"]
  }
]

const generatedReports = [
  {
    id: "1",
    title: "Ocean Health Assessment - Q2 2024",
    type: "ocean-health",
    status: "completed",
    createdAt: "2024-06-15T10:30:00Z",
    fileSize: "2.4 MB",
    format: "PDF"
  },
  {
    id: "2", 
    title: "ARGO Float Status - Weekly",
    type: "float-status",
    status: "completed",
    createdAt: "2024-06-14T16:20:00Z",
    fileSize: "856 KB",
    format: "CSV"
  },
  {
    id: "3",
    title: "Anomaly Analysis - May 2024",
    type: "anomaly-analysis", 
    status: "processing",
    createdAt: "2024-06-14T09:15:00Z",
    fileSize: "-",
    format: "PDF"
  },
  {
    id: "4",
    title: "Temporal Trends - Arabian Sea",
    type: "temporal-trends",
    status: "failed",
    createdAt: "2024-06-13T14:45:00Z", 
    fileSize: "-",
    format: "PDF"
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-success" />
    case "processing":
      return <Clock className="h-4 w-4 text-warning animate-spin" />
    case "failed":
      return <AlertCircle className="h-4 w-4 text-destructive" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    completed: "default",
    processing: "secondary", 
    failed: "destructive"
  } as const

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [reportConfig, setReportConfig] = useState({
    region: "arabian-sea",
    dateRange: { from: new Date(), to: new Date() },
    format: "pdf",
    includeCharts: true,
    includeRawData: false,
    includeSummary: true
  })

  const handleGenerateReport = () => {
    if (!selectedTemplate) {
      toast.error("Please select a report template")
      return
    }

    const template = reportTemplates.find(t => t.id === selectedTemplate)
    toast.success(`Generating ${template?.title}...`, {
      description: `Estimated completion time: ${template?.estimatedTime}`
    })

    // In a real app, this would trigger the report generation
    console.log("Generating report:", { selectedTemplate, reportConfig })
  }

  const handleDownloadReport = (reportId: string) => {
    const report = generatedReports.find(r => r.id === reportId)
    toast.success(`Downloading ${report?.title}`)
    
    // In a real app, this would trigger the download
    console.log("Downloading report:", reportId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
          Reports & Data Export
        </h1>
        <p className="text-muted-foreground">
          Generate comprehensive reports and export oceanographic data
        </p>
      </motion.div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Generate Reports
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Report History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Templates */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Select Report Template</CardTitle>
                  <CardDescription>
                    Choose from predefined templates or create a custom report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTemplates.map((template, index) => {
                      const Icon = template.icon
                      const isSelected = selectedTemplate === template.id

                      return (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card 
                            className={`cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? "ring-2 ring-primary shadow-lg shadow-primary/25" 
                                : "hover:shadow-md"
                            }`}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gradient-ocean rounded-lg">
                                    <Icon className="h-5 w-5 text-primary-foreground" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{template.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {template.estimatedTime}
                                    </p>
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                  {template.description}
                                </p>

                                <div className="flex flex-wrap gap-1">
                                  {template.formats.map((format) => (
                                    <Badge key={format} variant="outline" className="text-xs">
                                      {format}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Configuration Panel */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>
                  Customize your report parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={reportConfig.region} onValueChange={(value) => 
                    setReportConfig(prev => ({ ...prev, region: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                      <SelectItem value="bay-bengal">Bay of Bengal</SelectItem>
                      <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" placeholder="Start date" />
                    <Input type="date" placeholder="End date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Export Format</Label>
                  <Select value={reportConfig.format} onValueChange={(value) =>
                    setReportConfig(prev => ({ ...prev, format: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="excel">Excel Workbook</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Include Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="charts"
                        checked={reportConfig.includeCharts}
                        onCheckedChange={(checked) =>
                          setReportConfig(prev => ({ ...prev, includeCharts: !!checked }))
                        }
                      />
                      <Label htmlFor="charts" className="text-sm">Charts & Visualizations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rawdata"
                        checked={reportConfig.includeRawData}
                        onCheckedChange={(checked) =>
                          setReportConfig(prev => ({ ...prev, includeRawData: !!checked }))
                        }
                      />
                      <Label htmlFor="rawdata" className="text-sm">Raw Data Tables</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="summary"
                        checked={reportConfig.includeSummary}
                        onCheckedChange={(checked) =>
                          setReportConfig(prev => ({ ...prev, includeSummary: !!checked }))
                        }
                      />
                      <Label htmlFor="summary" className="text-sm">Executive Summary</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateReport}
                  className="w-full btn-ocean"
                  disabled={!selectedTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>
                View and download your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="p-2 bg-gradient-ocean rounded-lg">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{report.title}</h4>
                        {getStatusIcon(report.status)}
                        {getStatusBadge(report.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
                        <span>Size: {report.fileSize}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.format}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReport(report.id)}
                      disabled={report.status !== "completed"}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}