
import React, { useState, useEffect, useRef } from 'react';
import type { Message, GameState } from './types';
import { ChatMessage } from './components/ChatMessage';
import { AnimalInput } from './components/AnimalInput';
import { ANIMAL_MAP, ANIMALS } from './constants';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [gameState, setGameState] = useState<GameState>('INITIAL');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (sender: 'bot' | 'user', content: React.ReactNode) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), sender, content }]);
  };

  useEffect(() => {
    if (gameState === 'INITIAL') {
      const startConversation = async () => {
        setGameState('AWAITING_ORDER'); // to prevent re-triggering
        setIsTyping(true);
        await delay(1000);
        addMessage('bot', '안녕하세요! 당신의 내면을 탐색해 볼 수 있는 재미있는 심리 테스트를 시작해 볼까요? ✨');
        await delay(2500);
        addMessage('bot', '지금부터 제가 들려드릴 이야기에 집중해 주세요. 당신은 황량한 사막 앞에 있습니다. 피할 수도, 돌아갈 수도 없습니다. 꼭 건너야 하는 사막인데, 당신이 키우던 동물들과 같이 가야 합니다.');
        await delay(4000);
        addMessage('bot', '가다 보면 길도 안 보이고, 물도 양식도 없고, 해와 달만 보며 방향만 짐작하며 가야 합니다. 춥고 덥고 배고프고 힘들고 막막합니다.');
        await delay(3500);
        addMessage('bot', '그러다 보니 당신은 동물들을 하나씩 버려야 하는 상황에 놓이게 됩니다. 어떤 순서대로 버릴지 정해주세요.');
        await delay(3000);
        addMessage('bot', '한 가지 확실한 것은 반드시 끝이 있다는 것과, 동물은 한 번에 하나씩 꼭 버려야 한다는 겁니다.');
        await delay(3000);
        const animalList = (
            <div>
                <p className="mb-2">당신과 함께 있는 동물들은 다음과 같습니다.</p>
                <ul className="list-disc list-inside">
                    {ANIMALS.map(a => <li key={a.id}>{a.emoji} {a.name}</li>)}
                </ul>
                <p className="mt-2">어떤 순서대로 버리시겠어요? 아래 카드를 드래그하여 순서를 정하고 버튼을 눌러주세요.</p>
            </div>
        );
        addMessage('bot', animalList);
        setIsTyping(false);
      };
      startConversation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderSubmit = async (order: string[]) => {
    setGameState('SHOWING_RESULTS');

    const userOrderMessage = (
      <div>
        <p>제가 정한 순서는 다음과 같습니다:</p>
        <ol className="list-decimal list-inside mt-2 font-semibold">
          {order.map((animalId, index) => (
            <li key={index}>{ANIMAL_MAP[animalId].emoji} {ANIMAL_MAP[animalId].name}</li>
          ))}
        </ol>
      </div>
    );
    addMessage('user', userOrderMessage);

    await delay(1500);
    setIsTyping(true);
    await delay(1500);
    addMessage('bot', '순서를 정하셨군요! 흥미로운 결과를 기대하셔도 좋습니다. 이제 이 심리 테스트의 풀이를 알려드릴게요.');
    await delay(3000);
    addMessage('bot', '이 테스트에서 황량한 사막은 당신이 인생의 어려운 날들을 보낼 때를 의미합니다.');
    await delay(2500);
    addMessage('bot', '그리고 동물들의 의미는 내 안의 가치관 우선순위를 나타냅니다.');
    await delay(2000);

    const meaningMessage = (
        <div>
             <ul className="space-y-2">
                <li><span className="font-bold">{ANIMAL_MAP['sheep'].emoji} 양</span>은 당신이 가장 사랑하는 사람이나 자녀를 의미합니다.</li>
                <li><span className="font-bold">{ANIMAL_MAP['horse'].emoji} 말</span>은 부모님처럼 당신을 지지해주고, 당신이 기댈 수 있는 존재를 의미합니다.</li>
                <li><span className="font-bold">{ANIMAL_MAP['cow'].emoji} 소</span>는 재물을 상징합니다.</li>
                <li><span className="font-bold">{ANIMAL_MAP['monkey'].emoji} 원숭이</span>는 당신의 친구, 마음이 통하는 벗을 의미합니다.</li>
                <li><span className="font-bold">{ANIMAL_MAP['lion'].emoji} 사자</span>는 당신의 자존심을 나타냅니다.</li>
            </ul>
        </div>
    );
    addMessage('bot', meaningMessage);
    await delay(5000);
    addMessage('bot', '당신이 버린 순서는 어려운 상황에서 당신이 무엇을 가장 먼저 포기하고, 무엇을 끝까지 지키려 하는지를 보여주는 것이죠.');
    await delay(3500);
    
    const firstAnimal = ANIMAL_MAP[order[0]];
    const lastAnimal = ANIMAL_MAP[order[order.length - 1]];
    const middleAnimals = order.slice(1, -1).map(id => `${ANIMAL_MAP[id].name} (${ANIMAL_MAP[id].meaning})`).join(', ');

    const personalizedResult = `당신은 어려운 상황에서 **${firstAnimal.name} (${firstAnimal.meaning})**를(을) 가장 먼저 포기하고, **${lastAnimal.name} (${lastAnimal.meaning})**을(를) 마지막까지 지키려 하는 경향이 있군요. 이어서 ${middleAnimals} 순으로 포기할 수 있다고 답하셨습니다.`;
    addMessage('bot', personalizedResult.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>'));
    await delay(5000);

    addMessage('bot', '자, 이제 당신의 답변과 풀이를 비교해보니 어떤가요?');
    await delay(2000);
    const reflectionQuestions = (
        <ul className="list-disc list-inside space-y-1">
            <li>무엇이 마지막까지 남으셨나요?</li>
            <li>무엇을 가장 먼저 버리셨나요?</li>
            <li>나의 무의식은 무엇을 가장 가치 있게 여기나요?</li>
        </ul>
    );
    addMessage('bot', reflectionQuestions);
    await delay(4000);
    addMessage('bot', '이 테스트를 당신이 소중하게 생각하는 분께 물어보면, 그분을 좀 더 잘 이해하는 데 도움이 될 수도 있을 거예요. 😊');
    await delay(3500);
    addMessage('bot', '혹시 생각지 않은 자신의 모습이 나왔더라도, 이건 그저 가벼운 심리 테스트이니 너무 마음 쓰지 마세요.');
    await delay(3000);
    addMessage('bot', '오늘도 바쁜 일상에 쫓겨서 나를 돌아보지 못하는 일이 없도록, 토닥토닥 나 자신을 응원해 주세요! 💖');
    setIsTyping(false);
    setGameState('FINISHED');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-100 to-purple-100 font-sans">
      <header className="p-4 bg-white/70 backdrop-blur-sm shadow-sm text-center">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">🏜️ '황량한 사막' 심리 테스트</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <ChatMessage message={{ id: 0, sender: 'bot', content: 'TYPING' }} />}
          
          {gameState === 'AWAITING_ORDER' && !isTyping && (
             <AnimalInput onSubmit={handleOrderSubmit} />
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
    </div>
  );
};

export default App;
