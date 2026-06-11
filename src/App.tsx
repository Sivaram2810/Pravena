import { useState } from 'react'
import { Opening } from './components/opening'
import { SolarHub } from './components/solar-hub'
import { PhotoGallery } from './components/photo-gallery'
import { Chronicles } from './components/chronicles'
import { Echoes } from './components/echoes'
import { Oracle } from './components/oracle'
import { Eternity } from './components/eternity'
import { Serendipity } from './components/serendipity'
import { Void } from './components/void-planet'
import { AURA_PHOTOS, COSMOS_PHOTOS, type PlanetId } from './lib/birthday-data'

type Screen = 'opening' | 'hub' | PlanetId

export default function App() {
  const [screen, setScreen] = useState<Screen>('opening')
  const [fading, setFading] = useState(false)

  const transition = (next: Screen) => {
    setFading(true)
    setTimeout(() => {
      setScreen(next)
      window.scrollTo(0, 0)
      setFading(false)
    }, 600)
  }

  const toHub = () => transition('hub')

  return (
    <main className="relative min-h-[100svh] w-full" style={{ background: '#050816' }}>
      {/* fade overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-500"
        style={{ background: '#050816', opacity: fading ? 1 : 0 }}
      />

      {screen === 'opening' && <Opening onEnter={toHub} />}
      {screen === 'hub' && <SolarHub onNavigate={(id) => transition(id)} />}

      {screen === 'aura' && (
        <PhotoGallery
          photos={AURA_PHOTOS}
          title="AURA"
          accent="#9b7bff"
          glow="155,123,255"
          onBack={toHub}
        />
      )}
      {screen === 'cosmos' && (
        <PhotoGallery
          photos={COSMOS_PHOTOS}
          title="COSMOS"
          accent="#ff7ab6"
          glow="255,122,182"
          heartbeat
          onBack={toHub}
        />
      )}
      {screen === 'chronicles' && <Chronicles onBack={toHub} />}
      {screen === 'echoes' && <Echoes onBack={toHub} />}
      {screen === 'oracle' && <Oracle onBack={toHub} />}
      {screen === 'eternity' && <Eternity onBack={toHub} />}
      {screen === 'serendipity' && <Serendipity onBack={toHub} />}
      {screen === 'void' && <Void onLeave={toHub} />}
    </main>
  )
}
