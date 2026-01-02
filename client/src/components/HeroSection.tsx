import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToContent = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/attached_assets/generated_images/Tech_hero_background_pattern_99359e83.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-6">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              林小明
            </span>
          </h1>
          
          <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            [ 學生 · 創作者 · 記錄者 ]
          </p>
          
          <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
            在這個數位空間裡，我記錄生活的點滴、分享創作的成果，
            <br className="hidden md:block" />
            用科技的語言書寫屬於自己的故事
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-view-gallery"
            >
              探索相簿
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.querySelector('#guestbook')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-leave-message"
              className="backdrop-blur-md"
            >
              留言給我
            </Button>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-label="向下滾動"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </button>
    </section>
  );
}
