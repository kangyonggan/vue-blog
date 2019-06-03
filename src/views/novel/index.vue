<template>
    <div>
        <AppSearch :activeTab="1"/>

        <AppPanel class="novels" v-if="novels.length">
            <ul>
                <li v-for="novel in novels" :key="novel.novelId">
                    <router-link :to="getEncryptLink(novel.novelId)">
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
                </li>
            </ul>
            <AppLoading :loading="!novels.length"/>
            <AppClear/>
        </AppPanel>

        <AppPanel class="allNovels">
            <ul>
                <li v-for="novel in AllNovels" :key="novel.novelId">
                    <div class="name">
                        <router-link :to="getEncryptLink(novel.novelId)">
                            《{{novel.name}}》
                        </router-link>
                    </div>
                    <div class="summary">{{novel.summary}}</div>
                    <div class="lastSection" v-if="novel.lastSectionId">
                        <router-link :to="getEncryptLink(novel.novelId, novel.lastSectionId)">
                            {{novel.lastSectionTitle}}
                        </router-link>
                        <span>
                            ({{dateFormat(novel.updatedTime, 'MM-dd HH:mm')}})
                        </span>
                    </div>
                    <div class="author">{{novel.author}}</div>
                    <AppClear/>
                </li>
            </ul>
            <AppLoading :loading="!AllNovels.length"/>
            <AppClear/>
        </AppPanel>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
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
            },
            init: function () {
                // 加载小说列表
                this.http.post('/novel').then(res => {
                    this.AllNovels = res.data.novels;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            loadNewNovels: function () {
                // 最新小说
                this.http.get('/novel/new').then(res => {
                    this.novels = res.data.novels;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.init();
            this.loadNewNovels();
        }
    };
</script>

<style scoped lang="less">
    @import "../../../my-theme/custom";

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
                    width: 550px;
                    color: #999;
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
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
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
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
