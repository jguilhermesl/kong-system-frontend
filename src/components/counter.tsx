import React from 'react';
import { Paragraph } from './ui/paragraph';
import { Minus, Plus } from 'lucide-react';

interface ICounterProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const Counter = ({ count, increment, decrement }: ICounterProps) => {
  return (
    <div className="flex items-center  gap-2">
      <button
        onClick={decrement}
        className="h-8 w-8 bg-black rounded-lg items-center flex justify-center hover:bg-opacity-90 active:bg-opacity-80"
      >
        <Minus color="#FFF" size={16} />
      </button>
      <Paragraph className="font-bold text-xl flex justify-center w-[30px]">
        {count}
      </Paragraph>
      <button
        onClick={increment}
        className="h-8 w-8 bg-black rounded-lg items-center flex justify-center hover:bg-opacity-90 active:bg-opacity-80"
      >
        <Plus color="#FFF" size={16} />
      </button>
    </div>
  );
};

export default Counter;
