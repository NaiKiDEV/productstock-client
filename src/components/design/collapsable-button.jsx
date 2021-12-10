import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React from 'react';

function CollapsableButton({
  leftIcon,
  rightIcon,
  iconSize = 6,
  children,
  breakpoint = 'sm',
  collapsed = false,
  className,
  hoverColor,
  ...rest
}) {
  return (
    <button
      className={`flex items-center rounded p-1 w-full transition-colors hover:bg-${hoverColor} ${className}`}
      {...rest}
    >
      {leftIcon && (
        <Box w={iconSize} h={iconSize}>
          {leftIcon}
        </Box>
      )}
      {children && (
        <div
          className={`text-sm hidden ${
            !collapsed && `${breakpoint}:flex whitespace-nowrap px-2`
          }`}
        >
          {children}
        </div>
      )}
      {rightIcon && (
        <Box w={iconSize} h={iconSize}>
          {rightIcon}
        </Box>
      )}
    </button>
  );
}

export { CollapsableButton };
