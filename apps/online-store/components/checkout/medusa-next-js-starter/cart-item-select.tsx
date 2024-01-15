import { ErrorMessage } from '@hookform/error-message';
import { IconBadge } from '@medusajs/ui';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { get } from 'react-hook-form';

export type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      placeholder = 'Select...',
      errors,
      touched,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    const hasError = props.name
      ? get(errors, props.name) && get(touched, props.name)
      : false;

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === '') {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <IconBadge
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clsx(
            'txt-compact-small text-ui-fg-base group relative flex items-center border',
            className,
            {
              'text-ui-fg-subtle': isPlaceholder,
            },
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="h-16 w-16 appearance-none items-center justify-center border-none bg-transparent px-4 outline-none transition-colors duration-150 focus:border-gray-700"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute flex w-8 justify-end group-hover:animate-pulse">
            <ChevronDown />
          </span>
        </IconBadge>
        {hasError && props.name && (
          <ErrorMessage
            errors={errors}
            name={props.name}
            render={({ message }) => {
              return (
                <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                  <span>{message}</span>
                </div>
              );
            }}
          />
        )}
      </div>
    );
  },
);

CartItemSelect.displayName = 'CartItemSelect';

export default CartItemSelect;
