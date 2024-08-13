import React, {createContext} from 'react';
import {AuthAction} from '../navigation/navigationDto.ts';

interface AuthContextProps {
  dispatch: (action: AuthAction) => void;
}

export const AuthContext = createContext({} as AuthContextProps);
