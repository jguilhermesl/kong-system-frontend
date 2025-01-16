/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from 'react';
import { memo } from 'react';
import clsx from 'clsx';
import { Spinner } from './spinner';
import { Line } from './line';
import { Input } from './input';
import { Search } from 'lucide-react';

interface IAutoCompleteItemProps {
  suggestions: any[];
  handleClickItem?: (itemId: string) => void;
  isLoading?: boolean;
  isOpenSuggestions: boolean;
  renderKeys?: string[];
}

interface IAutoCompleteInputProps {
  setItem: Dispatch<SetStateAction<string>>;
  suggestions: any[];
  getItems: (value: string) => Promise<void>;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  renderKeys?: string[];
}

const AutoCompleteItem = memo(
  ({
    suggestions,
    handleClickItem = () => {},
    isLoading,
    isOpenSuggestions,
    renderKeys,
  }: IAutoCompleteItemProps) => {
    return (
      <div
        className={clsx(
          'bg-white max-h-[200px] w-full overflow-auto rounded transition-all',
          {
            'h-0': !isOpenSuggestions,
            'border border-neutral-grey': isOpenSuggestions,
          }
        )}
      >
        <ul className="flex flex-1 flex-col gap-2 p-4">
          {isLoading ? (
            <Spinner />
          ) : (
            suggestions?.map((item, idx) => {
              return (
                <li
                  key={item.id || idx}
                  onClick={() => handleClickItem(item.id)}
                  className="text-neutral-grey font-poppins text-sm truncate hover:underline hover:text-neutral-darkest cursor-pointer"
                >
                  {renderKeys?.map((i) => item[i]).join(' | ')}
                  <Line className="mt-2" />
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
);

export const AutoCompleteInput = ({
  setItem,
  suggestions,
  getItems,
  value,
  setValue,
  renderKeys,
}: IAutoCompleteInputProps) => {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  const handleClickProduct = (itemId: string) => {
    const itemFiltered = suggestions.find((p) => p.id == itemId);
    const formattedString =
      renderKeys?.map((i) => itemFiltered[i]).join(' | ') || '';

    setAutoCompleteValue(formattedString);
    setValue && setValue(formattedString);
    setItem(itemFiltered.id);
    setOpenSuggestions(false);
  };

  const handleChange = (e: any) => {
    getItems(e.target.value);
    setAutoCompleteValue(e.target.value);
    setValue && setValue(e.target.value);
    setOpenSuggestions(true);
  };

  return (
    <div>
      <Input
        name="autocomplete"
        className="py-3 w-full border-neutral-light-grey"
        placeholder="Digite o nome do produto ou sigla"
        iconRight={<Search size={20} />}
        onChange={handleChange}
        value={value ?? autoCompleteValue}
      />

      <AutoCompleteItem
        suggestions={suggestions}
        handleClickItem={handleClickProduct}
        // isLoading={isPlacePredictionsLoading}
        isOpenSuggestions={openSuggestions}
        renderKeys={renderKeys}
      />
    </div>
  );
};
