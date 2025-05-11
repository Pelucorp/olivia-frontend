import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { FileText, Upload, Shield, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to Olivia AI
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                AI-powered legal document analysis for risk assessment and enhanced legal comprehension
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Document
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/documents">View Your Documents</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Upload Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Easily upload your legal documents in PDF or plain text format for analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your documents to identify legal risks and extract important metadata.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Get detailed risk assessments categorized by severity to help you make informed decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to get started?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Upload your first document and see how Olivia AI can help you identify legal risks.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/upload">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
