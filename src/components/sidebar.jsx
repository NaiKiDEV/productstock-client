import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { LoginIcon, LogoIcon, UserIcon } from '../icons';
import { CollapsableButton } from './design';

function Sidebar() {
  return (
    <div className="h-full bg-darkblue p-2 flex flex-col justify-between">
      <div className="flex">
        <Link to="/">
          <Box className="text-white flex gap-2 align-center">
            <Box className="w-6 h-6">
              <LogoIcon />
            </Box>
            <div className="whitespace-nowrap hidden sm:block">
              PRODUCT STOCK
            </div>
          </Box>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <CollapsableButton
          variant="outline"
          border
          leftIcon={<UserIcon />}
          className="text-lightblue hover:bg-lightdarkblue"
        >
          Login
        </CollapsableButton>
        <CollapsableButton
          variant="outline"
          border
          leftIcon={<LoginIcon />}
          className="text-lightblue hover:bg-lightdarkblue"
        >
          Register
        </CollapsableButton>
      </div>
    </div>
  );
}

export { Sidebar };
