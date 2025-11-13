// Fix: Import React to resolve 'Cannot find namespace "React"' error.
import React from 'react';

export interface Animal {
  id: string;
  name: string;
  meaning: string;
  emoji: string;
}

export interface Message {
  id: number;
  sender: 'bot' | 'user';
  content: React.ReactNode;
}

export type GameState = 'INITIAL' | 'AWAITING_ORDER' | 'SHOWING_RESULTS' | 'FINISHED';
