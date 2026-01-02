// src/api/chordAPI.ts

const BACKEND_URL = 'https://your-render-url.onrender.com/analyzeChords';

// Define the success response structure
export interface AnalysisResult {
  status: string;
  type: string;
  output: string;
  song_name: string;
  artist_name: string;
}

// Define the error response structure
interface ErrorResponse {
  status: string;
  message: string;
  detail?: string;  // FastAPI sometimes uses 'detail'
}

/**
 * Sends music file and metadata to backend for chord/lyric analysis
 * @param artist - Artist name
 * @param songName - Song title
 * @param file - MP3 file object
 * @returns Analysis results with chords and lyrics
 */
export const analyzeMusic = async (
  artist: string,
  songName: string,
  file: File
): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('artist', artist);
  formData.append('song_name', songName);
  formData.append('file', file);

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Check if response is an error (either from HTTP status or API response)
    if (!response.ok || data.status === 'error') {
      const errorMessage = data.message || data.detail || `Server error: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data as AnalysisResult;
  } catch (error) {
    // Re-throw with more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      throw error;
    }
    // Handle unexpected error types
    throw new Error('An unexpected error occurred');
  }
};