import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_FAKE_URL_QA}`,
  params: {
    'gw-app-key': `${process.env.REACT_APP_FAKE_GATEWAY_KEY_QA}`,
  },
})

export default instance
