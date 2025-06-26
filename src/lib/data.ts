import type { Artist, Minute, Event } from './types';

export const artists: Artist[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(34) 99999-1111',
    disciplines: ['Pintura', 'Escultura'],
    bio: 'Ana Silva é uma artista plástica com foco em expressionismo abstrato. Suas obras exploram a relação entre cor e emoção, criando paisagens vibrantes e dinâmicas.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    artworks: [],
  },
  {
    id: '2',
    name: 'Bruno Costa',
    email: 'bruno.costa@email.com',
    phone: '(34) 99999-2222',
    disciplines: ['Fotografia', 'Arte Digital'],
    bio: 'Bruno Costa captura a essência da vida urbana através de sua lente. Seu trabalho em fotografia de rua e manipulação digital revela narrativas ocultas no cotidiano.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    artworks: [],
  },
  {
    id: '3',
    name: 'Carla Dias',
    email: 'carla.dias@email.com',
    phone: '(34) 99999-3333',
    disciplines: ['Aquarela'],
    bio: 'Carla Dias é uma aquarelista que se inspira na flora e fauna do cerrado brasileiro. Suas pinturas delicadas e detalhadas celebram a beleza da natureza local.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    artworks: [],
  },
  {
    id: '4',
    name: 'Daniel Rocha',
    email: 'daniel.rocha@email.com',
    phone: '(34) 99999-4444',
    disciplines: ['Xilogravura', 'Desenho'],
    bio: 'Mestre da xilogravura, Daniel Rocha retrata contos e lendas do folclore brasileiro. Seus traços fortes e contrastantes dão vida a personagens fantásticos.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    artworks: [],
  },
];

export const minutes: Minute[] = [
  {
    id: 'm1',
    date: '2024-07-15',
    title: 'Reunião Semanal - Planejamento de Exposição',
    content: 'Discussão sobre a próxima exposição coletiva. Definição do tema "Raízes" e cronograma de entrega das obras. A curadoria será feita por Ana Silva e Daniel Rocha. Bruno Costa ficará responsável pela divulgação digital.',
  },
  {
    id: 'm2',
    date: '2024-07-08',
    title: 'Reunião Semanal - Novos Membros',
    content: 'Apresentação e boas-vindas aos novos membros da academia. Discussão sobre o estatuto e as responsabilidades dos membros. Votação para novos projetos de workshops.',
  },
];

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Abertura da Exposição "Raízes"',
    date: new Date('2024-08-10T19:00:00'),
    description: 'Vernissage da exposição coletiva dos membros da Academia Frutalense de Artes.',
  },
  {
    id: 'e2',
    title: 'Workshop de Aquarela com Carla Dias',
    date: new Date('2024-08-17T14:00:00'),
    description: 'Aprenda as técnicas básicas e avançadas de aquarela com a renomada artista Carla Dias.',
  },
  {
    id: 'e3',
    title: 'Palestra: A Arte da Xilogravura',
    date: new Date('2024-09-05T20:00:00'),
    description: 'Daniel Rocha compartilha seu processo criativo e a história da xilogravura no Brasil.',
  },
];
