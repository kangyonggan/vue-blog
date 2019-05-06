<template>
    <ul class="breadcrumb">
        <li class="name">当前位置：</li>
        <li>
            <router-link to="/">首页</router-link>
        </li>
        <li v-for="item in list" :key="item.name">
            <span v-if="!item.link">{{item.name}}</span>
            <router-link v-if="item.link" :to="item.link">{{item.name}}</router-link>
        </li>
    </ul>
</template>

<script>
    import Vue from 'vue';

    const AppBreadcrumb = {
        props: {
            list: {
                required: true,
                type: Array
            }
        }
    };

    export default AppBreadcrumb;

    Vue.component('AppBreadcrumb', AppBreadcrumb);
</script>

<style scoped lang="less">
    @import "../../my-theme/custom";

    .breadcrumb {
        list-style: none;
        margin: 0 0 20px 0;
        background: #fff;
        height: 45px;

        li.name {
            font-weight: 700;
        }

        li {
            float: left;
            line-height: 45px;
            margin-left: 10px;
            font-size: 13px;

            a {
                color: @primary-color;
            }

            a:after {
                margin-left: 10px;
                content: '>';
            }
        }
    }
</style>
