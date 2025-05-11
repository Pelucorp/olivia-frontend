import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16">
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-muted p-4">
              <FileQuestion className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">404</h1>
              <h2 className="text-2xl font-bold">Page Not Found</h2>
              <p className="text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
            </div>
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
