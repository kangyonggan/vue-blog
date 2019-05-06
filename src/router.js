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
            path: 'article/:id',
            name: 'articleDetail',
            meta: {
                title: '文章详情'
            },
            component: (resolve) => require(['./views/web/article/detail.vue'], resolve)
        }, {
            path: 'novel',
            name: 'novel',
            meta: {
                title: '小时'
            },
            component: (resolve) => require(['./views/web/novel/index.vue'], resolve)
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
