import Env from './env';

const baseUrl = Env === 'development' ? 'http://localhost:8080' : (Env === 'mock' ? '' : 'https://kangyonggan.com/web');

console.log(baseUrl);

let config = {
    env: Env,
    baseUrl: baseUrl
};

export default config;
