import Mock from 'mockjs';

import success from './success';

/**
 * 登录
 */
Mock.mock(/login/, () => {
    return success;
});

export default Mock;
