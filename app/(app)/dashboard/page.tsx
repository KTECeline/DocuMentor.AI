"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, CheckCircle, Clock, Users, GitBranch, Zap, FileText, Activity } from "lucide-react"

// Mock data for charts
const trustScoreData = [
  { name: "Fresh", value: 94, color: "hsl(var(--chart-1))" },
  { name: "Stale", value: 6, color: "hsl(var(--chart-4))" },
]

const activityData = [
  { month: "Jan", updates: 45, contributors: 8 },
  { month: "Feb", updates: 52, contributors: 12 },
  { month: "Mar", updates: 38, contributors: 10 },
  { month: "Apr", updates: 61, contributors: 15 },
  { month: "May", updates: 55, contributors: 13 },
  { month: "Jun", updates: 67, contributors: 18 },
]

const docsHealthData = [
  { name: "API Docs", fresh: 85, stale: 15 },
  { name: "User Guides", fresh: 92, stale: 8 },
  { name: "Tutorials", fresh: 78, stale: 22 },
  { name: "Reference", fresh: 96, stale: 4 },
]

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "Updated API documentation",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Mike Johnson",
    action: "Generated new tutorial",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "AI Assistant",
    action: "Suggested 3 improvements",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Emma Davis",
    action: "Synced with GitHub repo",
    time: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 slide-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your documentation health and team activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hover-lift bg-transparent">
            <GitBranch className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          <Button size="sm" className="glow-primary">
            <Zap className="h-4 w-4 mr-2 ai-sparkle" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-primary" />
              +2.1% from last month
            </div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Docs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-primary" />
              +12 this week
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Suggestions</CardTitle>
            <Zap className="h-4 w-4 text-chart-5 ai-sparkle" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              Pending review
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-primary" />
              +3 this month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Documentation Health</CardTitle>
            <CardDescription>Fresh vs stale documentation breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trustScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trustScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <span className="text-sm">Fresh (94%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-4" />
                <span className="text-sm">Stale (6%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
            <CardDescription>Documentation updates and contributor activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="updates"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="contributors"
                    stackId="2"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Documentation Categories</CardTitle>
            <CardDescription>Health status across different doc types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={docsHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fresh" stackId="a" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="stale" stackId="a" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary ai-sparkle" />
            AI Auto-Proposal Demo
          </CardTitle>
          <CardDescription>Automatically generated documentation proposals based on code changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/50 p-4 hover:bg-muted/70 transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary glow-primary">
                <Activity className="h-3 w-3 mr-1 ai-sparkle" />
                Auto-Generated
              </Badge>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </div>
            <h4 className="font-semibold mb-2">Proposed: Update Authentication API Documentation</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Detected changes in auth.ts - new OAuth provider support added. Suggested updates to API reference and
              integration guide.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="default" className="glow-primary">
                <CheckCircle className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                Review Changes
              </Button>
              <Button size="sm" variant="ghost">
                Dismiss
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
