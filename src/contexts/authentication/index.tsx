import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { login } from '../../services/authentication';
import { clear, getValue, saveValue } from '../../storage';
import { AccessTokenResponse, StorageKey } from '../../types';
import { fromUnixTime, compareAsc } from 'date-fns';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { RoleEnum } from '../../types/roles/roleEnum';
import { AccessTokenPayload } from '../../types/authentication/jwt/accessTokenPayload';

export interface UseAuthentication {
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  handleTokenResponse: (tokenResponse: AccessTokenResponse) => Promise<boolean>;
  authenticated: boolean;
  loading: boolean;
  ready: boolean;
  userRole: RoleEnum;
  userId: string;
}

const AuthenticationContext = createContext<UseAuthentication>(
  {} as UseAuthentication,
);

export const useAuthentication = (): UseAuthentication =>
  useContext(AuthenticationContext);

const isExpired = (decodedJwt: JwtPayload): boolean => {
  if (!decodedJwt || !decodedJwt.exp) return false;

  const expirationDate = fromUnixTime(decodedJwt.exp);
  const today = new Date();

  return compareAsc(today, expirationDate) > 0;
};

export function AuthenticationProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<RoleEnum>(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function verifyTokenExpiration() {
      if (!authenticated) return;

      const accessToken = await getValue(StorageKey.AccessToken);
      const decodedJwt = jwtDecode<AccessTokenPayload>(accessToken);

      if (!accessToken || isExpired(decodedJwt)) {
        clearState();
        setAuthenticated(false);
      }
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

  const handleTokenResponse = async (
    response: AccessTokenResponse | undefined,
  ) => {
    if (!response) return false;

    await saveState(response.accessToken);
    const accessToken = await getValue(StorageKey.AccessToken);
    const decodedJwt = jwtDecode<AccessTokenPayload>(accessToken);
    setUserRole(decodedJwt.roles);
    setUserId(decodedJwt.user_id);
    setAuthenticated(true);

    return true;
  };

  const saveState = async (accessToken: string) => {
    await saveValue(StorageKey.AccessToken, accessToken);
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (authenticated) signOut();

      const response = await login({ email, password });
      return await handleTokenResponse(response);
    } catch {
      clearState();

      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    clearState();
    setAuthenticated(false);
    setUserId('');
    setUserRole(null);
  };

  const clearState = () => {
    clear(StorageKey.AccessToken);
    clear(StorageKey.User);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        loading,
        signIn,
        signOut,
        handleTokenResponse,
        authenticated,
        ready,
        userRole,
        userId,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
