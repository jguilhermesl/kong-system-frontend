import { Paragraph } from './paragraph';

interface KongCoinProps {
  showLabel?: boolean;
}

export const KongCoin = ({ showLabel = false }: KongCoinProps) => {
  return (
    <div className="flex items-center gap-1">
      <div className="bg-black size-4 rounded-full flex justify-center items-center">
        <Paragraph className="font-bold text-[10px] text-primary">
          {' '}
          K{' '}
        </Paragraph>
      </div>
      <Paragraph>{showLabel && 'kongpoints'}</Paragraph>
    </div>
  );
};
