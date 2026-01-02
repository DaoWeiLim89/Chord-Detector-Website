// src/components/UploadForm.tsx

import { useState, type ChangeEvent } from 'react';

interface UploadFormProps {
    onAnalyze: (artist: string, songName: string, file: File) => Promise<void>;
    loading: boolean;
    error: string;
    hasResult: boolean;
    onReset: () => void;
}

export default function UploadForm({ onAnalyze, loading, error, hasResult, onReset }: UploadFormProps) {
  const [artist, setArtist] = useState('');
  const [songName, setSongName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'audio/mpeg') {
      setFile(selectedFile);
      setFileError('');
    } else {
      setFileError('Please select a valid MP3 file');
      setFile(null);
    }
  };

  const handleSubmit = () => {
    if (!file || !artist || !songName) {
      setFileError('Please fill in all fields and select an MP3 file');
      return;
    }
    onAnalyze(artist, songName, file);
  };

  const handleResetClick = () => {
    setArtist('');
    setSongName('');
    setFile(null);
    setFileError('');
    onReset();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="space-y-5">
        {/* Artist Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Artist Name
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="Enter artist name"
            disabled={loading}
          />
        </div>

        {/* Song Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Song Name
          </label>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="Enter song name"
            disabled={loading}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MP3 File
          </label>
          <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <svg 
              className="w-5 h-5 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <span className="text-sm text-gray-600">
              {file ? file.name : 'Choose MP3 file'}
            </span>
            <input
              type="file"
              accept="audio/mpeg"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>
        </div>

        {/* Error Messages */}
        {(error || fileError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || fileError}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">
              Analyzing your song... This may take a moment.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || !file || !artist || !songName}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze Song'}
          </button>
          
          {hasResult && (
            <button
              onClick={handleResetClick}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
