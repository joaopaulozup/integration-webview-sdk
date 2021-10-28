import Constants from './Constants'
import { getSDKItem } from './SDKIntegrator'

const customerTypeMapping = {
  3: 'Varejo',
  4: 'Personalite',
  L: 'Uniclass',
  7: 'Private',
  null: 'Não correntista',
  undefined: 'Não correntista',
  '': 'Não correntista'
}

const exists = obj => {
  if (obj !== undefined && obj != null) {
    return true
  }
  return false
}

export const getCustomerData = async () => {
  const NOME = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.CUSTOMER_FULL_NAME)
  const CPF = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.CUSTOMER_CPF)
  const EMAIL = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.CUSTOMER_EMAIL)
  const OS = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.PLATFORM)
  const ACESSIBILIDADE = await getSDKItem(
    Constants.SDK_CUSTOMER_KEYS.CUSTOMER_ACCESSIBILITY
  )
  const SEGMENT = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.CUSTOMER_TYPE)
  const APP = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.APP_ID)
  const TOKEN = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.TOKEN)
  const SALTY = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.SALTY)
  const AUTHENTICATION = await getSDKItem(
    Constants.SDK_CUSTOMER_KEYS.AUTHENTICATION
  )
  const APP_NAME = await getSDKItem(Constants.SDK_CUSTOMER_KEYS.APP_NAME)

  const ERROR =
    !exists(APP) ||
    !exists(NOME) ||
    !exists(CPF) ||
    !exists(OS) ||
    !exists(ACESSIBILIDADE) ||
    !exists(APP_NAME) ||
    !exists(EMAIL) ||
    !exists(TOKEN) ||
    !exists(SALTY) ||
    !exists(AUTHENTICATION)

  return {
    appId: APP,
    fullName: NOME,
    cpf: CPF,
    email: EMAIL,
    os: OS,
    customerAcessibility: ACESSIBILIDADE,
    token: TOKEN,
    salty: SALTY,
    authentication: AUTHENTICATION,
    customerType: customerTypeMapping[SEGMENT],
    error: ERROR,
    appName: APP_NAME
  }
}
