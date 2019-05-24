<template>
    <ul class="pagination" v-if="pageInfo.list && pageInfo.pages > 1">
        <li v-if="pageInfo.hasPreviousPage">
            <router-link :to="url + 'pageNum=' + getData('1') + '&' + params" title="首页">
                首
            </router-link>
        </li>
        <li v-if="pageInfo.hasPreviousPage">
            <router-link :to="url + 'pageNum=' + getData(pageInfo.prePage) + '&' + params" title="上一页">
                上
            </router-link>
        </li>

        <li :class="{active: nav === pageInfo.pageNum}" v-for="nav in pageInfo.navigatepageNums" :key="nav">
            <a href="javascript:" v-if="nav === pageInfo.pageNum">{{nav}}</a>
            <router-link v-else :to="url + 'pageNum=' + getData(nav) + '&' + params">{{nav}}</router-link>
        </li>

        <li v-if="pageInfo.hasNextPage">
            <router-link :to="url + 'pageNum=' + getData(pageInfo.nextPage) + '&' + params" title="下一页">
                下
            </router-link>
        </li>
        <li v-if="pageInfo.hasNextPage">
            <router-link :to="url + 'pageNum=' + getData(pageInfo.pages) + '&' + params" title="尾页">
                尾
            </router-link>
        </li>
    </ul>
</template>

<script>
    import Vue from 'vue';
    import Util from '@/libs/util';

    const AppPagination = {
        props: {
            url: {
                required: true,
                type: String
            },
            params: {
                required: false,
                type: String,
                default: ''
            },
            pageInfo: {
                required: true,
                type: Object
            }
        },
        methods: {
            /**
             * 获取加密数据
             *
             * @param data
             * @returns {string}
             */
            getData: function (data) {
                return Util.encryptUrl(data);
            }
        }
    };

    export default AppPagination;

    Vue.component('AppPagination', AppPagination);
</script>

<style scoped lang="less">
    .pagination {
        clear: both;
        float: left;
        list-style: none;
        margin: 18px;
        height: 45px;
        line-height: 45px;

        li {
            float: left;

            a {
                display: inline-block;
                height: 34px;
                line-height: 34px;
                width: 34px;
                border: 1px solid #ddd;
                color: #595959;
                margin-right: 5px;
                text-align: center;
                text-decoration: none;
            }

            a:hover {
                text-decoration: none;
                background: #f5f5f5;
            }
        }

        li.active a {
            border: 0;
            cursor: default;
        }

        li.active a:hover {
            background: #fff;
        }
    }
</style>
