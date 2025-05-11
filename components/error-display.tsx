import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { AlertTriangle, ArrowLeft } from "lucide-react"

type ErrorDisplayProps = {
  title: string
  description: string
  error?: Error
  actionText?: string
  actionHref?: string
}

export function ErrorDisplay({
  title,
  description,
  error,
  actionText = "Go Back",
  actionHref = "/",
}: ErrorDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
              {error && process.env.NODE_ENV === "development" && (
                <div className="mt-4 rounded-md bg-muted p-4 text-left">
                  <p className="text-sm font-medium">Error details:</p>
                  <pre className="mt-2 overflow-auto text-xs">{error.message}</pre>
                </div>
              )}
            </div>
            <Button asChild>
              <Link href={actionHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {actionText}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
