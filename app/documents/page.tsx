"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllDocuments } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { FileText, Upload } from "lucide-react"
import { DocumentList } from "@/components/document-list"
import { ErrorDisplay } from "@/components/error-display"

export default function DocumentsPage() {
  const { toast } = useToast()

  const {
    data: documents,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: getAllDocuments,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Uploaded Documents</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex space-x-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorDisplay
        title="Failed to load documents"
        description="We couldn't load your documents. Please try again later."
        error={error as Error}
        actionText="Try Again"
        actionHref="/documents"
      />
    )
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Uploaded Documents</h1>
          <Button asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Link>
          </Button>
        </div>

        <Card className="text-center p-12">
          <CardContent className="pt-6">
            <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-muted p-6">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold">No documents yet</h2>
              <p className="text-muted-foreground">
                Upload your first document to get started with Olivia AI's legal analysis.
              </p>
              <Button asChild>
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your First Document
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Uploaded Documents</h1>
        <Button asChild>
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </Button>
      </div>

      <DocumentList documents={documents} />
    </div>
  )
}
