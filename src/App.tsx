import { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import ResultsDisplay from './components/ChordLyricsDisplay';
import { analyzeMusic, type AnalysisResult } from './api/chordAPI';
import GuitarImage from './assets/Guitar.png';

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async (artist: string, songName: string, file: File): Promise<void> => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const data = await analyzeMusic(artist, songName, file);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => {
    setResult(null);
    setLoading(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 p-4 flex justify-center">
        <div className="w-full max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-full max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto bg-purple-300">
                <Header />
            </div>

            <div className="w-full max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex justify-center bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${GuitarImage})`}}
            >
                <div className="flex items-center justify-center p-4">
                    <div className="w-full max-w-xl md:max-w-3xl lg:max-w-5xl">
                        <UploadForm 
                        onAnalyze={handleAnalyze}
                        loading={loading}
                        error={error}
                        hasResult={!!result}
                        onReset={handleReset}
                        />

                        {result && <ResultsDisplay result={result} />}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}