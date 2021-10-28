import { userSDKDataProps } from "./context/AuthContext";

type AppProps = {
  accessToken: string;
  cpf: string;
  userDataSDK: userSDKDataProps;
};

function App({ accessToken, cpf, userDataSDK }: AppProps): JSX.Element {
  return (
    <div className="App">
      Edit <code>src/App.tsx</code> and save to reload.
      <p>access token - {accessToken}</p>
      <p>cpf - {cpf}</p>
      <p>appID - {userDataSDK.appId}</p>
      <p>salty - {userDataSDK.salty}</p>
      <p>fullName - {userDataSDK.fullName}</p>
      <p>cpf - {userDataSDK.cpf}</p>
      <p>email - {userDataSDK.email}</p>
      <p>os - {userDataSDK.os}</p>
      <p>customerAcessibility - {userDataSDK.customerAcessibility}</p>
      <p>token - {userDataSDK.token}</p>
      <p>authentication - {userDataSDK.authentication}</p>
      <p>customerType - {userDataSDK.customerType}</p>
      <p>error - {userDataSDK.error}</p>
      <p>appName - {userDataSDK.appName}</p>
    </div>
  );
}

export default App;
