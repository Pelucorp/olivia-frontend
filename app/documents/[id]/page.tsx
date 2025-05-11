"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getDocument, analyzeDocument } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"
import { ErrorDisplay } from "@/components/error-display"
import { RiskDisplay } from "@/components/risk-display"
import { FileText, ArrowLeft, RefreshCw, Clock, Calendar, FileType, Loader2 } from "lucide-react"

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const documentId = params.id as string

  const {
    data: document,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => getDocument(documentId),
  })

  const analyzeMutation = useMutation({
    mutationFn: () => analyzeDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", documentId] })
      toast({
        title: "Analysis complete",
        description: "The document has been successfully analyzed.",
      })
    },
    onError: (error) => {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the document. Please try again.",
        variant: "destructive",
      })
      console.error("Analysis error:", error)
    },
  })

  const handleAnalyze = () => {
    analyzeMutation.mutate()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <Skeleton className="h-9 w-24 mr-4" />
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorDisplay
        title="Failed to load document"
        description="We couldn't load the document details. Please try again later."
        error={error as Error}
        actionText="Back to Documents"
        actionHref="/documents"
      />
    )
  }

  const getDocTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      contract: "Contract",
      agreement: "Agreement",
      nda: "Non-Disclosure Agreement",
      terms: "Terms & Conditions",
      policy: "Privacy Policy",
      other: "Other",
    }
    return types[type] || type
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-4" onClick={() => router.push("/documents")}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{document.title}</h1>
        </div>

        {!document.analyzed && (
          <Button onClick={handleAnalyze} disabled={analyzeMutation.isPending}>
            {analyzeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Analyze Document
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FileType className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Document Type</p>
                  <p className="text-sm text-muted-foreground">{getDocTypeLabel(document.doc_type)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="mt-1">
                    {document.analyzed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Analyzed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending Analysis
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {document.file_info && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">File Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">File Name</p>
                    <p className="text-sm text-muted-foreground">{document.file_info.filename || "Not available"}</p>
                  </div>
                </div>

                {document.file_info.size && (
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">File Size</p>
                      <p className="text-sm text-muted-foreground">{(document.file_info.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          {document.analyzed ? (
            <RiskDisplay risks={document.risks} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analysis Pending</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    This document has not been analyzed yet. Click the "Analyze Document" button to start the analysis
                    process.
                  </p>
                  <Button onClick={handleAnalyze} disabled={analyzeMutation.isPending}>
                    {analyzeMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Analyze Document
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {document.content_preview && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Document Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto rounded-md bg-muted p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono">{document.content_preview}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
