import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, LoginIcon, LogoIcon, UserIcon } from '../icons';
import { CollapsableButton } from './design';

function Sidebar() {
  return (
    <div className="h-full bg-darkblue p-2 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Link to="/">
          <CollapsableButton
            leftIcon={<HomeIcon />}
            className="text-lightblue"
            hoverColor="lightdarkblue"
          >
            Home
          </CollapsableButton>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <Link to="/login">
          <CollapsableButton
            leftIcon={<UserIcon />}
            className="text-lightblue"
            hoverColor="lightdarkblue"
          >
            Sign in
          </CollapsableButton>
        </Link>
        <Link to="/register">
          <CollapsableButton
            leftIcon={<LoginIcon />}
            className="text-lightblue"
            hoverColor="lightdarkblue"
          >
            Join Us!
          </CollapsableButton>
        </Link>
      </div>
    </div>
  );
}

export { Sidebar };
