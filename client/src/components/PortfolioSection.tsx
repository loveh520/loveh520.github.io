import { Link } from "wouter";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { works } from "@/data/content";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            作品展示
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            PROJECT SHOWCASE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((project) => (
            <Link key={project.id} href={`/works/${project.slug}`}>
              <Card
                className="group overflow-hidden hover-elevate active-elevate-2 border-primary/20 cursor-pointer"
                data-testid={`project-card-${project.id}`}
              >
                {project.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="backdrop-blur-md px-4 py-2 rounded-md text-sm font-medium">
                        查看詳情
                      </div>
                    </div>
                  </div>
                )}
                
                <CardHeader className="gap-2 space-y-0 pb-4">
                  <h3 className="font-serif text-xl font-bold">{project.title}</h3>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
                
                <CardFooter className="gap-2 flex-wrap">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
