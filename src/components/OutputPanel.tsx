import React, { useState } from 'react';
import { SongOutput } from '../types';

interface OutputPanelProps {
  output: SongOutput | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
    <p className="text-lg text-gray-400">Brewing creativity...</p>
  </div>
);

const WelcomeMessage: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" />
        </svg>
        <h3 className="text-2xl font-bold mb-2">Your Masterpiece Awaits</h3>
        <p>Fill in the details on the left and hit "Generate" to craft your song.</p>
    </div>
);

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 text-xs font-medium rounded-md transition ${
        isCopied
          ? 'bg-green-600 text-white'
          : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
      }`}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const FormattedLyrics: React.FC<{ lyrics: string }> = ({ lyrics }) => {
    return (
        <div className="font-mono text-gray-300 leading-relaxed">
            {lyrics.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
                    return <strong key={index} className="block mt-4 mb-2 text-purple-300">{trimmedLine}</strong>;
                }
                if (trimmedLine === '') {
                    return <br key={index} />;
                }
                return <span key={index} className="block">{trimmedLine}</span>;
            })}
        </div>
    );
};

export const OutputPanel: React.FC<OutputPanelProps> = ({ output, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <div className="text-red-400 text-center p-4 bg-red-900/50 rounded-lg">{error}</div>;
    }
    if (output) {
      return (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{output.title}</h1>
            <div className="relative bg-gray-800/50 p-6 rounded-lg max-h-80 overflow-y-auto border border-gray-700">
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={output.lyrics} />
              </div>
              <FormattedLyrics lyrics={output.lyrics} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-purple-300">🎵 Sound Prompt</h3>
                    <CopyButton textToCopy={output.soundPrompt} />
                </div>
                <p className="bg-gray-800/50 p-4 rounded-md text-gray-400 text-sm border border-gray-700 font-mono h-full">{output.soundPrompt}</p>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-purple-300">🖼️ Image Prompt</h3>
                    <CopyButton textToCopy={output.imagePrompt} />
                </div>
                <p className="bg-gray-800/50 p-4 rounded-md text-gray-400 text-sm border border-gray-700 font-mono h-full">{output.imagePrompt}</p>
              </div>
          </div>
        </div>
      );
    }
    return <WelcomeMessage />;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
      {renderContent()}
    </div>
  );
};