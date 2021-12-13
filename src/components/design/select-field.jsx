import React, { useEffect, useState } from 'react';
import {
  DangerIcon,
  DangerIconInverted,
  DownIcon,
  HomeIcon,
  UpIcon,
} from '../../icons';

function SelectField({
  label,
  labelClassName = 'text-lg',
  textSize = 'lg',
  containerClassName,
  name,
  type,
  isInvalid,
  className,
  error,
  required,
  options,
  value,
  iconPlacement = 'bottom-2 right-2',
  ...rest
}) {
  const isInputInvalid = error || isInvalid;

  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  return (
    <div
      className={`flex flex-col relative ${
        !!containerClassName && containerClassName
      }`}
    >
      <div className="flex flex-row align-center">
        {label && (
          <label htmlFor={name} name={name} className={`${labelClassName}`}>
            {label}
            {required && (
              <span className="text-bold text-brightgreen ml-1">*</span>
            )}
          </label>
        )}
        {error && (
          <div className="text-red-500 flex justify-end items-center flex-grow text-xs">
            {error}
            <DangerIcon className="w-4 h-4 ml-1" />
          </div>
        )}
      </div>
      <select
        name={name}
        value={value}
        className={`rounded px-2 py-1 outline-none appearance-none bg-lightdarkblue text-${textSize} text-lightblue border-b-2 transition-colors placeholder-lightblue placeholder-opacity-30 ${
          isInputInvalid ? 'border-red-500' : 'focus-within:border-blue'
        } ${!!className && className}`}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        {...rest}
      >
        {options?.map((x) => (
          <option key={x.id} value={x.id}>
            {x.name}
          </option>
        ))}
      </select>
      <div className={`absolute ${iconPlacement} pointer-events-none`}>
        {!open ? (
          <DownIcon className="w-6 h-6" />
        ) : (
          <UpIcon className="w-6 h-6" />
        )}
      </div>
    </div>
  );
}

export { SelectField };
