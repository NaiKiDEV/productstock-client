import React from 'react';
import { DangerIcon, DangerIconInverted } from '../../icons';

function InputField({
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
  ...rest
}) {
  const isInputInvalid = error || isInvalid;
  return (
    <div
      className={`flex flex-col ${!!containerClassName && containerClassName}`}
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
      <input
        type={type}
        name={name}
        autoComplete="off"
        className={`rounded px-3 py-1 outline-none bg-lightdarkblue text-${textSize} text-lightblue border-b-2 transition-colors placeholder-lightblue placeholder-opacity-30 ${
          isInputInvalid ? 'border-red-500' : 'focus-within:border-blue'
        } ${!!className && className}`}
        {...rest}
      />
    </div>
  );
}

export { InputField };
