function layout(resolve) {
    return require(['./views/layout/index.vue'], resolve);
}

const routers = [{
    path: '/',
    redirect: '/index',
    component: (resolve) => layout(resolve),
    children: [
        {
            path: '',
            name: 'index',
            component: (resolve) => require(['./views/default/index.vue'], resolve)
        }, {
            path: 'novel',
            name: 'novel',
            component: (resolve) => require(['./views/enjoy/novel/index.vue'], resolve)
        }, {
            path: 'music',
            name: 'music',
            component: (resolve) => require(['./views/enjoy/music/index.vue'], resolve)
        }, {
            path: 'video',
            name: 'video',
            component: (resolve) => require(['./views/enjoy/video/index.vue'], resolve)
        }, {
            path: 'album',
            name: 'album',
            component: (resolve) => require(['./views/enjoy/album/index.vue'], resolve)
        }, {
            path: '*',
            name: '404',
            meta: {
                title: '404'
            },
            component: (resolve) => require(['./views/error/404.vue'], resolve)
        }
    ]
}];

export default routers;
