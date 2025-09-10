
// FIX: Implement the main App component to resolve the module error.
import React, { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Genre, Emotion, SongStructure, SoundEngine, ImageStyle, Language, SongGenerationParams, SongOutput } from './types';
import { generateSong, generateRandomTopic } from './services/geminiService';

const App: React.FC = () => {
  // State for all user inputs
  const [topic, setTopic] = useState('');
  const [genre, setGenre] = useState<Genre>(Genre.Pop);
  const [emotion, setEmotion] = useState<Emotion>(Emotion.Happy);
  const [structure, setStructure] = useState<SongStructure>(SongStructure.VerseChorus);
  const [soundEngine, setSoundEngine] = useState<SoundEngine>(SoundEngine.SunoAI);
  const [imageStyle, setImageStyle] = useState<ImageStyle>(ImageStyle.Photorealistic);
  const [language, setLanguage] = useState<Language>(Language.English);

  // State for API outputs, loading, and errors
  const [output, setOutput] = useState<SongOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomTopicLoading, setIsRandomTopicLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setOutput(null);

    const params: SongGenerationParams = {
      topic, genre, emotion, structure, soundEngine, imageStyle, language
    };

    try {
      const result = await generateSong(params);
      setOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomTopic = async () => {
    setIsRandomTopicLoading(true);
    setError(null);
    try {
      const randomTopic = await generateRandomTopic();
      setTopic(randomTopic);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate random topic.');
    } finally {
      setIsRandomTopicLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            AI Songwriter Studio
          </h1>
          {/* FIX: Removed settings button and modal logic to comply with API key guidelines. */}
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <InputPanel
            topic={topic} setTopic={setTopic}
            genre={genre} setGenre={setGenre}
            emotion={emotion} setEmotion={setEmotion}
            structure={structure} setStructure={setStructure}
            soundEngine={soundEngine} setSoundEngine={setSoundEngine}
            imageStyle={imageStyle} setImageStyle={setImageStyle}
            language={language} setLanguage={setLanguage}
            onGenerate={handleGenerate}
            onRandomTopic={handleRandomTopic}
            isLoading={isLoading}
            isRandomTopicLoading={isRandomTopicLoading}
          />
          <div className="lg:sticky lg:top-24">
            <OutputPanel output={output} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
