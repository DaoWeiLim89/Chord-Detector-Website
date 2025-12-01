// src/components/Header.jsx

export default function Header() {
  return (
    <div className="text-center mb-8 pt-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <svg 
          className="w-5 h-5 text-purple-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
          />
        </svg>
        <h1 className="text-4xl font-bold text-gray-800">Chord Analyzer</h1>
      </div>
      <p className="text-gray-600">
        Upload an MP3 file to extract chords and lyrics
      </p>
    </div>
  );
}
