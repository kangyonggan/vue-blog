<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel class="detail">
            <div class="title">{{article.title}}</div>

            <AppLoading :loading="!article.title"/>

            <div id="markdown-content" v-html="compiledMarkdown"></div>

            <AppReward/>
        </AppPanel>
    </div>
</template>

<script>
    import Util from '@/libs/util';
    import $ from "jquery";
    window.jQuery = $;
    require('../../libs/zoomer.js');

    let marked = require('marked');

    export default {
        data() {
            return {
                breadcrumbs: [{
                    name: '文章',
                    link: '/article'
                }, {
                    name: ''
                }],
                loading: true,
                article: {}
            };
        },
        methods: {
            init: function () {
                this.http.post('/article/detail', {'articleId': Util.decrypt(this.$route.params.articleId)}).then(res => {
                    this.article = res.data.article;
                    Util.title(this.article.title);
                    this.breadcrumbs[1].name = this.article.title;

                    this.$nextTick(() => {
                        $('#markdown-content').zoomer();
                    });
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
                let html = marked(content);

                this.$nextTick(() => {
                    let allLinks = document.getElementById('markdown-content').querySelectorAll('a');
                    allLinks.forEach((e) => {
                        e.setAttribute('target', '_blank');
                    })
                });

                return html;
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style lang="less">
    @import "../../../my-theme/custom";

    .detail {
        clear: both;
        padding: 20px;

        img {
            max-width: 100%;
        }

        a {
            color: @primary-color;
        }

        h1, h2, h3, h4, h5, h6 {
            margin-bottom: 15px;
            margin-top: 20px;
        }

        p {
            line-height: 28px;
        }

        ul {
            list-style: disc;
            padding-left: 55px;
        }

        ol {
            list-style: decimal;
            padding-left: 55px;
        }

        ul li, ol li {
            line-height: 28px;
        }

        pre {
            padding: 10px;
            background: #000;

            code {
                color: #fff;
            }
        }

        hr {
            margin: 20px 0;
        }

        code {
            color: @primary-color;
        }

        blockquote {
            border-left: 5px solid @primary-color;
            padding-left: 20px;
        }

        table {
            width: 100%;
            border: 1px solid #ddd;
            border-spacing: 0;

            th {
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                text-align: center;
                border-bottom: 1px solid #ddd;
                background: #f5f5f5;
                color: #595959;
            }

            td {
                height: 35px;
                line-height: 35px;
                font-size: 13px;
                text-align: center;
                border-bottom: 1px solid #ddd;
                color: #595959;
            }

            tr:nth-child(even) td {
                background: #f5f5f5;
            }

        }
    }

    .title {
        text-align: center;
        font-size: 36px;
        line-height: 1.389;
        font-weight: 700;
        color: #262626;
    }

</style>
