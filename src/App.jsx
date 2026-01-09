import { useState } from 'react'

function App() {
  const [minted, setMinted] = useState(0)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background layers */}
      <div className="fixed inset-0 bg-[#050508]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8338ec] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00fff9] rounded-full mix-blend-screen filter blur-[140px] opacity-20" style={{animation: 'rotate-gradient 20s linear infinite'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#ff006e] rounded-full mix-blend-screen filter blur-[100px] opacity-25" style={{animation: 'float 15s ease-in-out infinite'}}></div>
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00fff9 1px, transparent 1px), linear-gradient(90deg, #00fff9 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-7xl md:text-8xl font-black mb-4" style={{
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(135deg, #00fff9 0%, #ff006e 50%, #8338ec 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}>
            VAULT
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm tracking-[0.3em] uppercase">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00fff9]"></div>
            <span className="text-[#00fff9] font-light">Digital Collectibles</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#00fff9]"></div>
          </div>
        </div>

        {/* Main card */}
        <div className="relative group" style={{animation: 'float 6s ease-in-out infinite'}}>
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00fff9] via-[#ff006e] to-[#8338ec] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-[#0a0a0f]/90 to-[#1a1a2e]/90 backdrop-blur-xl border border-[#00fff9]/20 rounded-2xl p-8 md:p-12 w-full max-w-lg">
            {/* Counter display */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <div className="text-xs tracking-widest uppercase text-[#00fff9]/60 mb-2" style={{fontFamily: 'Orbitron, sans-serif'}}>
                  Assets Minted
                </div>
                <div className="text-6xl md:text-7xl font-black tabular-nums" style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#00fff9',
                  textShadow: '0 0 20px rgba(0, 255, 249, 0.5)'
                }}>
                  {String(minted).padStart(3, '0')}
                </div>
              </div>
            </div>

            {/* Mint button */}
            <button
              onClick={() => setMinted(prev => prev + 1)}
              className="w-full relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#ff006e] opacity-100 group-hover/btn:opacity-80 transition-opacity"></div>
              <div className="relative py-5 px-8 text-lg font-bold tracking-wider uppercase" style={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#0a0a0f'
              }}>
                <span className="inline-block group-hover/btn:scale-105 transition-transform">Mint NFT</span>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
            </button>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-[#00fff9]/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#00fff9]" style={{fontFamily: 'Orbitron, sans-serif'}}>∞</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Supply</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#ff006e]" style={{fontFamily: 'Orbitron, sans-serif'}}>0Ξ</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#8338ec]" style={{fontFamily: 'Orbitron, sans-serif'}}>24/7</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Live</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-600 leading-relaxed">
                Powered by <span className="text-[#00fff9]">React 18</span> × <span className="text-[#ff006e]">Vite 6</span> × <span className="text-[#8338ec]">Tailwind 3</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00fff9] animate-pulse"></div>
          <div className="text-xs tracking-[0.2em] uppercase text-gray-600">Web3 Ready</div>
          <div className="w-2 h-2 rounded-full bg-[#ff006e] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default App
