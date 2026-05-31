import Nav from '@/components/Nav'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed left sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-40 p-5 overflow-y-auto shrink-0">
        <Nav />
      </aside>
      {/* Scrollable content */}
      <main className="ml-40 flex-1 pt-5 pr-10 pb-10 max-w-2xl">
        {children}
      </main>
    </div>
  )
}
