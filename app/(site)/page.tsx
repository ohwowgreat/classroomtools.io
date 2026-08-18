import Link from 'next/link'
import { getTools, getStats } from '@/data/tools'
import ToolGrid from '@/components/ToolGrid'
import FeedbackForm from '@/components/FeedbackForm'

const numberWord = (n: number) =>
  ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][n] ?? String(n)

export default function HomePage() {
  const tools = getTools()
  const stats = getStats()

  return (
    <>
      <div className="wrap">

        {/* Hero */}
        <section className="pt-12 pb-10 sm:pt-16">
          <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-[18px]">
            <span className="chip chip-acc rise">
              {numberWord(stats.total)[0].toUpperCase() + numberWord(stats.total).slice(1)} tools · free · {numberWord(stats.openRepos)} open source
            </span>
            <h1 className="rise" style={{ animationDelay: '45ms' }}>
              Built in a real classroom.<br />Shared with yours.
            </h1>
            <p className="lede max-w-[620px] rise" style={{ animationDelay: '90ms' }}>
              classroomtools.io collects the tools behind <em>Teaching After the Feed</em>, an
              action research project on how students learn in algorithmic culture. Some come
              straight from the research. Others are simply useful. Every one began as a real
              classroom problem.
            </p>
            <div className="flex flex-wrap justify-center gap-[10px] rise" style={{ animationDelay: '135ms' }}>
              <a className="btn" href="#tools">Browse the tools</a>
              <Link className="btn btn-ghost" href="/research">About the research</Link>
            </div>
          </div>

          {/* Screenshot fan */}
          <div
            className="grid items-start gap-[14px] mt-11 rise grid-cols-1 md:[grid-template-columns:264px_1fr_264px]"
            style={{ animationDelay: '180ms' }}
          >
            <div className="shot hidden md:block md:mt-10">
              <img src="/shots/constellation-board.jpg" alt="Constellation Board with a seeded class board" />
            </div>
            <div className="shot" style={{ borderColor: 'var(--border-strong)' }}>
              <picture>
                <source srcSet="/shots/lms-lg-dark.jpg" media="(prefers-color-scheme: dark)" />
                <img src="/shots/lms-lg.jpg" alt="Cadence LMS dashboard" />
              </picture>
            </div>
            <div className="shot hidden md:block md:mt-10">
              <img src="/shots/close-reading.jpg" alt="Close Reading with live class annotations" />
            </div>
          </div>
          <p className="shotcap">
            Constellation Board, Cadence LMS, and Close Reading — the real interfaces, in use.
          </p>
        </section>

        {/* Stats */}
        <section className="sect !py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px]">
            <div className="num"><div className="num-v mono">{stats.total}</div><div className="num-k">Tools</div></div>
            <div className="num"><div className="num-v mono">{stats.live}</div><div className="num-k">Live in classrooms</div></div>
            <div className="num"><div className="num-v mono">{stats.models}</div><div className="num-k">Instructional models</div></div>
            <div className="num"><div className="num-v mono">{stats.openRepos}</div><div className="num-k">Open repositories</div></div>
          </div>
        </section>

        {/* All tools */}
        <section className="sect" id="tools">
          <div className="text-center mb-8 flex flex-col gap-[10px]">
            <p className="eyebrow">The tools</p>
            <h2>Small tools, built for one lesson at a time.</h2>
          </div>
          <ToolGrid tools={tools} />
        </section>

        {/* Research */}
        <section className="sect" id="research">
          <div className="text-center mb-[30px] flex flex-col gap-[10px]">
            <p className="eyebrow">The research</p>
            <h2>Two ways to shape a lesson.</h2>
            <p className="lede max-w-[600px] mx-auto">
              <em>Teaching After the Feed</em> runs the same course through two structural
              models and asks which teacher moves matter, under what conditions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="card !p-[22px]">
              <span className="chip chip-feed">Model A · With the feed</span>
              <h3 className="mt-[10px]">The lesson is shaped like a curated discovery.</h3>
              <p className="sec mt-[5px]">
                Sequences that borrow the feed&rsquo;s structural logic — adjacency, contrast,
                incremental reveal — without handing control to a platform. Students meet
                examples before explanations.
              </p>
              <p className="ter mt-[10px]">Constellation Board · The Travelling Image</p>
            </div>
            <div className="card !p-[22px]">
              <span className="chip chip-archive">Model B · Against the feed</span>
              <h3 className="mt-[10px]">The lesson is shaped like a library, not a queue.</h3>
              <p className="sec mt-[5px]">
                Archive-first structures that resist novelty in favour of return, reuse, and
                accumulation. Students begin from a stable reference bank and revisit before
                new material is introduced.
              </p>
              <p className="ter mt-[10px]">Close Reading · Curatewith.art · Reflow</p>
            </div>
          </div>
          <p className="ter text-center mt-4">
            Attention Heatmap and Cadence LMS serve both models; Lockdown Browser and the
            Invigilation Clock are classroom infrastructure.{' '}
            <Link href="/research">Read the research →</Link>
          </p>
        </section>

        {/* Quote */}
        <section className="sect">
          <div className="max-w-[640px] mx-auto text-center">
            <p className="quote-q">&ldquo;The less we teach, the more something else does.&rdquo;</p>
            <p className="ter mt-[10px]">Venkatesh Rao, <em>Deep Teaching</em> (2025)</p>
          </div>
        </section>

        {/* Suggest */}
        <section className="sect" id="suggest">
          <div className="card !p-6 md:!p-7 grid grid-cols-1 md:grid-cols-2 gap-7 items-start">
            <div>
              <h3 className="text-[16px]">Suggest a tool</h3>
              <p className="sec mt-2 max-w-[420px]">
                New tools come from real classroom problems. Describe something that feels
                broken, repetitive, or missing. Not every idea becomes a tool, but every
                idea is read.
              </p>
            </div>
            <FeedbackForm githubRepo="ohwowgreat/classroomtools.io" defaultType="feature" />
          </div>
        </section>

      </div>
    </>
  )
}
