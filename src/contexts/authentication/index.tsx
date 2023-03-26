import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { login } from '../../services/authentication';
import { clear, getObject, getValue, saveValue } from '../../storage';
import { AccessTokenResponse, StorageKey } from '../../types';
import { fromUnixTime, compareAsc } from 'date-fns';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export interface UseAuthentication {
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
  ready: boolean;
}

const AuthenticationContext = createContext<UseAuthentication>(
  {} as UseAuthentication,
);

const isExpired = (jwtToken: string): boolean => {
  const decodedJwt = jwtDecode<JwtPayload>(jwtToken);

  if (!decodedJwt || !decodedJwt.exp) return false;

  const expirationDate = fromUnixTime(decodedJwt.exp);
  const today = new Date();

  return compareAsc(today, expirationDate) > 0;
};

export const useAuthentication = (): UseAuthentication =>
  useContext(AuthenticationContext);

export function AuthenticationProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function verifyTokenExpiration() {
      const accessToken = await getValue(StorageKey.AccessToken);
      console.log('useEffect: ' + accessToken);
      if (!accessToken) return;

      const tokenExpired = isExpired(accessToken);

      if (tokenExpired) clearState();
    }

    async function initContext() {
      setLoading(true);

      try {
        await verifyTokenExpiration();
      } finally {
        setLoading(false);
        setReady(true);
      }
    }

    initContext();
  }, []);

  const handleTokenResponse = useCallback(
    async (response: AccessTokenResponse | undefined) => {
      if (!response) return false;

      await saveState(response.accessToken);

      return true;
    },
    [],
  );

  const saveState = async (accessToken: string) => {
    await saveValue(StorageKey.AccessToken, accessToken);
  };

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await login({ email, password });
        return await handleTokenResponse(response);
      } catch {
        clearState();

        return false;
      } finally {
        setLoading(false);
      }
    },
    [handleTokenResponse],
  );

  const signOut = useCallback(async () => {
    //TODO:
    // try {
    //   const refreshTokenValue = await getValue(StorageKey.RefreshToken);
    //   if (refreshTokenValue) await logout(refreshTokenValue);
    // } finally {
    //   clearState();
    // }

    clearState();
  }, []);

  const clearState = () => {
    clear(StorageKey.AccessToken);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        loading,
        signIn,
        signOut,
        ready,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
