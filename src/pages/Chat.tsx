import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, Settings, History, BookOpen } from "lucide-react"
import { ChatBox } from "@/components/chat-box"
import { RoleSelector } from "@/components/role-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const chatHistory = [
  {
    id: "1",
    title: "Arabian Sea Temperature Analysis",
    timestamp: "2 hours ago",
    messages: 12
  },
  {
    id: "2", 
    title: "ARGO Float Status Check",
    timestamp: "Yesterday",
    messages: 8
  },
  {
    id: "3",
    title: "Salinity Profile Comparison",
    timestamp: "2 days ago",
    messages: 15
  }
]

const quickPrompts = [
  "Show me temperature anomalies in the last month",
  "Which ARGO floats are active near coordinates 15°N, 68°E?",
  "Compare salinity levels between Arabian Sea and Bay of Bengal",
  "Generate a report on ocean health for this region",
  "What's the current thermocline depth in this area?",
  "Show BGC parameter trends for the last quarter"
]

export default function Chat() {
  const [selectedRole, setSelectedRole] = useState<string>("researcher")
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
          AquaMind Chat Interface
        </h1>
        <p className="text-muted-foreground">
          Converse with AI to explore and analyze oceanographic data
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="role" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Role Selection
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chat Area */}
            <div className="lg:col-span-2">
              <ChatBox />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Current Role */}
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-1 bg-gradient-ocean rounded">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Active Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-2">Ocean Researcher</Badge>
                  <p className="text-sm text-muted-foreground">
                    Advanced analytics and research tools enabled
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full"
                    onClick={() => setActiveTab("role")}
                  >
                    Change Role
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Prompts */}
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Quick Prompts
                  </CardTitle>
                  <CardDescription>Try these sample queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickPrompts.slice(0, 4).map((prompt, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full text-left p-2 text-xs bg-muted/50 hover:bg-muted rounded border transition-colors"
                        onClick={() => {
                          // In a real app, this would send the prompt to the chat
                          console.log("Quick prompt:", prompt)
                        }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Stats */}
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Messages</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data Queries</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Visualizations</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Session Time</span>
                    <span className="font-medium">12m 34s</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="role" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl">Select Your Role</CardTitle>
              <CardDescription>
                Choose your role to customize the AI assistant's responses and available tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleSelector
                selectedRole={selectedRole}
                onRoleSelect={(role) => {
                  setSelectedRole(role)
                  setActiveTab("chat")
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <History className="h-5 w-5" />
                Chat History
              </CardTitle>
              <CardDescription>
                Your recent conversations with AquaMind
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chatHistory.map((chat, index) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="p-2 bg-gradient-ocean rounded-lg">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{chat.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {chat.messages} messages • {chat.timestamp}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Open
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