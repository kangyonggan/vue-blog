<template>
    <div>
        <AppSearch/>

        <AppPanel :width="800" float="left">
            <ul class="tab-content">
                <li v-for="(article, index) in pageInfo.list" :key="index"
                    :class="{'no-border': index === pageInfo.pageSize - 1}">
                    <div :class="{left: true, 'total-width': !hasImg(article.content)}">
                        <router-link class="title" :to="getEncryptLink(article.articleId)" :title="article.title">
                            <span class="big">{{article.title.substring(0, 1)}}</span>
                            <span class="small">{{article.title.substring(1)}}</span>
                        </router-link>
                        <div class="summary">{{article.summary}}</div>
                        <div class="info">
                            <span>
                                <Icon type="ios-flame" size="18"/>
                                <em>{{article.viewNum}}</em>
                            </span>

                            <em>
                                <Icon type="ios-clock-outline" size="18"/>
                                <span>{{dateFormat(article.createdTime, 'yyyy-MM-dd HH:mm')}}</span>
                            </em>
                        </div>
                    </div>
                    <router-link class="right" :to="getEncryptLink(article.articleId)" v-if="hasImg(article.content)">
                        <img :src="getFirstImg(article.content)">
                    </router-link>
                </li>
            </ul>
            <div v-if="!pageInfo.size" class="empty-result">
                没有相关文章
            </div>
            <div v-else>
                <AppPagination url="/article" :page-info="pageInfo"/>
            </div>
        </AppPanel>

        <AppPanel :width="380" float="right" title="大家都在看">
            <ul class="hot-content">
                <li v-for="(article, index) in articles" :key="index"
                    :class="{'no-border': index === articles.length - 1}">
                    <span class="index">{{formatIndex(index)}}</span>
                    <div class="right">
                        <router-link :to="getEncryptLink(article.articleId)" :title="article.title">
                            {{article.title}}
                        </router-link>

                        <div class="info">
                            <span>
                                <Icon type="ios-flame"/>
                                {{article.viewNum}}
                            </span>

                            <em>
                                <Icon type="ios-clock-outline"/>
                                {{dateFormat(article.createdTime, 'yyyy-MM-dd')}}
                            </em>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="!articles.length" class="empty-result">
                没有相关文章
            </div>
        </AppPanel>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                pageInfo: {
                    list: []
                },
                articles: []
            };
        },
        methods: {
            /**
             * 获取加密连接
             *
             * @param articleId
             * @returns {string}
             */
            getEncryptLink: function (articleId) {
                return '/article/' + Util.encryptUrl(articleId);
            },
            hasImg: function (content) {
                if (!content) {
                    return false;
                }
                console.log(content);
                console.log(content.indexOf('![](https') > -1);
                return content.indexOf('![](https') > -1;
            },
            getFirstImg: function (content) {
                let startIndex = content.indexOf('![](https');
                if (startIndex > -1) {
                    let endIndex = content.indexOf(')', startIndex);
                    return content.substring(startIndex + 4, endIndex);
                }
            },
            formatIndex: function (index) {
                index++;
                return index < 10 ? '0' + index : index;
            },
            init: function () {
                let pageNum = this.$route.query.pageNum;
                if (pageNum) {
                    pageNum = Util.decryptUrl(pageNum);
                } else {
                    pageNum = 1;
                }
                let key = this.$route.query.key;
                if (key) {
                    key = Util.decryptUrl(key);
                } else {
                    key = '';
                }

                // 加载文章列表
                this.http.post('/article', {pageNum: pageNum, key: key}).then(res => {
                    this.pageInfo = res.data.pageInfo;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            loadViewArticles: function () {
                // 大家都在看
                this.http.get('/article/view').then(res => {
                    this.articles = res.data.articles;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.init();

            this.loadViewArticles();
        },
        watch: {
            '$route'() {
                this.init();
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../../../my-theme/custom";

    .empty-result {
        text-align: center;
        color: #999;
        font-size: 15px;
        line-height: 120px;
    }

    ul.tab-content {
        list-style: none;
        margin: 0;
        clear: both;
        padding: 10px;

        li {
            float: left;
            width: 780px;
            margin-top: 10px;
            border-bottom: 1px solid #d5d5d5;

            .left {
                float: left;
                width: 570px;
                padding-left: 10px;

                .title {
                    span.small {
                        float: left;
                        display: inline-block;
                        width: 480px;
                        font-size: 20px;
                        font-weight: 500;
                        color: #262626;
                        cursor: pointer;
                        line-height: 55px;
                        height: 45px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: left;
                    }

                    span.big {
                        float: left;
                        font-size: 40px;
                    }
                }

                .summary {
                    clear: both;
                    color: #595959;
                    font-size: 14px;
                    height: 50px;
                    line-height: 25px;
                    overflow: hidden;
                }

                .info {
                    margin-top: 3px;
                    font-size: 12px;
                    color: #8c8c8c;

                    span {
                        float: right;
                        margin-right: 15px;

                        em {
                            display: inline-block;
                            line-height: 20px;
                            margin-left: 5px;
                            float: right;
                        }
                    }

                    em {
                        float: left;

                        span {
                            display: inline-block;
                            line-height: 20px;
                            margin-left: 5px;
                        }
                    }
                }
            }

            .total-width {
                width: 760px;
            }

            .right {
                float: right;
                width: 190px;

                img {
                    width: 190px;
                    max-height: 130px;
                    cursor: pointer;
                }
            }
        }

        li.no-border {
            border-bottom: 1px solid #fff;
        }
    }

    ul.hot-content {
        list-style: none;
        margin: 0;
        padding: 10px;

        li {
            float: left;
            height: 65px;
            width: 364px;
            margin-top: 10px;
            border-bottom: 1px solid #d5d5d5;

            span.index {
                float: left;
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 24px;
                font-weight: 400;
                color: #e0e0e0;
                margin-right: 5px;
            }

            div.right {
                width: 304px;
                float: left;

                a {
                    display: block;
                    font-size: 14px;
                    font-weight: 400;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .info {
                    margin-top: 12px;
                    font-size: 12px;
                    color: #8c8c8c;

                    span {
                        margin-right: 15px;
                    }

                    em {
                        float: right;
                    }
                }
            }
        }

        li.no-border {
            border-bottom: 1px solid #fff;
        }
    }
</style>
