<template>
    <AppPanel class="detail">
        <div class="title">{{article.title}}</div>

        <div id="articleDetail">
            <VueMarkdown :source="article.content" @rendered="rendered"></VueMarkdown>
        </div>
    </AppPanel>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/googlecode.css';

    export default {
        components: {VueMarkdown},
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

                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            rendered: function (content) {
                // console.log(content);
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
        font-size: 36px;
        line-height: 1.389;
        font-weight: 700;
        color: #262626;
    }
</style>
