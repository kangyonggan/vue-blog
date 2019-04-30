<template>
    <div>
        <AppSearch/>

        <div class="tabs">
            <ul class="tab-header">
                <li v-for="(tab, index) in tabs" :key="index" @click="activeTab" :class="{'active':index===0}">
                    {{tab.text}}
                </li>
            </ul>
            <ul class="tab-content">
                <li v-for="(article, index) in pageInfo.list" :key="index"
                    :class="{'no-border': index === pageInfo.pageSize - 1}">
                    <div class="left">
                        <div class="title">阿里员工都在用的知识管理工具，究竟有何特别？</div>
                        <div class="summary">4月25日，蚂蚁金服集团的官方技术帐号“蚂蚁金服科技”，专文介绍了语雀。
                            “中国日报中文网”等网络媒体也进行了转载，引起了很大的反响。
                        </div>
                        <div class="info">
                            <span>Linux</span>
                            <span>Java</span>

                            <em>2019-04-30 16:08</em>
                        </div>
                    </div>
                    <div class="right">
                        <img src="/src/assets/images/article.png">
                    </div>
                </li>
            </ul>
        </div>

        <div class="tabs" style="width: 380px;float: right">
            <ul class="tab-header">
                <li class="active">
                    站长推荐
                </li>
            </ul>
            <ul class="hot-content">
                <li v-for="(article, index) in pageInfo.list" :key="index"
                    :class="{'no-border': index === pageInfo.pageSize - 1}">
                    <span class="index">{{formatIndex(index)}}</span>
                    <div class="right">
                        <a>阿里员工都在用的知识管理工具，究竟有何特别？</a>

                        <div class="info">
                            <span>Linux</span>
                            <span>Java</span>

                            <em>2019-04-30</em>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                tabs: [{
                    text: '后台'
                }, {
                    text: '前端'
                }, {
                    text: '数据库'
                }, {
                    text: '安装配置'
                }, {
                    text: '综合'
                }],
                pageInfo: {
                    list: []
                }
            };
        },
        methods: {
            /**
             * 激活Tab页
             *
             * @param e
             */
            activeTab: function (e) {
                let parent = e.target.parentNode;

                let currIndex = 0;
                for (let i = 0; i < parent.children.length; i++) {
                    if (parent.children[i] === e.target) {
                        currIndex = i;
                    }
                    parent.children[i].setAttribute('class', '');
                }

                e.target.setAttribute('class', 'active');
            },
            /**
             * 获取加密连接
             *
             * @param articleId
             * @returns {string}
             */
            getEncryptLink: function (articleId) {
                return 'article/' + Util.encryptUrl(articleId);
            },
            formatIndex: function (index) {
                index++;
                return index < 10 ? '0' + index : index;
            }
        },
        mounted() {
            // 加载文章列表
            this.http.get('article').then(res => {
                this.pageInfo = res.data.pageInfo;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../my-theme/custom";

    .tabs {
        width: 800px;
        float: left;
        background: #fff;

        ul.tab-header {
            list-style: none;
            margin: 0;
            padding: 0;
            border-top: 1px solid #d5d5d5;

            li {
                background: #fafafa;
                float: left;
                width: 160px;
                height: 68px;
                font-size: 15px;
                line-height: 68px;
                text-align: center;
                color: #424242;
                border-top: 3px solid #fafafa;
                cursor: pointer;
            }

            li.active {
                background: #fff;
                border-top: 3px solid @primary-color;
                color: #000;
            }
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
                        font-size: 20px;
                        font-weight: 500;
                        color: #262626;
                        cursor: pointer;
                    }

                    .summary {
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
    }
</style>
