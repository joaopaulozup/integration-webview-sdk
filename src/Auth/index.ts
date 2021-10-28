import instance from "../config/axios/bff";
import { AuthProps, userSDKDataProps } from "../context/AuthContext";

export default async function Auth(
  userSDKData: userSDKDataProps
): Promise<AuthProps> {
  try {
    let userData: userSDKDataProps;
    const params = new URLSearchParams(window.location?.href.split("?")[1]);
    if (!process.env.REACT_APP_USE_SDK || params.get("sdk")) {
      userData = userSDKData;
    } else {
      const responseCredentials = await instance.get(
        `credentials?cpf=${userSDKData.cpf}`
      );
      const { data } = responseCredentials;
      userData = data;
      userData.authentication = data.autenticacao;
    }

    const responseAuth = await instance.post(`authenticate`, {
      salty: userData.salty,
      token: userData.token,
      autenticacao: userData.authentication,
    });

    const accessToken = responseAuth.headers["x-access-token"];

    return {
      ...responseAuth.data,
      accessToken,
      ...userSDKData,
      salty: userData.salty,
    };
  } catch (err) {
    throw new Error("Ocorreu um erro!");
  }
}
