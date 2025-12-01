// src/components/ResultsDisplay.jsx

export default function ResultsDisplay({ result }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Song Info Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{result.song}</h2>
        <p className="text-gray-600">by {result.artist}</p>
      </div>

      {/* Chords Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Chords</h3>
        <div className="bg-purple-50 rounded-lg p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
            {Array.isArray(result.chords) 
              ? result.chords.join(' - ') 
              : result.chords}
          </pre>
        </div>
      </div>

      {/* Lyrics Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Lyrics</h3>
        <div className="bg-blue-50 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
            {result.lyrics}
          </pre>
        </div>
      </div>
    </div>
  );
}
