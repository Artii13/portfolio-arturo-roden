// Project Types

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  color: 'indigo' | 'cyan' | 'purple' | 'orange';
  link: string;
}
