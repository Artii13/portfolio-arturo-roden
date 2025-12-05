import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'link-ia-lab',
    title: 'Link IA Lab',
    description: 'Mi agencia. Un hub completo de soluciones digitales para negocios que quieren escalar sin fricción.',
    tags: ['Web', 'Automatización', 'IA'],
    image: '/images/projects/link-ia-lab.webp',
    color: 'indigo',
    link: 'https://linkialab.com/'
  },
  {
    id: 'sistema-inmobiliario',
    title: 'Sistema Inmobiliario',
    description: 'Asistente conversacional que captura leads, cualifica y agenda visitas automáticamente.',
    tags: ['Agente IA', 'Automatización', 'WhatsApp'],
    image: '/images/projects/inmobiliario.webp',
    color: 'cyan',
    link: '#'
  },
  {
    id: 'ai-assistant-clinicas',
    title: 'AI Assistant Clínicas',
    description: 'Atiende consultas, agenda citas y cualifica pacientes 24/7.',
    tags: ['Agente IA', 'Salud', 'WhatsApp'],
    image: '/images/projects/clinicas.webp',
    color: 'purple',
    link: '#'
  },
  {
    id: 'workflows',
    title: 'Workflows',
    description: 'Flujos de trabajo que conectan herramientas y eliminan tareas repetitivas.',
    tags: ['Automatización', 'APIs', 'Integración'],
    image: '/images/projects/workflows.webp',
    color: 'orange',
    link: '#'
  }
];

// Links importantes
export const links = {
  calendar: 'https://api.leadconnectorhq.com/widget/booking/TAMdWBINVMs81iQMc4TC',
  instagram: 'https://www.instagram.com/linkia.lab/',
  whatsapp: 'https://api.whatsapp.com/send/?phone=34669008370',
  linkedin: 'https://www.linkedin.com/in/arturoroden/',
  linkialab: 'https://linkialab.com/'
} as const;
