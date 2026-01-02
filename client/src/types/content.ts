export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  content: string;
  slug: string;
}

export interface Log {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}

export interface Photo {
  id: string;
  url: string;
  alt: string;
  date: string;
  tags: string[];
}

