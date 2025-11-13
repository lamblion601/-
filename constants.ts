
import { Animal } from './types';

export const ANIMALS: Animal[] = [
  { id: 'sheep', name: '양', meaning: '가장 사랑하는 사람이나 자녀', emoji: '🐑' },
  { id: 'horse', name: '말', meaning: '부모님처럼 당신을 지지해주고, 당신이 기댈 수 있는 존재', emoji: '🐴' },
  { id: 'cow', name: '소', meaning: '재물', emoji: '🐮' },
  { id: 'monkey', name: '원숭이', meaning: '당신의 친구, 마음이 통하는 벗', emoji: '🐵' },
  { id: 'lion', name: '사자', meaning: '당신의 자존심', emoji: '🦁' },
];

export const ANIMAL_MAP: Record<string, Animal> = ANIMALS.reduce((acc, animal) => {
  acc[animal.id] = animal;
  return acc;
}, {} as Record<string, Animal>);
