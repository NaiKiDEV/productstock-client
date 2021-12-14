import React from 'react';

function Dialog({ children, isOpen }) {
  return (
    <div className={`absolute top-0 h-full w-full ${!isOpen && 'hidden'}`}>
      <div className="h-full w-full relative">
        <div className="bg-lightdarkblue opacity-60 h-full w-full" />
        <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export { Dialog };
