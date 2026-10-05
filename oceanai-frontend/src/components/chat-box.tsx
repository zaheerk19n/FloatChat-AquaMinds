import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mic, MicOff, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "chart" | "map"
}

const DUMMY_RESPONSES = [
  "I found 23 ARGO floats in the Arabian Sea region. The latest salinity readings show an average of 36.5 PSU.",
  "The ocean temperature profile shows a thermocline at approximately 150m depth. Would you like me to visualize this data?",
  "Ocean health score for this region is 78/100 - Good condition. BGC parameters indicate healthy chlorophyll levels.",
  "I've located 5 active floats near your specified coordinates. The nearest one (ID: 4901234) last transmitted 2 hours ago.",
  "Temperature anomalies detected in the equatorial region. Values are 1.2°C above seasonal average.",
]

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm AquaMind, your ocean data assistant. Ask me about ARGO floats, salinity profiles, temperature data, or ocean health metrics.",
      sender: "bot",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = DUMMY_RESPONSES[Math.floor(Math.random() * DUMMY_RESPONSES.length)]
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would handle voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setInputValue("Show me temperature profiles in the Indian Ocean")
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-b from-card/50 to-background/30 backdrop-blur-sm border border-border/50 rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="p-2 bg-gradient-ocean rounded-lg glow-animation">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-primary">AquaMind Assistant</h3>
          <p className="text-xs text-muted-foreground">Ocean Data Intelligence</p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          Online
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <div className="p-2 bg-gradient-ocean rounded-full h-8 w-8 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <Card className={`max-w-[80%] ${
                message.sender === "user" 
                  ? "bg-gradient-coral text-secondary-foreground" 
                  : "glass"
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>

              {message.sender === "user" && (
                <div className="p-2 bg-gradient-coral rounded-full h-8 w-8 flex items-center justify-center">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 justify-start"
          >
            <div className="p-2 bg-gradient-ocean rounded-full h-8 w-8 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <Card className="glass">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ocean data, ARGO floats, temperature profiles..."
            className="flex-1"
          />
          <Button
            onClick={toggleVoiceRecording}
            variant={isRecording ? "secondary" : "outline"}
            size="icon"
            className={isRecording ? "glow-animation" : ""}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="btn-ocean"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}