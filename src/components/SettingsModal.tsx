
// FIX: Remove API key input and related state to comply with security guidelines.
import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX: Removed onSave prop as it is no longer needed.
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full transition hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* FIX: Replaced API key input with informational text. */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">
                This application is configured to use the Gemini API.
            </p>
            <p className="mt-2 text-sm text-gray-500">
                The API key is securely managed through environment variables. There are no user-configurable settings here.
            </p>
          </div>
        </div>
         <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;