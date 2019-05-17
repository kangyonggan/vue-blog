import Env from './env';

let baseUrl = '';

if (Env === 'development') {
    baseUrl = 'http://localhost:8080';
} else if (Env === 'hd') {
    baseUrl = 'https://kangyonggan.com/web';
} else if (Env === 'production') {
    baseUrl = 'https://kangyonggan.com/web';
}

let config = {
    env: Env,
    baseUrl: baseUrl
};

export default config;
