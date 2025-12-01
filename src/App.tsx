import { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import ResultsDisplay from './components/ChordLyricsDisplay';
import { analyzeMusic } from './api/chordAPI';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (artist, songName, file) => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const data = await analyzeMusic(artist, songName, file);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLoading(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        
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
  );
}