import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CodeReviewComment {
  id: string
  line: number
  text: string
  author: string
  timestamp: string
}

export const CodePreview: React.FC = () => {
  // API connection code snippets
  const code = `# API Authentication Guide\n\n## 1. API Key Authentication (Bash)\n\n\u0060\u0060\u0060bash\ncurl -H \"Authorization: Bearer YOUR_API_KEY\" \\n  https://api.example.com/v1/users\n\u0060\u0060\u0060\n\n## 2. OAuth 2.0 Authentication (JavaScript)\n\n\u0060\u0060\u0060javascript\nconst authUrl = 'https://api.example.com/oauth/authorize?' +\n  'client_id=YOUR_CLIENT_ID&' +\n  'response_type=code&' +\n  'redirect_uri=YOUR_REDIRECT_URI';\n\u0060\u0060\u0060`

  const lines = code.split("\n")
  // Example comments
  const comments: CodeReviewComment[] = [
    { id: '1', line: 7, text: 'Consider adding a warning about exposing API keys.', author: 'Alice', timestamp: '2h ago' },
    { id: '2', line: 15, text: 'Should we mention PKCE for OAuth 2.0?', author: 'Bob', timestamp: '1h ago' },
  ]
  return (
    <Card className="overflow-x-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          Code Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-xs font-mono border-separate border-spacing-y-1">
          <tbody>
            {lines.map((line, idx) => {
              const lineComments = comments.filter(c => c.line === idx + 1)
              return (
                <tr key={idx} className={lineComments.length ? "bg-yellow-50" : ""}>
                  <td className="pr-2 text-right text-muted-foreground w-8">{idx + 1}</td>
                  <td className="whitespace-pre-wrap text-foreground">{line}</td>
                  <td>
                    {lineComments.map(comment => (
                      <div key={comment.id} className="mb-1">
                        <Badge variant="outline" className="mr-1">{comment.author}</Badge>
                        <span className="italic text-xs text-muted-foreground">{comment.text}</span>
                      </div>
                    ))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="default">Approve</Button>
          <Button size="sm" variant="outline">Request Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
