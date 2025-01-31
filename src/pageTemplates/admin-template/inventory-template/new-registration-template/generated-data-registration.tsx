'use client';
import { FormInputField } from '@/components/form-input-field';
import { Copy } from 'lucide-react';
import { copyToClipboard } from './copyToClipboard';
import { useEffect } from 'react';
import {
  generateEmail,
  generatePsnCredentials,
} from '@/utils/generateCredentials';

export interface GeneratedDataRegistrationProps {
  email: string;
  psnPassword: string;
  psnUser: string;
  game: string;
  setEmail: (value: string) => void;
  setPsnPassword: (value: string) => void;
  setPsnUser: (value: string) => void;
}

export const GeneratedDataRegistration = ({
  game,
  email,
  setEmail,
  setPsnPassword,
  setPsnUser,
  psnPassword,
  psnUser,
}: GeneratedDataRegistrationProps) => {
  useEffect(() => {
    const generatedEmail = generateEmail(game);
    const { psnPassword: generatedPsnPassword, psnUser: generatedPsnUser } =
      generatePsnCredentials(game);
    setEmail(generatedEmail);
    setPsnPassword(generatedPsnPassword);
    setPsnUser(generatedPsnUser);
  }, [game, setEmail, setPsnPassword, setPsnUser]);

  return (
    <div>
      <FormInputField
        label="E-mail"
        placeholder="E-mail (Somente leitura)"
        className="w-full "
        inputClassName="disabled:opacity-100"
        disabled
        value={email}
        iconRight={
          <button
            className="flex items-center justify-center"
            onClick={() => copyToClipboard(email)}
          >
            <Copy size={18} />
          </button>
        }
      />
      <FormInputField
        label="Senha da PSN"
        placeholder="Senha PSN (Somente leitura)"
        className="w-full"
        inputClassName="disabled:opacity-100"
        disabled
        value={psnPassword}
        iconRight={
          <button
            className="flex items-center justify-center"
            onClick={() => copyToClipboard(psnPassword)}
          >
            <Copy size={18} />
          </button>
        }
      />
      <FormInputField
        label="Nome Usuário PSN"
        placeholder="Usuário PSN (Somente leitura)"
        className="w-full"
        inputClassName="disabled:opacity-100"
        disabled
        value={psnUser}
        iconRight={
          <button
            className="flex items-center justify-center"
            onClick={() => copyToClipboard(psnUser)}
          >
            <Copy size={18} />
          </button>
        }
      />
    </div>
  );
};
