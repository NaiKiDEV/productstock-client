import React from 'react';
import { DangerIcon, DangerIconInverted } from '../../icons';

function InputFeld({
  label,
  labelClassName,
  name,
  type,
  isInvalid,
  className,
  error,
  ...rest
}) {
  const isInputInvalid = error || isInvalid;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row align-center">
        {label && (
          <label
            htmlFor={name}
            name={name}
            className={'text-lg ' + labelClassName}
          >
            {label}
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
        className={`rounded px-3 py-1 outline-none bg-lightdarkblue text-lg text-lightblue border-b-2 transition-colors placeholder-lightblue placeholder-opacity-30 ${
          isInputInvalid ? 'border-red-500' : 'focus-within:border-blue'
        } ${!!className & className}`}
        {...rest}
      ></input>
    </div>
  );
}

export { InputFeld };
