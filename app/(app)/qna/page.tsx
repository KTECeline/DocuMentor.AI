"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  MessageSquare,
  Send,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Clock,
  RefreshCw,
  Copy,
  Share,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: Suggestion[]
  sources?: string[]
}

interface Suggestion {
  id: string
  type: "improvement" | "warning" | "update"
  title: string
  description: string
  action?: string
  confidence: number
  status: "pending" | "accepted" | "rejected"
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content:
      "Hello! I'm your AI documentation assistant. I can help you understand your docs, find information, and suggest improvements. What would you like to know?",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    type: "user",
    content: "How do I implement OAuth 2.0 authentication in our API?",
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: "3",
    type: "ai",
    content:
      "Based on your API Authentication Guide, here's how to implement OAuth 2.0:\n\n1. **Authorization URL**: Direct users to your OAuth endpoint with client_id, response_type, and redirect_uri\n2. **Token Exchange**: Exchange the authorization code for an access token\n3. **API Requests**: Include the access token in the Authorization header\n\nThe documentation shows this example:\n```javascript\nconst authUrl = 'https://api.example.com/oauth/authorize?' +\n  'client_id=YOUR_CLIENT_ID&' +\n  'response_type=code&' +\n  'redirect_uri=YOUR_REDIRECT_URI';\n```\n\nWould you like me to suggest some improvements to make this section clearer?",
    timestamp: new Date(Date.now() - 3400000),
    sources: ["API Authentication Guide", "OAuth 2.0 Specification"],
    suggestions: [
      {
        id: "s1",
        type: "improvement",
        title: "Add Error Handling Examples",
        description: "Include examples for handling common OAuth errors like invalid_client or access_denied",
        confidence: 92,
        status: "pending",
      },
      {
        id: "s2",
        type: "update",
        title: "Add PKCE Support",
        description: "Consider adding Proof Key for Code Exchange (PKCE) examples for enhanced security",
        confidence: 88,
        status: "pending",
      },
    ],
  },
  {
    id: "4",
    type: "user",
    content: "What are the current rate limits for our API?",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "5",
    type: "ai",
    content:
      "According to your documentation, the current rate limits are:\n\n• **Free Plan**: 100 requests per minute\n• **Pro Plan**: 1,000 requests per minute  \n• **Enterprise Plan**: 10,000 requests per minute\n\nHowever, I notice this information might be outdated. The last update was 3 days ago, and rate limits often change based on infrastructure updates.",
    timestamp: new Date(Date.now() - 1700000),
    sources: ["API Authentication Guide"],
    suggestions: [
      {
        id: "s3",
        type: "warning",
        title: "Potentially Outdated Information",
        description: "Rate limiting information may need verification with the latest API changes",
        confidence: 78,
        status: "pending",
      },
    ],
  },
]

const documentSummaries = [
  {
    title: "API Authentication Guide",
    summary: "Comprehensive guide covering API keys, OAuth 2.0, and best practices for secure authentication",
    lastUpdated: "2 hours ago",
    trustScore: 95,
    status: "fresh",
    warnings: [],
  },
  {
    title: "Rate Limiting Documentation",
    summary: "Details about API rate limits, quotas, and handling rate limit errors",
    lastUpdated: "3 days ago",
    trustScore: 78,
    status: "stale",
    warnings: ["Information may be outdated", "No recent updates from API team"],
  },
  {
    title: "SDK Integration Guide",
    summary: "Step-by-step integration guides for Python, Node.js, and Go SDKs",
    lastUpdated: "1 week ago",
    trustScore: 85,
    status: "moderate",
    warnings: ["Missing recent SDK updates"],
  },
]

export default function QnAPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [summariesOpen, setSummariesOpen] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I'm processing your question and searching through your documentation. This is a simulated response for the demo.",
        timestamp: new Date(),
        sources: ["API Documentation", "User Guide"],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleSuggestionAction = (messageId: string, suggestionId: string, action: "accept" | "reject") => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              suggestions: message.suggestions?.map((suggestion) =>
                suggestion.id === suggestionId
                  ? { ...suggestion, status: action === "accept" ? "accepted" : "rejected" }
                  : suggestion,
              ),
            }
          : message,
      ),
    )
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">AI Q&A Assistant</h1>
          <p className="text-muted-foreground">Ask questions about your documentation and get intelligent answers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Export Chat
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Documentation Summaries Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <Collapsible open={summariesOpen} onOpenChange={setSummariesOpen}>
              <CardHeader className="pb-3">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center justify-between p-0 h-auto">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Doc Summaries
                    </CardTitle>
                    {summariesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {documentSummaries.map((doc, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{doc.title}</h4>
                        <Badge
                          variant={
                            doc.status === "fresh" ? "default" : doc.status === "stale" ? "destructive" : "secondary"
                          }
                          className="text-xs"
                        >
                          {doc.status === "fresh" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {doc.status === "stale" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {doc.status === "moderate" && <Clock className="h-3 w-3 mr-1" />}
                          {doc.trustScore}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{doc.summary}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Updated {doc.lastUpdated}</span>
                      </div>
                      {doc.warnings.length > 0 && (
                        <Alert className="border-orange-200 bg-orange-50">
                          <AlertTriangle className="h-3 w-3" />
                          <AlertDescription className="text-xs">{doc.warnings[0]}</AlertDescription>
                        </Alert>
                      )}
                      {index < documentSummaries.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "ai" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user" ? "bg-primary text-white ml-auto" : "bg-muted"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          {message.sources && (
                            <div className="mt-2 pt-2 border-t border-border/50">
                              <div className="flex flex-wrap gap-1">
                                {message.sources.map((source, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {source}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.type === "ai" && (
                            <>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>

                        {/* AI Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">AI Suggestions</span>
                            </div>
                            {message.suggestions.map((suggestion) => (
                              <Card key={suggestion.id} className="border-l-4 border-l-primary">
                                <CardContent className="p-3">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <h5 className="font-semibold text-sm">{suggestion.title}</h5>
                                      <Badge variant="outline" className="text-xs">
                                        {suggestion.confidence}%
                                      </Badge>
                                    </div>
                                    {suggestion.status === "accepted" && (
                                      <Badge variant="default" className="text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Accepted
                                      </Badge>
                                    )}
                                    {suggestion.status === "rejected" && (
                                      <Badge variant="secondary" className="text-xs">
                                        <X className="h-3 w-3 mr-1" />
                                        Rejected
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                                  {suggestion.status === "pending" && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleSuggestionAction(message.id, suggestion.id, "accept")}
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleSuggestionAction(message.id, suggestion.id, "reject")}
                                      >
                                        <X className="h-3 w-3 mr-1" />
                                        Reject
                                      </Button>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.type === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question about your documentation..."
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>AI Assistant Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
