import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"

type Risk = {
  id: string
  severity: "high" | "medium" | "low"
  description: string
  recommendation?: string
  clause?: string
  category?: string
}

type RiskDisplayProps = {
  risks: Risk[]
}

export function RiskDisplay({ risks }: RiskDisplayProps) {
  const highRisks = risks.filter((risk) => risk.severity === "high")
  const mediumRisks = risks.filter((risk) => risk.severity === "medium")
  const lowRisks = risks.filter((risk) => risk.severity === "low")

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "low":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="outline" className="border-red-200 bg-red-100 text-red-800">
            High Risk
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-200 bg-yellow-100 text-yellow-800">
            Medium Risk
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-blue-200 bg-blue-100 text-blue-800">
            Low Risk
          </Badge>
        )
      default:
        return null
    }
  }

  const RiskCard = ({ risk }: { risk: Risk }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">{getSeverityIcon(risk.severity)}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {getSeverityBadge(risk.severity)}
              {risk.category && <Badge variant="outline">{risk.category}</Badge>}
            </div>
            <p className="font-medium mb-2">{risk.description}</p>

            {risk.clause && (
              <div className="my-3 rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground mb-1">Relevant Clause:</p>
                <p className="text-sm italic">"{risk.clause}"</p>
              </div>
            )}

            {risk.recommendation && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Recommendation:</p>
                <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (risks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-green-100 p-6 mb-4">
              <Info className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Risks Detected</h3>
            <p className="text-muted-foreground max-w-md">
              Our analysis did not detect any legal risks in this document. This is a good sign, but we recommend a
              thorough review by a legal professional.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Risk Assessment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge variant="outline" className="border-red-200 bg-red-100 text-red-800">
            {highRisks.length} High Risk{highRisks.length !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline" className="border-yellow-200 bg-yellow-100 text-yellow-800">
            {mediumRisks.length} Medium Risk{mediumRisks.length !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline" className="border-blue-200 bg-blue-100 text-blue-800">
            {lowRisks.length} Low Risk{lowRisks.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        <Tabs defaultValue={highRisks.length > 0 ? "high" : mediumRisks.length > 0 ? "medium" : "low"}>
          <TabsList className="mb-4">
            <TabsTrigger value="high" disabled={highRisks.length === 0}>
              High ({highRisks.length})
            </TabsTrigger>
            <TabsTrigger value="medium" disabled={mediumRisks.length === 0}>
              Medium ({mediumRisks.length})
            </TabsTrigger>
            <TabsTrigger value="low" disabled={lowRisks.length === 0}>
              Low ({lowRisks.length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({risks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="high" className="mt-0">
            {highRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </TabsContent>

          <TabsContent value="medium" className="mt-0">
            {mediumRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </TabsContent>

          <TabsContent value="low" className="mt-0">
            {lowRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            {risks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
