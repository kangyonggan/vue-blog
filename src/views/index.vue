<template>
    <div>
        <div class="photos" id="photos">
            <img v-for="(photo, index) in photos" :key="index" :src="photo.thumb" @click="showImg(index)"
                 @mouseenter="clearInterval()" @mouseleave="startInterval()"/>
        </div>

        <div class="block">
            <h1 class="title">文 章</h1>
            <div class="summary">
                当你去教别人时，你的大脑会更有逻辑。不要吝啬于分享，在这种情况下，教别人是你最好的学习方法
            </div>
            <div class="articles">
                <router-link :to="getArticleLink(article.articleId)" class="article" v-for="article in articles"
                             :key="article.articleId">
                    <div class="article-title">
                        {{article.title}}
                    </div>
                    <div class="split"></div>
                    <div class="article-summary">
                        {{article.summary}}
                    </div>
                </router-link>
                <div v-if="articles.length" class="more">
                    <router-link to="/article">
                        查看更多
                    </router-link>
                </div>

                <AppLoading :loading="!articles.length"/>
                <AppClear/>
            </div>
        </div>

        <div class="block">
            <h1 class="title">小 说</h1>
            <div class="summary">
                寡人唯一的阅读爱好就是看小说了，本站小说源自各大网站，仅供学习交流使用
            </div>
            <div class="novels">
                <div v-for="novel in novels" :key="novel.novelId" class="novel">
                    <router-link :to="getNovelLink(novel.novelId)">
                        <img v-if="novel.cover" :src="novel.cover"/>
                        <img v-else src="/static/images/nocover.jpg"/>
                    </router-link>
                    <div class="info">
                        <div class="top">
                            <div class="name">{{novel.name}}</div>
                            <div class="author">{{novel.author}}</div>
                        </div>
                        <div class="summary">
                            {{novel.summary}}
                        </div>
                    </div>
                </div>
                <div v-if="novels.length" class="more">
                    <router-link to="/novel">
                        查看更多
                    </router-link>
                </div>
                <AppLoading :loading="!novels.length"/>
                <AppClear/>
            </div>
        </div>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                articles: [],
                index: 1,
                interval: null,
                novels: [],
                photos: [{
                    thumb: '/static/images/photos/1.jpeg'
                }, {
                    thumb: '/static/images/photos/2.jpeg'
                }, {
                    thumb: '/static/images/photos/3.jpeg'
                }, {
                    thumb: '/static/images/photos/4.jpeg'
                }, {
                    thumb: '/static/images/photos/5.jpeg'
                }, {
                    thumb: '/static/images/photos/6.jpeg'
                }, {
                    thumb: '/static/images/photos/7.jpeg'
                }, {
                    thumb: '/static/images/photos/8.jpeg'
                }]
            };
        },
        methods: {
            /**
             * 获取文章加密连接
             *
             * @param articleId
             * @returns {string}
             */
            getArticleLink: function (articleId) {
                return '/article/' + Util.encryptUrl(articleId);
            },
            /**
             * 获取小说加密连接
             *
             * @param novelId
             * @returns {string}
             */
            getNovelLink: function (novelId) {
                return '/novel/' + Util.encryptUrl(novelId);
            },
            showImg: function (index) {
                this.index = index;
                // 获取图片数组
                let photos = document.getElementById('photos');
                let images = photos.getElementsByTagName('img');
                let offset = (images.length - index) % images.length;
                // 计算每张图片按Y轴旋转的角度
                let deg = Math.floor(360 / images.length);
                for (let i = 0; i < images.length; i++) {
                    images[i].style = 'transform: rotateX(-15deg) rotateY(' + deg * (i + offset) + 'deg) translateZ(380px);';
                }
            },
            clearInterval: function () {
                clearInterval(this.interval);
            },
            startInterval: function () {
                this.clearInterval();
                let that = this;
                this.interval = setInterval(function () {
                    that.index += 1;
                    if (that.index >= that.photos.length) {
                        that.index = 0;
                    }

                    that.showImg(that.index);
                }, 2000);
            }
        },
        mounted() {
            // 加载文章列表
            this.http.get('/articles').then(res => {
                this.articles = res.data.articles;
            }).catch(res => {
                this.error(res.respMsg);
            });
            // 加载小说列表
            this.http.get('/novels').then(res => {
                this.novels = res.data.novels;
            }).catch(res => {
                this.error(res.respMsg);
            });

            this.showImg(this.index);
            this.startInterval();
        },
        destroyed() {
            this.clearInterval();
        }
    };
</script>

<style scoped lang="less">
    @primary-color: #2d8cf0;

    .block {
        margin-bottom: 30px;
        width: 100%;
        padding: 10px;
        clear: both;
        background: #fff;

        .more {
            clear: both;
            text-align: center;
            padding-top: 30px;

            a {
                font-size: 14px;
                color: @primary-color;
            }
        }

        .title {
            color: #000;
            text-align: center;
            line-height: 50px;
            width: 100px;
            margin: 0 auto;
            border-bottom: 4px solid @primary-color;
        }

        .summary {
            text-align: center;
            margin-top: 15px;
            color: #595959;
        }
    }

    .articles {
        padding-bottom: 30px;

        .article:hover {
            border-top: 4px solid @primary-color;
            box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.1);
        }

        .article {
            height: 230px;
            width: 390px;
            float: left;
            border: 1px solid #e9e9e9;
            border-top: 4px solid #e9e9e9;
            background: #f9f9f9;
            margin-left: 8px;
            margin-right: 8px;
            margin-top: 30px;
            overflow: hidden;

            &-title {
                font-weight: 700;
                color: #333;
                font-size: 18px;
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin-top: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }

            .split {
                width: 100px;
                height: 2px;
                margin: 0 auto;
                background: #e9e9e9;
                margin-top: 15px;
            }

            &-summary {
                margin-top: 5px;
                padding: 15px;
                line-height: 2;
                color: #595959;
            }
        }
    }

    .novels {
        height: 485px;

        .novel:hover {
            border-top: 4px solid @primary-color;
            box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.1);
        }

        .novel {
            height: 170px;
            width: 390px;
            padding: 8px;
            float: left;
            border: 1px solid #e9e9e9;
            border-top: 4px solid #e9e9e9;
            background: #f9f9f9;
            margin-left: 8px;
            margin-right: 8px;
            margin-top: 30px;
            overflow: hidden;

            img {
                float: left;
                width: 120px;
                height: 150px;
                border-width: 1px;
                border-style: solid;
                border-color: rgb(221, 221, 221);
                border-image: initial;
                padding: 1px;
                background: rgb(255, 255, 255);
            }

            .info {
                float: left;
                width: 230px;
                margin-left: 10px;

                .top {
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    border-bottom: 1px solid @primary-color;

                    .name {
                        float: left;
                        font-weight: 700;
                        font-size: 16px;
                        color: #333;
                    }

                    .author {
                        float: right;
                    }
                }

                .summary {
                    margin-top: 5px;
                    font-size: 13px;
                    clear: both;
                    height: 95px;
                    overflow: hidden;
                }
            }

        }
    }


    .photos {
        margin: 60px auto 260px auto;
        height: 204px;
        width: 300px;
        position: relative;
        transform-style: preserve-3d;
        perspective: 800px;

        img {
            height: 180px;
            position: absolute;
            cursor: pointer;
            box-shadow: 1px -1px 6px #666;
            border-radius: 4px;
            transition: transform 1s;
        }

    }

</style>
