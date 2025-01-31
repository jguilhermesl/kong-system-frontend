import { toast } from '@/utils/toast';

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast('success', 'Conteúdo copiado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao copiar o texto: ', error);
    });
};
