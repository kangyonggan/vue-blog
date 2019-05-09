import Mock from 'mockjs';

import navList from './navList';
import articles from './articles';
import viewArticles from './viewArticles';
import article from './article';
import novels from './novels';
import newNovels from './newNovels';
import novel from './novel';
import section from './section';
import albums from './albums';
import album from './album';
import videos from './videos';
import video from './video';
import indexArticles from './indexArticles';
import indexNovels from './indexNovels';

/**
 * 查询导航栏
 */
Mock.mock('/navs', 'get', () => {
    return navList;
});

/**
 * 查询文章列表
 */
Mock.mock('/article', 'post', () => {
    return articles;
});

/**
 * 大家都在看
 */
Mock.mock('/article/view', 'get', () => {
    return viewArticles;
});

/**
 * 查询文章详情
 */
Mock.mock('/article/detail', 'post', () => {
    return article;
});

/**
 * 查询小说列表
 */
Mock.mock('/novel', 'post', () => {
    return novels;
});

/**
 * 查询最新小说
 */
Mock.mock('/novel/new', 'get', () => {
    return newNovels;
});

/**
 * 查询小说详情
 */
Mock.mock('/novel/detail', 'post', () => {
    return novel;
});

/**
 * 查询小说章节
 */
Mock.mock('/novel/section', 'post', () => {
    return section;
});

/**
 * 查询相册列表
 */
Mock.mock('/album', 'get', () => {
    return albums;
});

/**
 * 查询相册详情
 */
Mock.mock('/album/detail', 'post', () => {
    return album;
});

/**
 * 查询视频列表
 */
Mock.mock('/video', 'get', () => {
    return videos;
});

/**
 * 查询视频详情
 */
Mock.mock('/video/detail', 'post', () => {
    return video;
});

/**
 * 查询首页文章列表
 */
Mock.mock('/articles', 'get', () => {
    return indexArticles;
});

/**
 * 查询首页小说列表
 */
Mock.mock('/novels', 'get', () => {
    return indexNovels;
});

export default Mock;
