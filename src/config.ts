const localdev = {
  API_ROOT: 'http://pivot.fake:5000/v1',
};

const dev = {
  API_ROOT: 'http://dev.trainwithpivot.com/v1',
};

const config = process.env.REACT_APP_STAGE === 'development' ? dev : localdev;

export default {
  ...config,
};
