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
            component: (resolve) => require(['./views/index.vue'], resolve)
        }, {
            path: 'article',
            name: 'article',
            meta: {
                title: '文章'
            },
            component: (resolve) => require(['./views/article/index.vue'], resolve)
        }, {
            path: 'article/:articleId',
            name: 'articleDetail',
            meta: {
                title: '文章详情'
            },
            component: (resolve) => require(['./views/article/detail.vue'], resolve)
        }, {
            path: 'novel',
            name: 'novel',
            meta: {
                title: '小说'
            },
            component: (resolve) => require(['./views/novel/index.vue'], resolve)
        }, {
            path: 'novel/:novelId',
            name: 'novelDetail',
            meta: {
                title: '小说详情'
            },
            component: (resolve) => require(['./views/novel/detail.vue'], resolve)
        }, {
            path: 'novel/:novelId/:sectionId',
            name: 'novelSection',
            meta: {
                title: '小说章节'
            },
            component: (resolve) => require(['./views/novel/section.vue'], resolve)
        }, {
            path: 'album',
            name: 'album',
            meta: {
                title: '相册'
            },
            component: (resolve) => require(['./views/album/index.vue'], resolve)
        }, {
            path: 'album/:albumId',
            name: 'albumDetail',
            meta: {
                title: '相册详情'
            },
            component: (resolve) => require(['./views/album/detail.vue'], resolve)
        }, {
            path: 'video',
            name: 'video',
            meta: {
                title: '视频'
            },
            component: (resolve) => require(['./views/video/index.vue'], resolve)
        }, {
            path: 'video/:videoId',
            name: 'videoDetail',
            meta: {
                title: '视频详情'
            },
            component: (resolve) => require(['./views/video/detail.vue'], resolve)
        }, {
            path: 'tools',
            name: 'tools',
            meta: {
                title: '工具'
            },
            component: (resolve) => require(['./views/tools/index.vue'], resolve)
        }, {
            path: 'tools/json',
            name: 'toolsJson',
            meta: {
                title: 'JSON格式化'
            },
            component: (resolve) => require(['./views/tools/toolsJson.vue'], resolve)
        }, {
            path: 'tools/sql',
            name: 'toolsSQL',
            meta: {
                title: 'SQL格式化'
            },
            component: (resolve) => require(['./views/tools/toolsSQL.vue'], resolve)
        }, {
            path: 'tools/xml',
            name: 'toolsXml',
            meta: {
                title: 'XML格式化'
            },
            component: (resolve) => require(['./views/tools/toolsXml.vue'], resolve)
        }, {
            path: 'tools/thumb',
            name: 'toolsThumb',
            meta: {
                title: '生成缩略图'
            },
            component: (resolve) => require(['./views/tools/toolsThumb.vue'], resolve)
        }, {
            path: 'game',
            name: 'game',
            meta: {
                title: '游戏'
            },
            component: (resolve) => require(['./views/game/index.vue'], resolve)
        }, {
            path: '*',
            name: '404',
            meta: {
                title: '资源不存在'
            },
            component: (resolve) => require(['./views/404.vue'], resolve)
        }
    ]
}];

export default routers;
