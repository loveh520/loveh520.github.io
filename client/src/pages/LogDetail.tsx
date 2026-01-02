import { useRoute } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import MarkdownContent from "@/components/MarkdownContent";
import { logs } from "@/data/content";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LogDetail() {
  const [, params] = useRoute("/logs/:slug");
  const log = logs.find((l) => l.slug === params?.slug);

  if (!log) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">找不到日誌</h2>
            <p className="text-muted-foreground">這篇日誌可能不存在</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/#diary">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回日誌列表
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold font-serif">{log.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">{log.date}</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="border-t pt-6">
              <MarkdownContent content={log.content} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

