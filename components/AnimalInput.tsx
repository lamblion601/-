
import React, { useState, useRef } from 'react';
import type { Animal } from '../types';
import { ANIMALS } from '../constants';

interface AnimalInputProps {
  onSubmit: (order: string[]) => void;
}

const GrabIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400 cursor-grab">
        <path d="M120,88a16,16,0,1,1-16-16A16,16,0,0,1,120,88Zm0,48a16,16,0,1,0,16,16A16,16,0,0,0,104,136Zm48-16a16,16,0,1,0,16,16A16,16,0,0,0,152,120Zm0-48a16,16,0,1,0-16-16A16,16,0,0,0,152,72Z"></path>
    </svg>
);


export const AnimalInput: React.FC<AnimalInputProps> = ({ onSubmit }) => {
  const [animals, setAnimals] = useState<Animal[]>(ANIMALS);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    e.currentTarget.classList.add('shadow-xl', 'opacity-70');
  };

  const handleDragEnter = (position: number) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('shadow-xl', 'opacity-70');
    if (dragItem.current === null || dragOverItem.current === null) return;

    const newAnimals = [...animals];
    const dragItemContent = newAnimals.splice(dragItem.current, 1)[0];
    newAnimals.splice(dragOverItem.current, 0, dragItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;
    setAnimals(newAnimals);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('shadow-xl', 'opacity-70');
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleSubmit = () => {
    onSubmit(animals.map(a => a.id));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto animate-fade-in-up">
      <h3 className="font-bold text-center text-gray-700 mb-4">순서를 정해주세요 (드래그 & 드롭)</h3>
      <div className="space-y-2">
        {animals.map((animal, index) => (
          <div
            key={animal.id}
            className="flex items-center p-3 bg-gray-50 border rounded-lg cursor-pointer transition-shadow"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <span className="text-xl mr-2">{index + 1}.</span>
            <span className="text-2xl mr-4">{animal.emoji}</span>
            <span className="font-semibold text-gray-800">{animal.name}</span>
            <div className="ml-auto">
                <GrabIcon />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        순서 정하기 완료
      </button>
    </div>
  );
};
