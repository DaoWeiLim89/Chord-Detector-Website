// src/api/chordAPI.js

// Replace with your actual Render.com URL once deployed
const BACKEND_URL = 'https://your-render-url.onrender.com/analyzeChords';

/**
 * Sends music file and metadata to backend for chord/lyric analysis
 * @param {string} artist - Artist name
 * @param {string} songName - Song title
 * @param {File} file - MP3 file object
 * @returns {Promise<Object>} Analysis results with chords and lyrics
 */
export const analyzeMusic = async (artist, songName, file) => {
  const formData = new FormData();
  formData.append('artist', artist);
  formData.append('song_name', songName);
  formData.append('file', file);

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Server error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    // Re-throw with more helpful error messages
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server. Please check your connection.');
    }
    throw error;
  }
};
