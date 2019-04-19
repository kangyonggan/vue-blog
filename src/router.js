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
