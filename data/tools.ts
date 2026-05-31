export type ResearchModel = 'with-feed' | 'against-feed' | 'both'
export type ToolStatus = 'live' | 'coming-soon'
export type ToolCategory = 'research' | 'education'

export interface Tool {
  slug: string
  name: string
  tagline: string
  description: string
  researchModel: ResearchModel
  researchNote: string
  externalUrl?: string
  githubUrl?: string
  status: ToolStatus
  category: ToolCategory
}

export const tools: Tool[] = [
  {
    slug: 'close-reading',
    name: 'Close Reading',
    tagline: 'Structured visual analysis before interpretation',
    description:
      'A step-by-step tool that guides students through sustained looking before they reach for meaning. Prompts slow the process down: what repeats, what shifts, what is ambiguous. Students build an evidence base before they make any claims.',
    researchModel: 'against-feed',
    researchNote:
      'Supports archive-first teaching by making visual attention deliberate and explicit. Resists the feed impulse to move on before comprehension has landed.',
    externalUrl: 'https://closereading.classroomtools.io',
    githubUrl: 'https://github.com/ohwowgreat/close-reader',
    status: 'live',
    category: 'research',
  },
  {
    slug: 'constellation-board',
    name: 'Constellation Board',
    tagline: 'Place images in relation. Find what connects them.',
    description:
      'A Warburg-inspired tool for arranging images spatially and discovering the patterns that emerge from adjacency. Students juxtapose works, articulate connections, and build arguments before they are given explanations. The board becomes a visible record of their thinking.',
    researchModel: 'with-feed',
    researchNote:
      'The primary tool for feed-like discovery: juxtaposition and adjacency generate pattern recognition before full context is given.',
    externalUrl: 'https://constellation.classroomtools.io',
    githubUrl: 'https://github.com/ohwowgreat/Constellation-Board',
    status: 'live',
    category: 'research',
  },
  {
    slug: 'curatewith-art',
    name: 'Curatewith.art',
    tagline: 'A class-built, revisitable image bank',
    description:
      'A shared archive that the class builds and returns to across a unit or course. Students add images, annotate connections, and revisit earlier entries as their thinking develops. The archive grows with the class and becomes a cumulative reference.',
    researchModel: 'against-feed',
    researchNote:
      'The core tool for archive-first teaching: stable, shared, memory-oriented. The class returns to the same bank rather than always encountering the new.',
    externalUrl: 'https://curatewith.art',
    githubUrl: 'https://github.com/ohwowgreat/open-archive',
    status: 'live',
    category: 'research',
  },
  {
    slug: 'attention-heatmap',
    name: 'Attention Heatmap',
    tagline: 'Make looking visible across a whole class',
    description:
      'Students mark where their eye goes first, second, and third on an image. Class results build up visually, making viewing patterns visible and giving everyone something concrete to discuss.',
    researchModel: 'both',
    researchNote:
      'Surfaces the assumptions students bring to images before teaching begins. Useful in either model.',
    externalUrl: 'https://heatmap.classroomtools.io',
    githubUrl: 'https://github.com/ohwowgreat/attention-heatmap',
    status: 'live',
    category: 'research',
  },
  {
    slug: 'lockdown-browser',
    name: 'Lockdown Browser',
    tagline: 'Fullscreen exams on your local network, no internet required',
    description:
      'A cross-platform desktop app built with Electron. Teachers create exams and host them locally. Students open the app, enter a code, and get locked into a fullscreen exam with no tab-switching, no shortcuts, no escape. Everything runs on your local network.',
    researchModel: 'both',
    researchNote:
      'Assessment infrastructure that keeps the exam environment controlled without relying on external services.',
    externalUrl: 'https://exam.classroomtools.io',
    githubUrl: 'https://github.com/ohwowgreat/Lockdown-Browser',
    status: 'live',
    category: 'education',
  },
  {
    slug: 'invigilation-clock',
    name: 'Invigilation Clock',
    tagline: 'Visible timing and pacing for in-room exams',
    description:
      'A display tool for managing exam time in the room. Shows remaining time, marks key intervals, and gives students and the teacher a shared reference throughout the assessment.',
    researchModel: 'both',
    researchNote:
      'Classroom infrastructure for assessments.',
    status: 'coming-soon',
    category: 'education',
  },
  {
    slug: 'jpeg-degradation',
    name: 'JPEG Degradation',
    tagline: 'Watch an image lose data every time it is saved',
    description:
      'A demonstration tool that makes lossy compression visible. Each time a JPEG is re-saved, it loses data. Run the sequence and watch the image degrade. A provocation for a lesson on what platforms do to images in circulation.',
    researchModel: 'with-feed',
    researchNote:
      'Opens a lesson on algorithmic image culture: how images are compressed, optimised, and altered in circulation before they reach anyone\'s feed.',
    status: 'live',
    category: 'research',
  },
]

export const researchModelLabel: Record<ResearchModel, string> = {
  'with-feed': 'Teaching with the feed',
  'against-feed': 'Teaching against the feed',
  both: 'Both models',
}

export const researchModelColor: Record<ResearchModel, string> = {
  'with-feed': 'feed',
  'against-feed': 'archive',
  both: 'stone',
}

export function getTools(): Tool[] {
  return tools
}
