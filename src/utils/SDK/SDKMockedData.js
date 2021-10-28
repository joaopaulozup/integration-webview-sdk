import 'url-search-params-polyfill'
import instance from '../../config/axios/fake'

export const setMockedSDKEnvironment = () => {
  console.info('SDK MOCK ACTIVE!')
  window.mocked_native = SDK_MOCKED_FUNCTIONS
}

const getMemoryItem = key => {
  key = key.toLowerCase()
  const sdkMockedData = SDK_MOCKED_ITENS_DATA[key]
  return sdkMockedData
}

const adjustTrackEvent = token => {
  console.log(`MockedAdjustTrackEvent -> ${JSON.stringify(token)}`)
}

const getItem = getMemoryItem

const setMemoryItem = (key, value) => {
  key = key.toLowerCase()
  SDK_MOCKED_ITENS_DATA[key] = value
}

const setItem = setMemoryItem

const requestNativeFeature = async (payload, callback) => {
  payload = JSON.parse(payload)
  if (payload.action === 'com.itau.CARD_LIST') {
    setTimeout(
      () =>
        window.execCallBackFunction(JSON.stringify(SKD_MOCKED_CREDIT_CARDS)),
      2000
    )
  } else if (payload.action === 'com.itau.GET_REGISTRATION_DATA_COMPLETE') {
    setTimeout(
      () =>
        window.execCallBackFunction(
          JSON.stringify(GET_REGISTRATION_DATA_COMPLETE)
        ),
      500
    )
  } else if (payload.action === 'com.itau.CHECK_ACTIVE_TOKEN') {
    setTimeout(
      () =>
        window.execCallBackFunction(JSON.stringify(SKD_MOCKED_CREDIT_CARDS)),
      500
    )
  } else if (payload.action === 'com.itau.SIMULATE_CHECKOUT') {
    const checkoutSDKPayload = JSON.parse(payload.data)
    const idCartao = checkoutSDKPayload.id_cartao
    const simulateCheckout =
      SIMULATE_CHECKOUT.find(card => card.data.id_cartao === idCartao) ||
      SIMULATE_CHECKOUT[0]
    await instance.post(`send-fake-itoken-confirmation`, {
      ...checkoutSDKPayload,
      dados_de_compra: {
        ...simulateCheckout.data.dados_de_compra
      },
      id_mobile: Math.floor(1000 + Math.random() * 9000)
    })
    setTimeout(
      () => window.execCallBackFunction(JSON.stringify(simulateCheckout)),
      1000
    )
  } else if (payload.action === 'com.itau.CPF') {
    setTimeout(
      () => window.execCallBackFunction(JSON.stringify(SKD_MOCKED_CPF)),
      2000
    )
  } else if (payload.action === 'com.itau.OPEN_LINK') {
    window.location.replace(JSON.parse(payload.data).url) // Redirect to the "home"
  } else if (
    payload.action === 'com.itau.BACK_TO_HOME' ||
    payload.action === 'com.itau.BACK_TO_SERVICES'
  ) {
    window.location.replace('/') // Redirect to the "home"
  } else if (
    payload.action === 'com.itau.WHATSAPP_SHARING' ||
    payload.action === 'com.itau.OTHER_APP_SHARING'
  ) {
    console.log(JSON.stringify(payload.data)) // Redirect to the "home"
  }
}

const SKD_MOCKED_CPF = {
  cpf: '36335589001'
}

const SDK_MOCKED_FUNCTIONS = {
  getMemoryItem,
  getItem,
  setItem,
  requestNativeFeature,
  adjustTrackEvent
}

const SKD_MOCKED_CREDIT_CARDS = [
  {
    cartao: {
      nome_titular: 'Cartão Guima',
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147487',
      numero_cartao: '****.****.****.9304',
      nome_cartao: 'Cartão Guima',
      nome_cliente: 'Cartão Guima',
      codigo_produto: '01342',
      bandeira_cartao: 'VISA'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 0,
      green: 0,
      blue: 33
    },
    gradienteCartao_1: {
      red: 0,
      green: 64,
      blue: 123
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'Cartão Novo Formato',
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147488',
      numero_cartao: '****.****.****.6006',
      nome_cartao: 'Cartão Novo Formato',
      nome_cliente: 'Cartão Novo Formato',
      codigo_produto: '01342',
      bandeira_cartao: 'MASTERCARD'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 0,
      green: 0,
      blue: 33
    },
    gradienteCartao_1: {
      red: 0,
      green: 64,
      blue: 123
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'Cartão Homolog Rede',
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147489',
      numero_cartao: '****.****.****.0007',
      nome_cartao: 'Cartão Homolog Rede',
      nome_cliente: 'Cartão Homolog Rede',
      codigo_produto: '01342',
      bandeira_cartao: 'MASTERCARD'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 0,
      green: 0,
      blue: 33
    },
    gradienteCartao_1: {
      red: 0,
      green: 64,
      blue: 123
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'PROJETO CHAT',
      id_cartao: 'ACAZACCc-b2da1a73daf96d13216edd8ba12e483f',
      numero_cartao: '****.****.****.2409',
      nome_cartao: 'Itaucard Bom',
      nome_cliente: 'PROJETO CHAT',
      codigo_produto: '01268',
      bandeira_cartao: 'VISA'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 2,
      green: 51,
      blue: 148
    },
    gradienteCartao_1: {
      red: 40,
      green: 101,
      blue: 140
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'FACELIFT MOBLIE',
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147478',
      numero_cartao: '****.****.****.9304',
      nome_cartao: 'Visa Vencido',
      nome_cliente: 'FACELIFT MOBLIE',
      codigo_produto: '01342',
      bandeira_cartao: 'VISA'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 0,
      green: 0,
      blue: 33
    },
    gradienteCartao_1: {
      red: 0,
      green: 64,
      blue: 123
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'PROJETO CHAT',
      id_cartao: 'ACAZACCc-c9422d7962c882974d6021e48532f2d2',
      numero_cartao: '****.****.****.6804',
      nome_cartao: 'Ponto Frio Itaucard Mastercard',
      nome_cliente: 'PROJETO CHAT',
      codigo_produto: '01650',
      bandeira_cartao: 'Mastercard'
    },
    cor_da_fonte: {
      red: 60,
      green: 40,
      blue: 19
    },
    gradienteCartao_0: {
      red: 147,
      green: 147,
      blue: 147
    },
    gradienteCartao_1: {
      red: 210,
      green: 210,
      blue: 210
    },
    cor_do_icone: 'escuro'
  },
  {
    cartao: {
      nome_titular: 'FACELIFT MOBLIE',
      id_cartao: 'ACAZACCc-933cc62a1fca7d536256080873d74011',
      numero_cartao: '****.****.****.5900',
      nome_cartao: 'Pao De Acucar Itaucard Mastercard Internacion',
      nome_cliente: 'FACELIFT MOBLIE',
      codigo_produto: '04571',
      bandeira_cartao: 'Mastercard'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 0,
      green: 0,
      blue: 33
    },
    gradienteCartao_1: {
      red: 0,
      green: 64,
      blue: 123
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'VQQBLIFT MOBLIE',
      id_cartao: 'BdaDHEZB-33a4402b948ffc73b4fa396f87593419',
      numero_cartao: '****.****.****.5904',
      nome_cartao: 'Ipiranga Itaucard Mastercard Internacional',
      nome_cliente: 'CRTDIF061835228801',
      codigo_produto: '01041',
      bandeira_cartao: 'Mastercard'
    },
    cor_da_fonte: {
      red: 255,
      green: 255,
      blue: 255
    },
    gradienteCartao_0: {
      red: 0,
      green: 0,
      blue: 33
    },
    gradienteCartao_1: {
      red: 0,
      green: 64,
      blue: 123
    },
    cor_do_icone: 'claro'
  },
  {
    cartao: {
      nome_titular: 'FACELIFT MOBLIE',
      id_cartao: 'ACAZACCc-046a16b4c0fc14b495d0ca28236f2c94',
      numero_cartao: '****.****.****.9500',
      nome_cartao: 'Walmart Itaucard Mci Internacional',
      nome_cliente: 'FACELIFT MOBLIE',
      codigo_produto: '01159',
      bandeira_cartao: 'Mastercard'
    },
    cor_da_fonte: {
      red: 60,
      green: 40,
      blue: 19
    },
    gradienteCartao_0: {
      red: 158,
      green: 146,
      blue: 117
    },
    gradienteCartao_1: {
      red: 220,
      green: 212,
      blue: 181
    },
    cor_do_icone: 'escuro'
  }
]

const SDK_MOCKED_ITENS_DATA = {
  customer_full_name: 'José Carlos da Silva',
  customer_cpf: '82738257879',
  customer_cpf_hashed: 'HomologacaoEden123456789',
  customer_email: 'jose_silva@mocked.com',
  platform: 'IOS',
  customer_accessibility: 'true',
  customer_type: 'fisica',
  authentication: '112312321312',
  token: 'iu87llmnhjo981212',
  customer_card_ownership: 'titular',
  customer_card_name: 'MASTERCARD BLACK',
  customer_card_flag: 'MASTERCARD',
  customer_card_type: 'produto conta',
  customer_card_product: '01294',
  app_name: 'credicard'
}

const SIMULATE_CHECKOUT = [
  {
    data: {
      id_cartao: 'ACAZACCc-b2da1a73daf96d13216edd8ba12e483f',
      chpras: '0000000000248372003',
      codigo_produto: '02009',
      dados_de_compra: {
        dados_cartao:
          '1777E46CB7782E886CE58E21C5C98E59CD574174E663B83663BDADBFFC93DAB54F0FEA6432CAE05DD1FE56E62D99A057199401FDC094F002F5D1A56477F3A39D'
      }
    }
  },
  {
    data: {
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147478',
      chpras: '0000000000248372003',
      codigo_produto: '02009',
      dados_de_compra: {
        dados_cartao:
          '37559C8BC145949C1EBD409F79B69A365BFFF0A3269F0965E8F3CF47CAA2C2C101F28C6995D5F639ADFA8FBD410668BF90B1C848FC9899B876C46F4A57FB0590'
      }
    }
  },
  {
    data: {
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147487',
      chpras: '0000000000248372003',
      codigo_produto: '02009',
      dados_de_compra: {
        dados_cartao:
          '3ACBF9D22EC5D2996985B373183CF85DEAD70BD1BD0AF28704341644D4B151A116F8F6E3436D89C14C23CBF172CF0A9E0A7B184C8827BF29279E15AE48BA6A67'
      }
    }
  },
  {
    data: {
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147488',
      chpras: '000000248398984',
      codigo_produto: '02009',
      dados_de_compra: {
        dados_cartao:
          'BD9FAF65826F7861E398A98D8289527F53E3ADB52C58EFCAC850700F28D64EBA2FD4A75FA7A524B5A118813948DDCB521566A8477A0C430AF8D7C939FE5DF313E88E47B054CF262BEE1BD53EEF7DF9B27AB341CC3D5FB2CF38941A9390B2859A9F30C3FC0492AF56CF17A44FC4F3392E6F762210F961046AFC5708C44D7ED6D8D7E5FF4ABC906EE88EF0BC7B8B58D238353FE8CBD77009AAED3683DC1F3F576F86E8CA31BE0AC78C4973091C8588A416C43A2DCD59CD44FBE7D7BD454FBFBFCA70CBED848531426D3310D356E2C009989EF60CD3AD479CEB8B73C953366C17A159C6EB51BD13FEFAEAE449EFE2DCA518'
      }
    }
  },
  {
    data: {
      id_cartao: 'ACAZACCc-b88909664a4aff03537ef37d33147489',
      chpras: '0000000000248372003',
      codigo_produto: '02009',
      dados_de_compra: {
        dados_cartao:
          'BD9FAF65826F7861E398A98D8289527FF703D490795A54067D947980EB743C9A11E4223073381694DB1B47589376A2C9478F6B024DA01C9751540F237DDD7746D1C2EAB1BA6CC6CEC16DF16B34CD100E45C7596BFF0D479EE6E7F56CFF7BFE9D7D2F9C17AC258585F0ADE73440D72C995A6362559708ACBD83DF09FFC5A4159A9AC242B136578874790B225E6051DD4436C3CAAFCF4BCD5F9EA2C8ABBB9FBD1E6D5E836BDDC4E3A4F3B607D468526DC56ADCA6DCA99B42D69ACC78B662D28D3C8F9F8FB29BAD76AAB1E471E736824E3E7842E6A2701EF3F51A87919EF421B5D923A65A5C24EC249AD130AE1205672B2D'
      }
    }
  }
]

const GET_REGISTRATION_DATA_COMPLETE = {
  data: {
    id_cartao: 'ACLTACJZ-1068b7fba4474364fd7f573bcfef3ddc',
    chpras: '0000000000248372003',
    codigo_produto: '02009',
    informacao_titular_cartao: {
      nome_cliente: 'ROBMSQT04226136306',
      nome_titular: 'ROBMSQT04226136306',
      nacionalidade: 'BRASIL',
      rg: '322539961',
      estado_civil: 'Casado',
      nome_mae: "JOSE D'AMICO NETO",
      nome_pai: "CRISTINA DUARTE P D'AMICO",
      data_nascimento: '1980-05-31'
    },
    dados_residenciais_titular_cartao: {
      logradouro: 'R HENRIQUE SHAUMANN',
      numero: '123',
      complemento: 'APTO 69',
      bairro: 'PINHEIROS',
      cep: '05413020',
      cidade: 'SAO PAULO',
      uf: 'SP',
      ddi: '0055',
      ddd: '0011',
      telefone: '0030949810',
      ramal: '000000'
    },
    dados_comerciais_titular_cartao: {
      logradouro: 'R TEODORO SAMPAIO',
      numero: '1756',
      complemento: '5ANDAR',
      bairro: 'PINHEIROS',
      cep: '05406150',
      cidade: 'SAO PAULO',
      uf: 'SP',
      ddi: '55',
      ddd: '0',
      telefone: '30949569',
      ramal: '000000'
    },
    contatos_titular_cartao: {
      ddi_celular: '0055',
      ddd_celular: '',
      celular: '0994684406',
      ddi_fax: '055',
      ddd_fax: '0000',
      fax: '00000000',
      email: ''
    },
    endereco_recebimento_fatura_cartao: {
      tipo_endereco: 'Residencial',
      endereco_cartao: {
        logradouro: 'R HENRIQUE SHAUMANN',
        numero: '123',
        complemento: 'APTO 69',
        bairro: '',
        cep: '05413020',
        cidade: 'SAO PAULO',
        uf: 'SP'
      }
    }
  }
}
