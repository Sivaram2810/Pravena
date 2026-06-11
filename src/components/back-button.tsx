import { ArrowLeft } from 'lucide-react'

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Return to your universe"
      className="group fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-[rgba(247,215,116,0.3)] bg-[rgba(247,215,116,0.06)] px-4 py-2 text-sm tracking-widest text-gold backdrop-blur-md transition-all hover:border-gold hover:bg-[rgba(247,215,116,0.14)]"
      style={{ fontFamily: 'var(--font-cinzel)' }}
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      <span>UNIVERSE</span>
    </button>
  )
}
