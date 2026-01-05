// src/components/ResultsDisplay.tsx
import type {AnalysisResult} from '../api/chordAPI';

export default function ResultsDisplay({ result }: { result: AnalysisResult }) {
  let chordOutput = "";
  // Determine displayType message based on result.type
  let displayType = "Error, unable to get Lyrics";
  if (result.type === "synced") {
      displayType = "Chords Synced with Lyrics";
  } else if (result.type === "unsynced") {
      displayType = "Chords Not Synced with Lyrics";
  } else if (result.type === "chords_only") {
      displayType = "Lyrics Not Found, Chords Only";
  }

  chordOutput = result.output;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Song Info Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{result.song_name}</h2>
        <p className="text-gray-600">by {result.artist_name}</p>
      </div>

      {/* Chords Display */}
      <div>
        <div>    
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{displayType}</h3>
          <div className="bg-purple-50 rounded-lg p-4">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
              {chordOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
