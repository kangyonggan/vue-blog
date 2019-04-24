import Mock from 'mockjs';

import navList from './navList';
import articles from './articles';
import article from './article';

/**
 * 查询导航栏
 */
Mock.mock('navList', () => {
    return navList;
});

/**
 * 查询文章列表
 */
Mock.mock('article', () => {
    return articles;
});

/**
 * 查询文章详情
 */
Mock.mock(/article\/*/, () => {
    return article;
});

export default Mock;
