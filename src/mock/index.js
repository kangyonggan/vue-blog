import Mock from 'mockjs';

import navList from './navList';
import articles from './articles';
import article from './article';
import novels from './novels';
import novel from './novel';
import section from './section';

/**
 * 查询导航栏
 */
Mock.mock('/navList', 'get', () => {
    return navList;
});

/**
 * 查询文章列表
 */
Mock.mock('/article', 'get', () => {
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
Mock.mock('/novel', 'get', () => {
    return novels;
});

/**
 * 查询小说详情
 */
Mock.mock(/novel\/*/, 'post', () => {
    return novel;
});

/**
 * 查询小说章节
 */
Mock.mock(/section\/*\/*/, 'post', () => {
    return section;
});

export default Mock;
