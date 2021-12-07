import React from 'react';
import { DangerIcon, SuccessIcon } from '../../icons';

const colorMap = {
  success: 'bg-brightgreen text-white',
  danger: 'bg-red-500 text-white',
};

const colorComponentMap = {
  success: <SuccessIcon />,
  danger: <DangerIcon />,
};

function CustomAlert({ type, className, message }) {
  return (
    <div
      className={`rounded py-2 my-1 flex items-center shadow gap-2 ${
        colorMap[type]
      } ${!!className && className}`}
    >
      <div className="w-5 h-5 ml-2">{colorComponentMap[type]}</div>
      <div className="pr-2 leading-none text-sm">{message}</div>
    </div>
  );
}

export { CustomAlert };
