export type ResearchModel = 'with-feed' | 'against-feed' | 'both'
export type ToolStatus = 'live' | 'coming-soon' | 'testing'
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
  /** Card screenshot under public/shots (720px wide). */
  screenshot?: string
  /** Larger variant for tool pages (960px wide), when one exists. */
  screenshotLg?: string
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
    screenshot: '/shots/close-reading.jpg',
    screenshotLg: '/shots/close-reading-lg.jpg',
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
    screenshot: '/shots/constellation-board.jpg',
    screenshotLg: '/shots/constellation-board-lg.jpg',
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
    githubUrl: 'https://github.com/ohwowgreat/curatewith-art',
    status: 'live',
    category: 'research',
    screenshot: '/shots/curatewith-art.jpg',
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
    screenshot: '/shots/attention-heatmap.jpg',
  },
  {
    slug: 'lms',
    name: 'Cadence LMS',
    tagline: 'A learning management system built around the research',
    description:
      'A lightweight LMS designed to support the instructional models at the centre of the Teaching After the Feed research. Built to make the structure of a course visible and navigable: what students have seen, what they return to, what comes next. Designed for depth over novelty.',
    researchModel: 'both',
    researchNote:
      'The LMS as a structural argument: the interface embodies the research rather than sitting beside it. Course architecture shapes whether students encounter the feed model or the archive model.',
    externalUrl: 'https://lms.classroomtools.io',
    status: 'testing',
    category: 'research',
    screenshot: '/shots/lms.jpg',
    screenshotLg: '/shots/lms-lg.jpg',
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
    status: 'testing',
    category: 'education',
    screenshot: '/shots/lockdown-browser.jpg',
  },
  {
    slug: 'reflow',
    name: 'Reflow',
    tagline: 'Course planning that knows your calendar',
    description:
      'Every course in one AI-maintained folder, planned against the real school calendar. When an interruption removes a teaching week, it finds the next fixed deadline, recomputes what still fits, updates every page that carried the old dates, and states plainly what had to be traded away. The pages a teacher approves publish to a password-protected course site, one page at a time, with anything under a Teacher notes heading cut before it can leave.',
    researchModel: 'against-feed',
    researchNote:
      'Course infrastructure built on the archive rather than the stream. The folder is a compounding record that the teacher and the class return to, and the student site is stable and revisitable rather than a chronological drip of posts. Following the LLM wiki pattern, knowledge is compiled once and maintained, not re-derived each time it is needed.',
    externalUrl: 'https://reflow.classroomtools.io',
    githubUrl: 'https://github.com/ohwowgreat/reflow',
    status: 'testing',
    category: 'research',
    screenshot: '/shots/reflow.jpg',
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
    name: 'The Travelling Image',
    tagline: 'Watch an image lose data every time it is saved',
    description:
      'A demonstration tool that makes lossy compression visible. Each time a JPEG is re-saved, it loses data. Run the sequence and watch the image degrade. A provocation for a lesson on what platforms do to images in circulation.',
    researchModel: 'with-feed',
    researchNote:
      'Opens a lesson on algorithmic image culture: how images are compressed, optimised, and altered in circulation before they reach anyone\'s feed.',
    githubUrl: 'https://github.com/ohwowgreat/jpegdegradation',
    status: 'live',
    category: 'research',
    screenshot: '/shots/jpeg-degradation.jpg',
  },
]

export const researchModelLabel: Record<ResearchModel, string> = {
  'with-feed': 'With the feed',
  'against-feed': 'Against the feed',
  both: 'Either model',
}

export function getTools(): Tool[] {
  return tools
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}

export interface SiteStats {
  total: number
  live: number
  models: number
  openRepos: number
}

export function getStats(): SiteStats {
  return {
    total: tools.length,
    live: tools.filter((t) => t.status === 'live').length,
    models: 2,
    openRepos: tools.filter((t) => t.githubUrl).length,
  }
}
