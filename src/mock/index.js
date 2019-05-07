import Mock from 'mockjs';

import navList from './navList';
import articles from './articles';
import article from './article';
import novels from './novels';

/**
 * 查询导航栏
 */
Mock.mock('navList', 'get', () => {
    return navList;
});

/**
 * 查询文章列表
 */
Mock.mock('article', 'get', () => {
    return articles;
});

/**
 * 查询文章详情
 */
Mock.mock(/article\/*/, 'post', () => {
    return article;
});

/**
 * 查询小说列表
 */
Mock.mock('novel', 'get', () => {
    return novels;
});

export default Mock;
