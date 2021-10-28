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
      {accessToken}
      {cpf}
      {userDataSDK.appId}
      {userDataSDK.salty}
      {userDataSDK.fullName}
      {userDataSDK.cpf}
      {userDataSDK.email}
      {userDataSDK.os}
      {userDataSDK.customerAcessibility}
      {userDataSDK.token}
      {userDataSDK.authentication}
      {userDataSDK.customerType}
      {userDataSDK.error}
      {userDataSDK.appName}
    </div>
  );
}

export default App;
