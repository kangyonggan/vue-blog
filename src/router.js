function layout(resolve) {
    return require(['./views/layout.vue'], resolve);
}

const routers = [{
    path: '/',
    redirect: '/index',
    component: (resolve) => layout(resolve),
    children: [
        {
            path: '',
            name: 'index',
            meta: {
                title: '首页'
            },
            component: (resolve) => require(['./views/web/index.vue'], resolve)
        }, {
            path: 'article',
            name: 'article',
            meta: {
                title: '文章'
            },
            component: (resolve) => require(['./views/web/article/index.vue'], resolve)
        }, {
            path: 'article/:articleId',
            name: 'articleDetail',
            meta: {
                title: '文章详情'
            },
            component: (resolve) => require(['./views/web/article/detail.vue'], resolve)
        }, {
            path: 'novel',
            name: 'novel',
            meta: {
                title: '小说'
            },
            component: (resolve) => require(['./views/web/novel/index.vue'], resolve)
        }, {
            path: 'novel/:novelId',
            name: 'novelDetail',
            meta: {
                title: '小说详情'
            },
            component: (resolve) => require(['./views/web/novel/detail.vue'], resolve)
        }, {
            path: 'novel/:novelId/:sectionId',
            name: 'novelSection',
            meta: {
                title: '小说章节'
            },
            component: (resolve) => require(['./views/web/novel/section.vue'], resolve)
        }, {
            path: 'album',
            name: 'album',
            meta: {
                title: '相册'
            },
            component: (resolve) => require(['./views/web/album/index.vue'], resolve)
        }, {
            path: 'album/:albumId',
            name: 'albumDetail',
            meta: {
                title: '相册详情'
            },
            component: (resolve) => require(['./views/web/album/detail.vue'], resolve)
        }, {
            path: 'video',
            name: 'video',
            meta: {
                title: '视频'
            },
            component: (resolve) => require(['./views/web/video/index.vue'], resolve)
        }, {
            path: 'video/:videoId',
            name: 'videoDetail',
            meta: {
                title: '视频详情'
            },
            component: (resolve) => require(['./views/web/video/detail.vue'], resolve)
        }, {
            path: '*',
            name: '404',
            meta: {
                title: '资源不存在'
            },
            component: (resolve) => require(['./views/error/404.vue'], resolve)
        }
    ]
}];

export default routers;
