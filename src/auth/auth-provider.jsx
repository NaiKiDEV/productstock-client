import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initAuth, selectAuth } from './state';

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return <>{children}</>;
}

export { AuthProvider };
