import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { photos } from "@/data/content";

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(photos.flatMap(p => p.tags)));
  
  const filteredPhotos = activeTag 
    ? photos.filter(p => p.tags.includes(activeTag))
    : photos;

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            生活相簿
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            PHOTO GALLERY
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-12 flex-wrap">
          <Badge
            variant={activeTag === null ? "default" : "secondary"}
            className="cursor-pointer hover-elevate active-elevate-2"
            onClick={() => setActiveTag(null)}
            data-testid="filter-all"
          >
            全部
          </Badge>
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "secondary"}
              className="cursor-pointer hover-elevate active-elevate-2"
              onClick={() => setActiveTag(tag)}
              data-testid={`filter-${tag}`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="group overflow-hidden cursor-pointer hover-elevate active-elevate-2 border-primary/20"
              onClick={() => setSelectedPhoto(photo)}
              data-testid={`photo-card-${photo.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-mono text-xs text-primary mb-2">{photo.date}</p>
                  <div className="flex gap-2 flex-wrap">
                    {photo.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
          data-testid="photo-lightbox"
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-md hover-elevate active-elevate-2"
            onClick={() => setSelectedPhoto(null)}
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl w-full">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <p className="font-mono text-sm text-muted-foreground">{selectedPhoto.date}</p>
              <p className="text-lg mt-2">{selectedPhoto.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
