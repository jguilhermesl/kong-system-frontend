import { Paragraph } from '@/components/ui/paragraph';

interface InfoPurchaseProps {
  label: string;
  value: string;
}

export const InfoPurchase = ({ label, value }: InfoPurchaseProps) => {
  return (
    <div className="flex lg:gap-8 flex-col lg:flex-row">
      <Paragraph className="text-gray-400 min-w-32">{label}:</Paragraph>
      <Paragraph className="font-semibold truncate overflow-hidden ">
        {value}
      </Paragraph>
    </div>
  );
};
