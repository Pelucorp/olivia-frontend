"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16">
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Something went wrong</h2>
              <p className="text-muted-foreground">
                An unexpected error occurred. Please try again or contact support if the problem persists.
              </p>
              {process.env.NODE_ENV === "development" && (
                <div className="mt-4 rounded-md bg-muted p-4 text-left">
                  <p className="text-sm font-medium">Error details:</p>
                  <pre className="mt-2 overflow-auto text-xs">{error.message}</pre>
                </div>
              )}
            </div>
            <Button onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
