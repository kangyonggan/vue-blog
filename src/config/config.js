import Env from './env';

const baseUrl = Env === 'development' ? 'http://localhost:8080' : 'https://kangyonggan.com/web';

let config = {
    env: Env,
    baseUrl: baseUrl
};

export default config;
