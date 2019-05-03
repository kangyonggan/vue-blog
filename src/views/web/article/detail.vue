<template>
    <AppPanel class="detail">
        <div class="title">{{article.title}}</div>

        <div id="articleDetail">
            <textarea v-model="article.content"></textarea>
        </div>
    </AppPanel>
</template>

<script>
    import $script from 'scriptjs';

    export default {
        data() {
            return {
                editorPath: '/editor.md',
                article: {}
            };
        },
        methods: {
            init: function () {
                this.http.post('article', {'articleId': encodeURIComponent(this.$route.params.id)}).then(res => {
                    this.article = res.data.article;

                    $script([
                        `${this.editorPath}/examples/js/jquery.min.js`,
                        `${this.editorPath}/lib/marked.min.js`,
                        `${this.editorPath}/lib/prettify.min.js`,
                        `${this.editorPath}/lib/raphael.min.js`,
                        `${this.editorPath}/lib/underscore.min.js`,
                    ], () => {
                        console.log('finish load js');
                    });

                }).catch(res => {
                    this.error(res.respMsg);
                });
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
    .detail {
        padding: 20px;
    }

    .title {
        text-align: center;
        font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 36px;
        line-height: 1.389;
        font-weight: 700;
        color: #262626;
    }
</style>
