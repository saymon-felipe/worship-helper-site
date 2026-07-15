/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Song, Event, Announcement, PermissionSettings } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Pr. Lucas Silva',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tags: ['Pastor', 'Liderança', 'Pregação']
  },
  {
    id: 'u2',
    name: 'Ana Cláudia (Líder)',
    role: 'leader',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    tags: ['Ministro de Louvor', 'Vocal', 'Teclado']
  },
  {
    id: 'u3',
    name: 'Mateus Ramos',
    role: 'musician',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tags: ['Guitarrista', 'Violonista', 'Backing Vocal']
  },
  {
    id: 'u4',
    name: 'Gabriela Costa',
    role: 'musician',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    tags: ['Tecladista', 'Vocal Principal']
  },
  {
    id: 'u5',
    name: 'Tiago Santos',
    role: 'musician',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    tags: ['Baixista']
  },
  {
    id: 'u6',
    name: 'Danilo Rocha',
    role: 'musician',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    tags: ['Baterista']
  },
  {
    id: 'u7',
    name: 'Sofia Martins',
    role: 'observer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    tags: ['Equipe Técnica', 'Mídia']
  }
];

export const INITIAL_SONGS: Song[] = [
  {
    id: 's1',
    title: 'A Casa é Sua',
    artist: 'Casa Worship',
    originalKey: 'F',
    chords: {
      'F': `[Intro] F  C  Dm  Bb

[Verso 1]
F
  Vem filho amado, vem pra casa
C
  O banquete está pronto, a mesa está posta
Dm
  O pai tem saudade de te abraçar
Bb
  A casa é sua, pode entrar

[Refrão]
F
  Porque a casa é Sua, nós queremos ver
C
  A Sua glória encher este lugar
Dm
  Queremos ver a Sua glória encher
Bb
  Este lugar, pode entrar!

[Ponte]
F                      C
  Deixa a Sua glória brilhar neste lugar
Dm                     Bb
  Deixa a Sua glória brilhar neste lugar`,
      'G': `[Intro] G  D  Em  C

[Verso 1]
G
  Vem filho amado, vem pra casa
D
  O banquete está pronto, a mesa está posta
Em
  O pai tem saudade de te abraçar
C
  A casa é sua, pode entrar

[Refrão]
G
  Porque a casa é Sua, nós queremos ver
D
  A Sua glória encher este lugar
Em
  Queremos ver a Sua glória encher
C
  Este lugar, pode entrar!

[Ponte]
G                      D
  Deixa a Sua glória brilhar neste lugar
Em                     C
  Deixa a Sua glória brilhar neste lugar`,
      'A': `[Intro] A  E  F#m  D

[Verso 1]
A
  Vem filho amado, vem pra casa
E
  O banquete está pronto, a mesa está posta
F#m
  O pai tem saudade de te abraçar
D
  A casa é sua, pode entrar

[Refrão]
A
  Porque a casa é Sua, nós queremos ver
E
  A Sua glória encher este lugar
F#m
  Queremos ver a Sua glória encher
D
  Este lugar, pode entrar!

[Ponte]
A                      E
  Deixa a Sua glória brilhar neste lugar
F#m                     D
  Deixa a Sua glória brilhar neste lugar`
    },
    videoUrl: 'https://www.youtube.com/watch?v=S0g831l_y3k',
    globalComments: [
      {
        id: 'c1',
        authorName: 'Ana Cláudia (Líder)',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        content: 'Lembrem-se que o andamento dessa música é bem suave no início, crescendo bastante a partir da ponte.',
        timestamp: 'Ontem às 18:30'
      },
      {
        id: 'c2',
        authorName: 'Danilo Rocha',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        content: 'Bateria entra bem leve apenas no segundo refrão, galera. Vamos respeitar a dinâmica!',
        timestamp: 'Ontem às 19:15'
      }
    ]
  },
  {
    id: 's2',
    title: 'Caminho no Deserto (Way Maker)',
    artist: 'Soraya Moraes / Sinach',
    originalKey: 'G',
    chords: {
      'G': `[Intro] C  G  D  Em

[Verso 1]
C
  Estás aqui, operando em nosso meio
G
  Te adorarei, Te adorarei
D
  Estás aqui, transformando nossas vidas
Em
  Te adorarei, Te adorarei

[Refrão]
C
  Tu és Deus de milagres, abres caminho
G
  Cumpre promessas, luz nas trevas
D                      Em
  Este é o Teu nome, o meu Deus é assim!

[Ponte]
C
  Mesmo sem ver, sei que estás agindo
G
  Mesmo sem sentir, sei que estás agindo
D
  Não paras de agir, não paras de agir
Em
  Não paras de agir, não paras de agir`,
      'A': `[Intro] D  A  E  F#m

[Verso 1]
D
  Estás aqui, operando em nosso meio
A
  Te adorarei, Te adorarei
E
  Estás aqui, transformando nossas vidas
F#m
  Te adorarei, Te adorarei

[Refrão]
D
  Tu és Deus de milagres, abres caminho
A
  Cumpre promessas, luz nas trevas
E                      F#m
  Este é o Teu nome, o meu Deus é assim!

[Ponte]
D
  Mesmo sem ver, sei que estás agindo
A
  Mesmo sem sentir, sei que estás agindo
E
  Não paras de agir, não paras de agir
F#m
  Não paras de agir, não paras de agir`,
      'C': `[Intro] F  C  G  Am

[Verso 1]
F
  Estás aqui, operando em nosso meio
C
  Te adorarei, Te adorarei
G
  Estás aqui, transformando nossas vidas
Am
  Te adorarei, Te adorarei

[Refrão]
F
  Tu és Deus de milagres, abres caminho
C
  Cumpre promessas, luz nas trevas
G                      Am
  Este é o Teu nome, o meu Deus é assim!

[Ponte]
F
  Mesmo sem ver, sei que estás agindo
C
  Mesmo sem sentir, sei que estás agindo
G
  Não paras de agir, não paras de agir
Am
  Não paras de agir, não paras de agir`
    },
    videoUrl: 'https://www.youtube.com/watch?v=FmS3g07nUQA',
    globalComments: [
      {
        id: 'c3',
        authorName: 'Mateus Ramos',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        content: 'No início eu faço dedilhado bem limpo, no refrão 3 abro um drive bem espaçado.',
        timestamp: 'Há 3 dias'
      }
    ]
  },
  {
    id: 's3',
    title: 'Bondade de Deus',
    artist: 'Isaías Saad',
    originalKey: 'G',
    chords: {
      'G': `[Intro] G  C  G  C

[Verso 1]
G                      C                G
  Te amo, Deus, Tua graça nunca falha
D                      Em              C       D
  Todos os meus dias, em Tuas mãos eu estou
            Em             C          G  D/F#  Em
Desde o amanhecer até o sol se pôr
             C          D           G
Cantarei da bondade de Deus

[Refrão]
C                             G
  Tua fidelidade segue me seguindo
C                               G        D
  Tua bondade me persegue, oh Deus
             C                    G  D/F#  Em
Minha vida entrego, tudo o que sou
                 C          D           G
Pois Tu és tão bom, tão bom pra mim`,
      'A': `[Intro] A  D  A  D

[Verso 1]
A                      D                A
  Te amo, Deus, Tua graça nunca falha
E                      F#m             D       E
  Todos os meus dias, em Tuas mãos eu estou
            F#m            D          A  E/G#  F#m
Desde o amanhecer até o sol se pôr
             D          E           A
Cantarei da bondade de Deus

[Refrão]
D                             A
  Tua fidelidade segue me seguindo
D                               A        E
  Tua bondade me persegue, oh Deus
             D                    A  E/G#  F#m
Minha vida entrego, tudo o que sou
                 D          E           A
Pois Tu és tão bom, tão bom pra mim`,
      'F': `[Intro] F  Bb  F  Bb

[Verso 1]
F                      Bb               F
  Te amo, Deus, Tua graça nunca falha
C                      Dm              Bb      C
  Todos os meus dias, em Tuas mãos eu estou
            Dm             Bb          F  C/E   Dm
Desde o amanhecer até o sol se pôr
             Bb         C           F
Cantarei da bondade de Deus

[Refrão]
Bb                            F
  Tua fidelidade segue me seguindo
Bb                              F        C
  Tua bondade me persegue, oh Deus
             Bb                   F  C/E   Dm
Minha vida entrego, tudo o que sou
                 Bb         C           F
Pois Tu és tão bom, tão bom pra mim`
    },
    videoUrl: 'https://www.youtube.com/watch?v=F0pGgV8p51w',
    globalComments: [
      {
        id: 'c4',
        authorName: 'Sofia Martins',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        content: 'Letra maravilhosa para o momento de comunhão!',
        timestamp: 'Há 5 dias'
      }
    ]
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'Culto de Domingo - Manhã',
    date: '19 de Julho, 09:00',
    type: 'Culto Regular',
    description: 'Culto geral de adoração e celebração. Chegada da equipe para aquecimento e ensaio geral pontualmente às 07:45.',
    songs: [
      {
        songId: 's1',
        key: 'G', // Set customized key for this event!
        comments: [
          {
            id: 'ec1',
            authorName: 'Ana Cláudia (Líder)',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            content: 'Neste domingo faremos o tom G ao invés do F original, para que o backing vocal possa apoiar melhor no refrão alto.',
            timestamp: 'Hoje às 09:12'
          },
          {
            id: 'ec2',
            authorName: 'Gabriela Costa',
            authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
            content: 'Entendido! Tom G perfeito pra mim no piano.',
            timestamp: 'Hoje às 10:20'
          }
        ]
      },
      {
        songId: 's3',
        key: 'G',
        comments: [
          {
            id: 'ec3',
            authorName: 'Ana Cláudia (Líder)',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            content: 'Será nossa música de encerramento após a palavra. Foco na ministração espontânea final.',
            timestamp: 'Hoje às 09:15'
          }
        ]
      }
    ],
    roster: [
      { userId: 'u2', role: 'Ministro de Louvor (Vocal)' },
      { userId: 'u3', role: 'Guitarra Solo' },
      { userId: 'u4', role: 'Teclado / Piano' },
      { userId: 'u5', role: 'Baixo Elétrico' },
      { userId: 'u6', role: 'Bateria' },
      { userId: 'u7', role: 'Sonorização / Mesa de Som' }
    ]
  },
  {
    id: 'e2',
    name: 'Conexão Jovem - Fire Night',
    date: '25 de Julho, 19:30',
    type: 'Culto de Jovens',
    description: 'Reunião especial dos jovens. Estilo musical mais enérgico com dinâmicas eletrônicas. Ensaio no local às 18:00.',
    songs: [
      {
        songId: 's2',
        key: 'A',
        comments: [
          {
            id: 'ec4',
            authorName: 'Mateus Ramos',
            authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
            content: 'Vou colocar bastante delay de colcheia pontuada nessa introdução do Way Maker. Vai soar muito espacial!',
            timestamp: 'Ontem às 14:02'
          }
        ]
      },
      {
        songId: 's1',
        key: 'A',
        comments: [
          {
            id: 'ec5',
            authorName: 'Danilo Rocha',
            authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
            content: 'Nesse culto jovem faremos um andamento um pouco mais acelerado e com batida bem marcada, estilo rock de arena.',
            timestamp: 'Ontem às 15:45'
          }
        ]
      }
    ],
    roster: [
      { userId: 'u2', role: 'Backing Vocal / Acústico' },
      { userId: 'u3', role: 'Guitarra / Vocal' },
      { userId: 'u5', role: 'Baixo Elétrico' },
      { userId: 'u6', role: 'Bateria' },
      { userId: 'u7', role: 'Mídia / Projeção de Letras' }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Cadastro do Novo Repertório de Primavera 🌸',
    content: 'Olá equipe! Adicionamos 5 novas canções no nosso banco de músicas do Worship Helper. Peço que todos abram o app, vejam as cifras, ouçam os links originais gravados e comecem a treinar as modulações e tons. Estaremos ensaiando as novidades já no ensaio de quinta-feira geral da próxima semana!',
    authorName: 'Ana Cláudia (Líder)',
    authorRole: 'Líder de Louvor',
    date: '14 de Julho (Hoje)',
    comments: [
      {
        id: 'ac1',
        authorName: 'Tiago Santos',
        authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        content: 'Show de bola, Ana! Vou tirar as linhas de baixo hoje mesmo. Parabéns pela escolha das músicas.',
        timestamp: 'Há 2 horas'
      },
      {
        id: 'ac2',
        authorName: 'Mateus Ramos',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        content: 'Top demais, os tons já estão salvos certinhos no tom original?',
        timestamp: 'Há 1 hora'
      }
    ]
  },
  {
    id: 'a2',
    title: 'Encontro de Alinhamento Espiritual e Técnico',
    content: 'Pastor Lucas convoca todos os ministros, músicos, técnicos de som, equipe de projeção e voluntários do louvor para um café da manhã de comunhão e alinhamento neste sábado às 08:30 no templo principal. Vamos orar juntos e conversar sobre o planejamento do segundo semestre e as novas diretrizes do ministério.',
    authorName: 'Pr. Lucas Silva',
    authorRole: 'Pastor Sênior',
    date: '12 de Julho',
    comments: [
      {
        id: 'ac3',
        authorName: 'Sofia Martins',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        content: 'Estarei presente com certeza! Momento muito necessário.',
        timestamp: 'Há 2 dias'
      }
    ]
  }
];

export const INITIAL_PERMISSIONS: PermissionSettings = {
  invite_members: ['admin', 'leader'],
  remove_members: ['admin', 'leader'],
  create_events: ['admin', 'leader'],
  add_songs: ['admin', 'leader', 'musician'],
  manage_announcements: ['admin', 'leader']
};
