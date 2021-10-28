const { REACT_APP_ENVIRONMENT } = process.env;

const config = require(`./${REACT_APP_ENVIRONMENT}`).default;

export default config;
