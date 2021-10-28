import { useEffect, useState } from "react";
import App from "../../App";
import Auth from "../../Auth";
import { userSDKDataProps } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { getCustomerData } from "../../utils/SDK/SDKData";

type UserDataProps = {
  accessToken: string;
  cpf: string;
};

function AuthPage(): JSX.Element {
  const [userData, setUserData] = useState<UserDataProps>({
    accessToken: "",
    cpf: "",
  });
  const [sdkData, setSDKData] = useState<userSDKDataProps>({
    salty: "",
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

  console.log("sdkData - ", sdkData);

  const { onAuthSave } = useAuth();

  useEffect(() => {
    async function getClient(): Promise<void> {
      const params = new URLSearchParams(window.location?.href.split("?")[1]);

      const userSDKData = await getCustomerData();

      if (params.get("cpf")) {
        userSDKData.cpf = params.get("cpf");
      }

      const user = await Auth(userSDKData);
      setSDKData(userSDKData);
      debugger;
      setUserData({
        accessToken: user.accessToken,
        cpf: userSDKData.cpf,
      });
      onAuthSave({
        ...user,
        ...userSDKData,
      });
    }

    getClient();
  }, [onAuthSave]);

  if (userData?.accessToken === "") {
    return <div>bla</div>;
  }

  return (
    <div className="App">
      <App
        userDataSDK={sdkData}
        accessToken={userData?.accessToken || ""}
        cpf={userData.cpf}
      />
    </div>
  );
}

export default AuthPage;
