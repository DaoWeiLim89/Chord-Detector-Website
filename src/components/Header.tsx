// src/components/Header.tsx

export default function Header() {
  return (
    <div className="text-center mb-10 pt-10">
      <div className="flex items-center justify-center gap-4 mb-4">
        <svg 
          className="w-10 h-10 md:w-12 md:h-12 text-purple-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
          />
        </svg>
        <p className="text-3xl md:text-4xl font-extrabold text-gray-800">Chord Analyzer</p>
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload an MP3 file to extract chords and lyrics
        </p>
      </div>
    </div>
  );
}
