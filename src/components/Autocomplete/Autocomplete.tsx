import * as React from 'react';
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from '@material-ui/lab/Autocomplete';
import { TextField, TextFieldProps } from '../TextField/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export interface AutocompleteProps<OptionType> {
  id: string;
  inputValue?: string;
  loading: boolean;
  open: boolean;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
  inputWidth: number;
  noOptionsText?: string;
  options: OptionType[];
  onClose: () => void;
  getOptionLabel: (optionType: OptionType) => string;
  onOpen: (event: React.ChangeEvent<any>) => void;
  onChange?: (event: React.ChangeEvent<any>, value: NonNullable<OptionType>) => void;
  onInputChange?: (event: React.ChangeEvent<any>, value: string, reason: 'input' | 'reset' | 'clear') => void;
}

export default function Autocomplete<OptionType>(autocompleteProps: AutocompleteProps<OptionType>) {
  const {
    id,
    inputValue,
    open,
    loading,
    textFieldProps,
    inputWidth,
    onClose,
    onOpen,
    options,
    onInputChange,
    getOptionLabel,
    disabled,
    onChange,
    noOptionsText = 'No results'
  } = autocompleteProps;

  const muiAutocompleteProps: MuiAutocompleteProps<OptionType, undefined, undefined, undefined> = {
    id,
    inputValue,
    open,
    onOpen,
    onClose,
    options,
    loading,
    disabled,
    getOptionLabel,
    onInputChange,
    noOptionsText,
    style: { width: inputWidth },
    getOptionSelected: (option, value) => getOptionLabel(option) === getOptionLabel(value),
    renderInput: params => {
      return <TextField {...params} {...textFieldProps} />;
    },
    renderOption: (option, { inputValue }) => {
      const label = getOptionLabel(option);
      const matches = match(label, inputValue);
      const parts = parse(label, matches);
      return (
        <div>
          {parts.map((part, index) => (
            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
          ))}
        </div>
      );
    }
  };

  return (
    <MuiAutocomplete {...muiAutocompleteProps} onChange={onChange} />
  );
}
