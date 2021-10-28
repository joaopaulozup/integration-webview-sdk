import { createContext, useCallback, useState } from "react";

export type userSDKDataProps = {
  salty: string;
  appId: string;
  fullName: string;
  cpf: string;
  email: string;
  os: string;
  customerAcessibility: string;
  token: string;
  authentication: string;
  customerType: string;
  error: boolean;
  appName: string;
};

export type AuthProps = userSDKDataProps & {
  customerId: string;
  accessToken: string;
};

type AuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type AuthContext = AuthProps & {
  onAuthSave: (data: AuthProps) => void;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [auth, setAuth] = useState<AuthProps>({
    customerId: "",
    salty: "",
    accessToken: "",
    appId: "",
    fullName: "",
    cpf: "",
    email: "",
    os: "",
    customerAcessibility: "",
    token: "",
    authentication: "",
    customerType: "",
    error: false,
    appName: "",
  });

  const onAuthSave = useCallback((data: AuthProps) => {
    setAuth((state) => ({ ...state, ...data }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, onAuthSave }}>
      {children}
    </AuthContext.Provider>
  );
}
