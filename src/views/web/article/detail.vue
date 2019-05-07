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
    let marked = require('marked');

    export default {
        data() {
            return {
                breadcrumbs: [{
                    name: '文章',
                    link: '/article'
                }, {
                    name: '前后分离的系统统一加解密'
                }],
                article: {}
            };
        },
        methods: {
            init: function () {
                this.http.post('/article', {'articleId': encodeURIComponent(this.$route.params.id)}).then(res => {
                    this.article = res.data.article;

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
        },
        watch: {
            '$route'() {
                this.init();
            }
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
