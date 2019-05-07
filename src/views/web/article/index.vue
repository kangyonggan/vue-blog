<template>
    <div>
        <AppSearch/>

        <AppPanel :width="800" float="left">
            <ul class="tab-content">
                <li v-for="(article, index) in pageInfo.list" :key="index"
                    :class="{'no-border': index === pageInfo.pageSize - 1}">
                    <div class="left">
                        <router-link class="title" :to="getEncryptLink(article.articleId)">
                            <span class="big">阿</span>
                            <span>里员工都在用的知识管理工具，究竟有何特别？</span>
                        </router-link>
                        <div class="summary">4月25日，蚂蚁金服集团的官方技术帐号“蚂蚁金服科技”，专文介绍了语雀。
                            “中国日报中文网”等网络媒体也进行了转载，引起了很大的反响。
                        </div>
                        <div class="info">
                            <span>Linux</span>
                            <span>Java</span>

                            <em>2019-04-30 16:08</em>
                        </div>
                    </div>
                    <router-link class="right" :to="getEncryptLink(article.articleId)">
                        <img src="/src/assets/images/article.png">
                    </router-link>
                </li>
            </ul>
        </AppPanel>

        <AppPanel :width="380" float="right" title="站长推荐">
            <ul class="hot-content">
                <li v-for="(article, index) in pageInfo.list" :key="index"
                    :class="{'no-border': index === pageInfo.pageSize - 1}">
                    <span class="index">{{formatIndex(index)}}</span>
                    <div class="right">
                        <router-link :to="getEncryptLink(article.articleId)">阿里员工都在用的知识管理工具，究竟有何特别？</router-link>

                        <div class="info">
                            <span>Linux</span>
                            <span>Java</span>

                            <em>2019-04-30</em>
                        </div>
                    </div>
                </li>
            </ul>
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
                }
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
            formatIndex: function (index) {
                index++;
                return index < 10 ? '0' + index : index;
            }
        },
        mounted() {
            // 加载文章列表
            this.http.get('/article').then(res => {
                this.pageInfo = res.data.pageInfo;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../my-theme/custom";

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
                    span {
                        font-size: 20px;
                        font-weight: 500;
                        color: #262626;
                        cursor: pointer;
                        float: left;
                        line-height: 40px;
                    }

                    span.big {
                        font-size: 40px;
                    }
                }

                .summary {
                    clear: both;
                    margin-top: 8px;
                    color: #595959;
                    font-size: 14px;
                    line-height: 1.8;
                    min-height: 50px;
                }

                .info {
                    margin-top: 12px;
                    font-size: 12px;
                    color: #8c8c8c;

                    span {
                        cursor: pointer;
                        margin-right: 15px;
                    }

                    em {
                        float: right;
                    }
                }
            }

            .right {
                float: right;
                width: 190px;

                img {
                    width: 190px;
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
        padding: 8px;

        li {
            float: left;
            height: 60px;
            width: 364px;
            margin-top: 10px;
            border-bottom: 1px solid #d5d5d5;

            span.index {
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
                float: right;

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
                        cursor: pointer;
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
