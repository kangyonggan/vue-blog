import Mock from 'mockjs';

import navList from './navList';

/**
 * 查询导航栏
 */
Mock.mock('navList', () => {
    return navList;
});

export default Mock;
