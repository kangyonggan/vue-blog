<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel class="novel">
            <img v-if="novel.cover" :src="baseUrl + '/' + novel.cover"/>
            <img v-if="!novel.cover" src="/src/assets/images/nocover.jpg"/>

            <div class="right">
                <div class="name">
                    {{novel.name}}
                    <span>（更新完成）</span>
                </div>

                <div class="info">
                    <div class="item">
                        作　　者：{{novel.author}}
                    </div>
                    <div class="item">
                        最新章节：
                        <router-link :to="getEncryptLink(novel.novelId, novel.lastSectionId)">{{novel.lastSectionTitle}}</router-link>
                    </div>
                    <div class="item">
                        来　　源：<a href="http://biquge.cn" target="_blank">http://biquge.cn</a>
                    </div>
                    <div class="item">
                        最后更新：2019-05-07 07:19:40
                    </div>

                    <AppClear/>
                </div>

                <div class="summary">
                    {{novel.summary}}
                </div>

            </div>

            <AppClear/>
        </AppPanel>

        <AppPanel class="sections" :title="'《' + novel.name + '》最新章节'" title-align="center">
            <ul>
                <li v-for="section in lastSections" :key="section.sectionId">
                    <router-link :to="getEncryptLink(novel.novelId, section.sectionId)">{{section.title}}</router-link>
                </li>
            </ul>

            <AppClear :height="20"/>
        </AppPanel>

        <AppPanel class="sections" :title="'《' + novel.name + '》全部章节列表'" title-align="center">
            <ul>
                <li v-for="section in sections" :key="section.sectionId">
                    <router-link :to="getEncryptLink(novel.novelId, section.sectionId)">{{section.title}}</router-link>
                </li>
            </ul>

            <AppClear/>
            <AppReward/>
            <AppClear :height="20"/>
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
                novel: {
                    name: '加载中'
                },
                lastSections: [],
                sections: [],
                novelQueue: {},
                breadcrumbs: [{
                    name: '小说',
                    link: '/novel'
                }, {
                    name: '加载中'
                }]
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
                this.http.post('/novel', {'novelId': encodeURIComponent(this.$route.params.novelId)}).then(res => {
                    this.novel = res.data.novel;
                    this.novelQueue = res.data.novelQueue;
                    this.lastSections = res.data.lastSections;
                    this.sections = res.data.sections;
                    this.breadcrumbs[1].name = this.novel.name;
                    Util.title(this.novel.name);
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../my-theme/custom";

    .novel {
        padding: 10px;

        img {
            float: left;
            width: 128px;
            height: 158px;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(221, 221, 221);
            border-image: initial;
            padding: 1px;
            background: rgb(255, 255, 255);
        }

        .right {
            float: left;
            width: 1000px;
            margin-left: 20px;

            .name {
                font-size: 18px;
                font-weight: 700;
                color: #333;

                span {
                    font-size: 14px;
                    color: @primary-color;
                }
            }

            .info {
                margin-top: 8px;
                font-size: 14px;

                .item {
                    float: left;
                    width: 500px;
                    line-height: 25px;

                    a {
                        color: @primary-color;
                    }
                }
            }

            .summary {
                border-top: 1px solid #d5d5d5;
                padding-top: 8px;
                margin-top: 5px;
                font-size: 13px;
                clear: both;
                height: 70px;
                overflow: hidden;
            }
        }
    }

    .sections {
        margin-top: 20px;

        ul {
            list-style: none;
            margin: 0;
            padding: 10px 0 0 0;

            li {
                float: left;
                width: 33%;
                border-bottom: 1px dashed #d5d5d5;

                a {
                    color: #333;
                    text-decoration: none;
                    line-height: 32px;
                    margin-left: 10px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
