import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { logs } from "@/data/content";

export default function DiarySection() {
  return (
    <section id="diary" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            生活日誌
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            DAILY JOURNAL
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-primary/30" />
          
          <div className="space-y-12">
            {logs.map((entry, index) => (
              <div key={entry.id} className="relative pl-8 md:pl-20">
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                
                <Link href={`/logs/${entry.slug}`}>
                  <Card className="p-6 hover-elevate border-primary/20 cursor-pointer" data-testid={`log-entry-${entry.id}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <p className="font-mono text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                    
                    <h3 className="font-serif text-2xl font-bold mb-3">{entry.title}</h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {entry.excerpt}
                    </p>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
