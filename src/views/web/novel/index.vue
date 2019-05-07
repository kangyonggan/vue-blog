<template>
    <div>
        <AppSearch :activeTab="1"/>

        <AppPanel class="novels">
            <ul>
                <li v-for="novel in novels" :key="novel.novelId">
                    <router-link :to="getEncryptLink(novel.novelId)">
                        <img v-if="novel.cover" :src="baseUrl + '/' + novel.cover"/>
                        <img v-if="!novel.cover" src="/src/assets/images/nocover.jpg"/>
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
                </li>
            </ul>
            <AppClear/>
        </AppPanel>

        <AppPanel class="allNovels" title="最近更新的小说列表">
            <ul>
                <li v-for="novel in AllNovels" :key="novel.novelId">
                    <div class="name">
                        <router-link :to="getEncryptLink(novel.novelId)">
                            《{{novel.name}}》
                        </router-link>
                    </div>
                    <div class="summary">{{novel.summary}}</div>
                    <div class="lastSection">
                        <router-link :to="getEncryptLink(novel.novelId, novel.lastSectionId)">
                            {{novel.lastSectionTitle}}
                        </router-link>
                        <span>
                            (05-07 13:25)
                        </span>
                    </div>
                    <div class="author">{{novel.author}}</div>
                    <AppClear/>
                </li>
            </ul>
            <AppClear/>
        </AppPanel>
    </div>
</template>

<script>
    import Util from '@/libs/util';
    import Config from '@/config/config';

    export default {
        data() {
            return {
                baseUrl: Config.baseUrl,
                novels: [],
                AllNovels: []
            };
        },
        methods: {
            /**
             * 获取加密连接
             *
             * @param novelId
             * @param sectionId
             * @returns {string}
             */
            getEncryptLink: function (novelId, sectionId) {
                let url = '/novel/' + Util.encryptUrl(novelId);
                if (sectionId) {
                    url += '/' + Util.encryptUrl(sectionId);
                }
                return url;
            }
        },
        mounted() {
            // 加载小说列表
            this.http.get('/novel').then(res => {
                this.novels = res.data.novels;
                this.AllNovels = res.data.AllNovels;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../my-theme/custom";

    .novels {
        padding: 20px;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                float: left;
                width: 400px;
                margin-top: 20px;

                img {
                    float: left;
                    width: 100px;
                    height: 125px;
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(221, 221, 221);
                    border-image: initial;
                    padding: 1px;
                    background: rgb(255, 255, 255);
                }

                .info {
                    float: left;
                    width: 260px;
                    margin-left: 10px;

                    .top {
                        height: 25px;
                        font-size: 14px;
                        border-bottom: 1px solid @primary-color;

                        .name {
                            float: left;
                            font-weight: 700;
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
    }

    .allNovels {
        margin-top: 20px;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                font-size: 14px;
                line-height: 35px;
                padding: 0 15px;
                border-bottom: 1px dashed #ccc;
                margin-top: 8px;

                .name {
                    float: left;
                    width: 150px;
                    overflow: hidden;

                    a {
                        color: @primary-color;
                    }
                }

                .summary {
                    float: left;
                    width: 480px;
                    color: #999;
                    font-size: 13px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }

                .lastSection {
                    float: left;
                    width: 400px;
                    margin-left: 30px;
                    overflow: hidden;

                    a {
                        float: left;
                        display: inline-block;
                        max-width: 310px;
                        color: @primary-color;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }

                    span {
                        float: left;
                        display: inline-block;
                        color: #999;
                    }
                }

                .author {
                    float: right;
                    color: #999;
                    font-size: 13px;
                }
            }

            li:last-child {
                border-bottom: none;
            }
        }
    }
</style>
