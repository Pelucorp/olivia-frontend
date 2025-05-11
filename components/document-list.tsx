import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Document = {
  id: string
  title: string
  doc_type: string
  created_at: string
  analyzed: boolean
  risk_count?: {
    high?: number
    medium?: number
    low?: number
  }
}

type DocumentListProps = {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
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

  const getDocumentStatus = (doc: Document) => {
    if (!doc.analyzed) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Pending Analysis</span>
        </Badge>
      )
    }

    const highRisks = doc.risk_count?.high || 0

    if (highRisks > 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          <span>
            {highRisks} High Risk{highRisks > 1 ? "s" : ""}
          </span>
        </Badge>
      )
    }

    return (
      <Badge variant="success" className="flex items-center gap-1 bg-green-500 hover:bg-green-600">
        <CheckCircle className="h-3 w-3" />
        <span>No High Risks</span>
      </Badge>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1 line-clamp-1">{doc.title}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{getDocTypeLabel(doc.doc_type)}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 mt-1">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
              </div>

              <div className="flex space-x-2 mb-4">
                {getDocumentStatus(doc)}
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}</span>
                </Badge>
              </div>

              {doc.analyzed && doc.risk_count && (
                <div className="flex space-x-2 mb-4">
                  {doc.risk_count.high ? (
                    <Badge
                      variant="outline"
                      className="border-red-200 bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                    >
                      {doc.risk_count.high} High
                    </Badge>
                  ) : null}

                  {doc.risk_count.medium ? (
                    <Badge
                      variant="outline"
                      className="border-yellow-200 bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
                    >
                      {doc.risk_count.medium} Medium
                    </Badge>
                  ) : null}

                  {doc.risk_count.low ? (
                    <Badge
                      variant="outline"
                      className="border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                    >
                      {doc.risk_count.low} Low
                    </Badge>
                  ) : null}
                </div>
              )}

              <p className="text-sm text-muted-foreground line-clamp-3">
                {doc.analyzed
                  ? "This document has been analyzed. View the detailed risk assessment."
                  : "This document is pending analysis. Click to view details and start analysis."}
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-4">
            <Button asChild className="w-full">
              <Link href={`/documents/${doc.id}`}>View Document</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
