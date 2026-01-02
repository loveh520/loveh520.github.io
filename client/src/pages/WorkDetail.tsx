import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import MarkdownContent from "@/components/MarkdownContent";
import { works } from "@/data/content";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function WorkDetail() {
  const [, params] = useRoute("/works/:slug");
  const work = works.find((w) => w.slug === params?.slug);

  if (!work) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">找不到作品</h2>
            <p className="text-muted-foreground">這篇作品可能不存在</p>
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
          <Link href="/#portfolio">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回作品集
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold font-serif">{work.title}</h1>
            <p className="text-muted-foreground text-lg">{work.description}</p>
            {work.imageUrl && (
              <div className="aspect-video bg-accent rounded-lg overflow-hidden">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {work.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            {(work.demoUrl && work.demoUrl !== "#") || (work.githubUrl && work.githubUrl !== "#") ? (
              <div className="flex gap-3">
                {work.demoUrl && work.demoUrl !== "#" && (
                  <Button className="gap-2" asChild>
                    <a href={work.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      查看 Demo
                    </a>
                  </Button>
                )}
                {work.githubUrl && work.githubUrl !== "#" && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={work.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      原始碼
                    </a>
                  </Button>
                )}
              </div>
            ) : null}
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="border-t pt-6">
              <MarkdownContent content={work.content} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

