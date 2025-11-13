import React from 'react';
import type { Message } from '../types';

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="text-white">
        <path d="M208,32H48A16,16,0,0,0,32,48V176a16,16,0,0,0,16,16h8v24a8,8,0,0,0,13.66,5.66L121.37,192H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM104,128a12,12,0,1,1,12-12A12,12,0,0,1,104,128Zm48,0a12,12,0,1,1,12-12A12,12,0,0,1,152,128Z"></path>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256" className="text-slate-700">
        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,0,0,13.84,8c18.84-32.56,52.14-52,89.08-52s70.24,19.44,89.08,52a8,8,0,0,0,13.84-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
    </svg>
);


export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isBot = message.sender === 'bot';

  if (message.content === 'TYPING') {
      return (
          <div className="flex items-end gap-2 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  <BotIcon />
              </div>
              <div className="animate-pulse flex space-x-2 p-3 bg-gray-200 rounded-lg rounded-bl-none">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
          </div>
      );
  }

  return (
    <div className={`flex items-end gap-2 mb-4 ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <BotIcon />
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-lg max-w-sm md:max-w-md break-words ${
          isBot
            ? 'bg-indigo-500 text-white rounded-bl-none'
            : 'bg-white text-gray-800 rounded-br-none'
        }`}
      >
        {/* Fix: Render string content as HTML to correctly display bold text. */}
        {typeof message.content === 'string' ? <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content }}></p> : message.content}
      </div>
      {!isBot && (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 flex-shrink-0">
              <UserIcon />
          </div>
      )}
    </div>
  );
};
