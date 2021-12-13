import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from '../api';
import { logout, selectAuth } from '../auth';
import {
  EditIcon,
  HomeIcon,
  LoginIcon,
  LogoIcon,
  PlusIcon,
  UserIcon,
} from '../icons';
import { CollapsableButton } from './design';

function Sidebar() {
  const dispatch = useDispatch();

  const { isAuthenticated, email, role } = useSelector(selectAuth);

  console.log(role);

  return (
    <div className="h-full bg-darkblue p-2 flex flex-col justify-between border-r border-lighterdarkblue">
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
        <Link to="/products">
          <CollapsableButton
            leftIcon={<LogoIcon />}
            className="text-lightblue"
            hoverColor="lightdarkblue"
          >
            Products
          </CollapsableButton>
        </Link>
        {(role === 'Admin' || role === 'Warehouse') && (
          <>
            <Link to="/categories">
              <CollapsableButton
                leftIcon={<EditIcon />}
                className="text-lightblue"
                hoverColor="lightdarkblue"
              >
                Edit Categories
              </CollapsableButton>
            </Link>
            <Link to="/products/add">
              <CollapsableButton
                leftIcon={<PlusIcon />}
                className="text-mutedgreen"
                hoverColor="lightdarkblue"
              >
                Add a Product
              </CollapsableButton>
            </Link>
            <Link to="/categories/add">
              <CollapsableButton
                leftIcon={<PlusIcon className="text-blue" />}
                className="text-blue"
                hoverColor="lightdarkblue"
              >
                Add a Category
              </CollapsableButton>
            </Link>
            <Link to="/users">
              <CollapsableButton
                leftIcon={<UserIcon />}
                className="text-lightblue"
                hoverColor="lightdarkblue"
              >
                Manage Users
              </CollapsableButton>
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {!isAuthenticated ? (
          <>
            <Link to="/register">
              <CollapsableButton
                leftIcon={<LoginIcon />}
                className="text-lightblue"
                hoverColor="lightdarkblue"
              >
                Join Us!
              </CollapsableButton>
            </Link>
            <Link to="/login">
              <CollapsableButton
                leftIcon={<UserIcon />}
                className="text-lightblue"
                hoverColor="lightdarkblue"
              >
                Sign in
              </CollapsableButton>
            </Link>
          </>
        ) : (
          <>
            <div className="px-2 py-1 hidden sm:block rounded bg-lightdarkblue">
              <div className="text-lightblue text-sm whitespace-nowrap">
                Logged in as:
              </div>
              <div className="text-sm text-blue w-24 truncate">{email}</div>
            </div>
            <div className="px-2 py-1 hidden sm:block rounded bg-lightdarkblue">
              <div className="text-lightblue text-sm whitespace-nowrap">
                Current role:
              </div>
              <div className="text-sm text-blue w-24 truncate">{role}</div>
            </div>
            <CollapsableButton
              leftIcon={<LoginIcon />}
              className="text-red-500"
              hoverColor="lightdarkblue"
              onClick={() => dispatch(logout())}
            >
              Logout
            </CollapsableButton>
          </>
        )}
      </div>
    </div>
  );
}

export { Sidebar };
