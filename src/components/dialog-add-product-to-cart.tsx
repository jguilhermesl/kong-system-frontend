import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Heading } from './ui/heading';

export const DialogAddProductToCart = () => {
  return (
    <DialogContent className="max-w-[95%] md:max-w-[70%] lg:max-w-[50%] w-full p-4">
      <DialogHeader>
        <DialogTitle>
          <Heading className="text-base mt-6 lg:mt-0">Adicionar</Heading>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col lg:flex-row ">
        <div className="p-4 lg:p-0 lg:w-1/2"></div>
      </div>
    </DialogContent>
  );
};
