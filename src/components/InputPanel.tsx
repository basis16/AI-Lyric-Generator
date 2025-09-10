import React from 'react';
import { Genre, Emotion, SongStructure, SoundEngine, ImageStyle, Language } from '../types';
import { GENRE_OPTIONS, EMOTION_OPTIONS, STRUCTURE_OPTIONS, SOUND_ENGINE_OPTIONS, IMAGE_STYLE_OPTIONS, LANGUAGE_OPTIONS } from '../constants';

interface InputPanelProps {
  topic: string;
  setTopic: (topic: string) => void;
  genre: Genre;
  setGenre: (genre: Genre) => void;
  emotion: Emotion;
  setEmotion: (emotion: Emotion) => void;
  structure: SongStructure;
  setStructure: (structure: SongStructure) => void;
  soundEngine: SoundEngine;
  setSoundEngine: (engine: SoundEngine) => void;
  imageStyle: ImageStyle;
  setImageStyle: (style: ImageStyle) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onGenerate: () => void;
  onRandomTopic: () => void;
  isLoading: boolean;
  isRandomTopicLoading: boolean;
}

const SelectInput = <T extends string,>({ label, value, onChange, options }: { label: string; value: T; onChange: (value: T) => void; options: T[] }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export const InputPanel: React.FC<InputPanelProps> = ({
  topic, setTopic, genre, setGenre, emotion, setEmotion,
  structure, setStructure, soundEngine, setSoundEngine, imageStyle,
  setImageStyle, language, setLanguage, onGenerate, onRandomTopic, isLoading, isRandomTopicLoading
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-purple-400">Create Your Song</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Topic</label>
        <div className="flex gap-2">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., A journey to Mars"
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition h-24 resize-none"
          />
          <button
            onClick={onRandomTopic}
            disabled={isRandomTopicLoading || isLoading}
            className="p-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Generate random topic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRandomTopicLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v3m0 10v3m8-7h-3m-10 0H4m11.95.95l-2.12 2.12m-8.48 0l2.12-2.12m0-8.48l-2.12-2.12m8.48 0l-2.12 2.12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput label="Genre" value={genre} onChange={setGenre} options={GENRE_OPTIONS} />
        <SelectInput label="Emotion" value={emotion} onChange={setEmotion} options={EMOTION_OPTIONS} />
        <SelectInput label="Song Structure" value={structure} onChange={setStructure} options={STRUCTURE_OPTIONS} />
        <SelectInput label="Language" value={language} onChange={setLanguage} options={LANGUAGE_OPTIONS} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput label="Sound AI" value={soundEngine} onChange={setSoundEngine} options={SOUND_ENGINE_OPTIONS} />
        <SelectInput label="Image Style" value={imageStyle} onChange={setImageStyle} options={IMAGE_STYLE_OPTIONS} />
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading || !topic.trim()}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? 'Generating...' : 'Generate Lyrics'}
      </button>
    </div>
  );
};