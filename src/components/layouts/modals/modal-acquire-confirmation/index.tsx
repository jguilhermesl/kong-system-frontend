'use client';

import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Dispatch, SetStateAction } from 'react';
import { Paragraph } from '@/components/ui/paragraph';
import { Store } from '@/models/Store';
import { toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { requestGame } from '@/api/store/request-game';

interface IModalPurchaseConfirmationProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  game: Store;
}

export const ModalAcquireConfirmationDialog = ({
  setModalIsOpen,
  modalIsOpen,
  game,
}: IModalPurchaseConfirmationProps) => {
  const { mutateAsync: requestGameFn } = useMutation({
    mutationFn: requestGame,
  });

  const handleRequestGame = async (storeItemId: string) => {
    try {
      await requestGameFn({ storeItemId });
      setModalIsOpen(false);
      toast('success', 'Jogo solicitado com sucesso!');
    } catch (error: any) {
      console.error('Error requesting game:', error);
      toast('error', error?.message || 'Erro ao solicitar jogo.');
    }
  };

  return (
    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogContent className="flex flex-col w-96 max-h-[90vh] justify-start items-center p-5 rounded-lg bg-white overflow-auto">
        <div className="flex w-full justify-start">
          <Heading>Confirmando resgate do jogo</Heading>
        </div>
        {game && (
          <div>
            <Paragraph>
              Você está prestes a adiquirir o{' '}
              <span className="font-semibold"> {game.game} </span> por{' '}
              <span className="font-semibold"> {game.price} </span> pontos.
            </Paragraph>
          </div>
        )}

        <DialogFooter className="sm:justify-start gap-2 w-full">
          <Button
            className="w-full"
            type="button"
            variant="secondary"
            onClick={() => setModalIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="w-full"
            type="button"
            variant="default"
            onClick={() => handleRequestGame(game.id)}
          >
            Prosseguir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
