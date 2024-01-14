import { X } from 'lucide-react';
import { FormEvent } from 'react';

import { ControlledSearchBoxProps } from './search-box-wrapper';
import { SearchInputField } from './search-input-field';

export const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  close,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit(event);
      close();
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div {...props} className="mx-auto w-[50vw]">
      <form
        action=""
        className="relative"
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <SearchInputField
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={placeholder}
          spellCheck={false}
          // type="search"
          value={value}
          onChange={onChange}
        />
        {value && (
          <button
            onClick={handleReset}
            type="button"
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center p-2"
          >
            <X className="h-5 w-5 text-mineral-green-600" strokeWidth={3} />
          </button>
        )}
      </form>
    </div>
  );
};
