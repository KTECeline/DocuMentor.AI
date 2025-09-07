"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodePreview } from "@/components/ui/code-review"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Edit3,
  Eye,
  Sparkles,
  History,
  Save,
  Share,
  MoreVertical,
  Wifi,
  WifiOff,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Zap,
  FileText,
  GitBranch,
} from "lucide-react"
import ReactMarkdown from "react-markdown"

const mockMarkdown = `# API Authentication Guide

## Overview

This guide covers the authentication methods available in our API. We support multiple authentication strategies to ensure secure access to your data.

## Authentication Methods

### 1. API Keys

API keys provide a simple way to authenticate your requests:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/users
\`\`\`

### 2. OAuth 2.0

For applications requiring user consent:

\`\`\`javascript
const authUrl = 'https://api.example.com/oauth/authorize?' +
  'client_id=YOUR_CLIENT_ID&' +
  'response_type=code&' +
  'redirect_uri=YOUR_REDIRECT_URI';
\`\`\`

## Best Practices

- Always use HTTPS in production
- Rotate API keys regularly
- Store credentials securely
- Implement proper error handling

## Rate Limiting

Our API implements rate limiting to ensure fair usage:

| Plan | Requests per minute |
|------|-------------------|
| Free | 100 |
| Pro  | 1,000 |
| Enterprise | 10,000 |
`

const versionHistory = [
  {
    id: 1,
    version: "v2.1",
    author: "Sarah Chen",
    timestamp: "2 hours ago",
    changes: "Added OAuth 2.0 section",
    trustScore: 95,
    status: "current",
  },
  {
    id: 2,
    version: "v2.0",
    author: "Mike Johnson",
    timestamp: "1 day ago",
    changes: "Updated rate limiting table",
    trustScore: 92,
    status: "archived",
  },
  {
    id: 3,
    version: "v1.9",
    author: "AI Assistant",
    timestamp: "3 days ago",
    changes: "Auto-generated best practices",
    trustScore: 88,
    status: "archived",
  },
]

const aiSuggestions = [
  {
    type: "improvement",
    title: "Add Error Handling Examples",
    description: "Consider adding code examples for common error scenarios",
    confidence: 92,
  },
  {
    type: "update",
    title: "Outdated Rate Limits",
    description: "Rate limiting information may be outdated based on recent API changes",
    confidence: 78,
  },
  {
    type: "enhancement",
    title: "Add SDK Examples",
    description: "Include examples using popular SDKs (Python, Node.js, Go)",
    confidence: 85,
  },
]

export default function DocsPage() {
  const [markdown, setMarkdown] = useState(mockMarkdown)
  // Example old and new code for code review
  const oldCode = `function add(a, b) {\n  return a + b;\n}`
  const newCode = `function add(a, b) {\n  if (typeof a !== 'number' || typeof b !== 'number') {\n    throw new Error('Invalid input');\n  }\n  return a + b;\n}`
  const reviewComments = [
    { id: '1', line: 2, text: 'Consider input validation.', author: 'Alice', timestamp: '2h ago' },
    { id: '2', line: 3, text: 'Good error handling!', author: 'Bob', timestamp: '1h ago' },
  ]
  const [isOnline, setIsOnline] = useState(false)
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "split">("split")

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Offline Banner */}
      {!isOnline && (
        <Alert className="mb-4 border-orange-200 bg-orange-50">
          <WifiOff className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Working offline. Changes are cached locally.</span>
            <Button variant="outline" size="sm" onClick={() => setIsOnline(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-balance">API Authentication Guide</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <CheckCircle className="h-3 w-3 mr-1" />
                Trust Score: 95%
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                Updated 2h ago
              </Badge>
              {isOnline ? (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Wifi className="h-3 w-3 mr-1" />
                  Synced
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-lg border bg-muted p-1">
            <Button variant={activeTab === "edit" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("edit")}>
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant={activeTab === "split" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("split")}
            >
              <FileText className="h-4 w-4 mr-1" />
              Split
            </Button>
            <Button
              variant={activeTab === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("preview")}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>

          {/* AI Suggestions Panel */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Suggestions
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  3
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px]">
              <SheetHeader>
                <SheetTitle>AI Suggestions</SheetTitle>
                <SheetDescription>Intelligent recommendations to improve your documentation</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.confidence}% confident
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Quick Actions</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      <Zap className="h-4 w-4 mr-2" />
                      Rewrite Section
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Summarize
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Examples
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Version History */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Version History</SheetTitle>
                <SheetDescription>Track changes and restore previous versions</SheetDescription>
              </SheetHeader>
              <ScrollArea className="mt-6 h-[calc(100vh-12rem)]">
                <div className="space-y-4">
                  {versionHistory.map((version) => (
                    <Card key={version.id} className={version.status === "current" ? "border-primary" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{version.version}</span>
                            {version.status === "current" && (
                              <Badge variant="default" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              version.trustScore >= 90
                                ? "border-green-200 text-green-700"
                                : version.trustScore >= 80
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-red-200 text-red-700"
                            }
                          >
                            {version.trustScore >= 90 ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {version.trustScore}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{version.changes}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>by {version.author}</span>
                          <span>{version.timestamp}</span>
                        </div>
                        {version.status !== "current" && (
                          <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                            <GitBranch className="h-3 w-3 mr-1" />
                            Restore Version
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitBranch className="h-4 w-4 mr-2" />
                Create Branch
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Editor Content */}
      <div
        className="flex-1 grid gap-4"
        style={{
          gridTemplateColumns: activeTab === "edit" ? "1fr" : activeTab === "preview" ? "1fr" : "1fr 1fr",
        }}
      >
        {/* Edit Panel */}
        {activeTab === "edit" && (
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-full border-0 resize-none focus-visible:ring-0 font-mono text-sm"
                placeholder="Start editing your documentation..."
              />
            </CardContent>
          </Card>
        )}

        {/* Split Panel: Code Preview + Markdown Preview */}
        {activeTab === "split" && (
          <>
            <CodePreview />
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ScrollArea className="h-full">
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </>
        )}

        {/* Preview Panel */}
        {(activeTab === "preview" || activeTab === "split") && (
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
