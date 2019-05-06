<template>
    <AppPanel class="detail">
        <div class="title">{{article.title}}</div>

        <div v-html="compiledMarkdown"></div>
    </AppPanel>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/googlecode.css';
    let marked = require('marked');

    export default {
        data() {
            return {
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
            }
        },
        computed: {
            compiledMarkdown: function () {
                let content = this.article.content;
                if (!content) {
                    return '';
                }
                return marked(content, {
                    highlight: function (code, lang) {
                        if (code) {
                            console.log(code);
                            return hljs.highlightBlock(code);
                        } else {
                            return '';
                        }
                    }
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
        font-size: 36px;
        line-height: 1.389;
        font-weight: 700;
        color: #262626;
    }
</style>
