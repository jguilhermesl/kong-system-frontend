/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useCallback, useState } from 'react';
import { GeneratedDataRegistration } from './generated-data-registration';
import { Button } from '@/components/ui/button';
import { EditableField } from './editable-fields';
import { useFormik } from 'formik';
import { addInventory } from '@/api/inventory/add-inventory';
import { queryClient } from '@/services/react-query';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { convertRealToNumber } from '@/utils/convert-real-to-number';
import { addInventorySchema } from '@/schemas/add-new-inventory-schema';
import { fetchGames } from '@/api/games/fetch-games';
import { useQuery } from '@tanstack/react-query';
import { flexibleSearch } from '@/utils/flexible-search';
import { Game } from '@/models/Game';
import { FormAutoCompleteField } from '@/components/form-auto-complete-field';

export const HomeField = ({}) => {
  const [email, setEmail] = useState('');
  const [psnPassword, setPsnPassword] = useState('');
  const [psnUser, setPsnUser] = useState('');
  const [gamesSuggestions, setGamesSuggestions] = useState<Game[]>([]);
  const [gamesAutoCompleteValue, setGamesAutoCompleteValue] = useState('');
  const router = useRouter();

  const handleAddInventory = async () => {
    try {
      await addInventory({
        game: values.name,
        email: email,
        emailPassword: '',
        psnPassword: psnPassword,
        psnUser: psnUser,
        gameVersion: values.gameVersion as 'PS4' | 'PS5' | 'PS4 E PS5',
        gameValue: convertRealToNumber(values.gameValue) || 0,
        purchaseValue: convertRealToNumber(values.purchaseValue) || 0,
        primaryValue: convertRealToNumber(values.valuePrimary) || 0,
        secondaryValue: convertRealToNumber(values.valueSecondary) || 0,
      });
      await queryClient.invalidateQueries({
        queryKey: ['inventory'],
      });
      toast('success', 'Estoque adicionado com sucesso!');
      router.push('/admin/inventory');
    } catch (error: any) {
      console.error('Error adding inventory:', error);
      toast('error', error.mesage || 'Algo deu errado.');
    }
  };

  const {
    setFieldValue,
    getFieldProps,
    values,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      name: '',
      gameValue: '',
      purchaseValue: '',
      valuePrimary: '',
      valueSecondary: '',
      gameVersion: '',
    },
    validateOnChange: true,
    validationSchema: addInventorySchema,
    isInitialValid: false,
    onSubmit: handleAddInventory,
  });

  const { data: gamesData } = useQuery({
    queryFn: () => fetchGames({}),
    queryKey: ['games'],
  });

  const handleGetGamesItems = useCallback(
    async (searchValue: string) => {
      const games = gamesData?.data || [];
      const lowercaseQuery = searchValue.toLowerCase();

      const gamesFiltered =
        games?.filter((i) => {
          const lowercaseName = i.game.toLowerCase();

          return flexibleSearch(lowercaseQuery, lowercaseName);
        }) || [];

      setGamesSuggestions(gamesFiltered as Game[]);
    },
    [gamesData?.data]
  );

  const handleChangeGame = (gameId: string) => {
    const gameSelected = gamesData?.data.find((g) => g.id === gameId);

    setFieldValue('game', gameSelected?.game);
    setFieldValue('gameValue', gameSelected?.originalPrice);
    setFieldValue('purchaseValue', gameSelected?.currentPrice);
    setFieldValue('valuePrimary', gameSelected?.primaryValue);
    setFieldValue('valueSecondary', gameSelected?.secondaryValue);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {isSubmitting ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
          <FormAutoCompleteField
            value={gamesAutoCompleteValue}
            setValue={setGamesAutoCompleteValue}
            getItems={handleGetGamesItems}
            setItem={(item) => handleChangeGame(item)}
            suggestions={gamesSuggestions}
            label="Nome do Jogo"
            renderKeys={['game']}
          />

          {values.name && (
            <>
              <GeneratedDataRegistration
                game={values.name}
                email={email}
                psnPassword={psnPassword}
                psnUser={psnUser}
                setEmail={setEmail}
                setPsnPassword={setPsnPassword}
                setPsnUser={setPsnUser}
              />
              <EditableField
                getFieldProps={getFieldProps}
                setFieldValue={setFieldValue}
                values={values}
              />
            </>
          )}
          <Button disabled={!isValid}>Adicionar</Button>
        </form>
      )}
    </div>
  );
};
