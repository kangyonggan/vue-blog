<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel class="detail">
            <div class="title">{{article.title}}</div>

            <div v-html="compiledMarkdown"></div>

            <AppReward/>
        </AppPanel>
    </div>
</template>

<script>
    import Util from '@/libs/util';
    let marked = require('marked');

    export default {
        data() {
            return {
                breadcrumbs: [{
                    name: '文章',
                    link: '/article'
                }, {
                    name: '加载中'
                }],
                article: {}
            };
        },
        methods: {
            init: function () {
                this.http.post('/article/detail', {'articleId': Util.decrypt(this.$route.params.articleId)}).then(res => {
                    this.article = res.data.article;
                    Util.title(this.article.title);
                    this.breadcrumbs[1].name = this.article.title;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        computed: {
            compiledMarkdown: function () {
                let content = this.article.content;
                if (!content) {
                    return '';
                }
                return marked(content);
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../my-theme/custom";

    .detail {
        clear: both;
        padding: 20px;
    }

    .title {
        text-align: center;
        font-size: 36px;
        line-height: 1.389;
        font-weight: 700;
        color: #262626;
    }

</style>
