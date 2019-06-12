<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel class="novel">
            <div v-if="novel.novelId">
                <img v-if="novel.cover" :src="novel.cover"/>
                <img v-else src="/static/images/nocover.jpg"/>

                <div class="right">
                    <div class="name">
                        {{novel.name}}
                        <span>（{{getUpdateStatus()}}）</span>
                        <a @click="pullNovel">
                            更新
                            <Icon type="ios-cloud-download-outline"/>
                        </a>
                    </div>

                    <div class="info">
                        <div class="item">
                            作　　者：{{novel.author}}
                        </div>
                        <div class="item">
                            最新章节：
                            <router-link v-if="lastSection.sectionId"
                                         :to="getEncryptLink(novel.novelId, lastSection.sectionId)">{{lastSection.title}}
                            </router-link>
                            <span v-else>无</span>
                        </div>
                        <div class="item">
                            来　　源：<a :href="source" target="_blank">{{source}}</a>
                        </div>
                        <div class="item">
                            最后更新：{{dateFormat(novelQueue.createdTime || novel.updatedTime, 'yyyy-MM-dd HH:mm')}}
                        </div>

                        <AppClear/>
                    </div>

                    <div class="summary">
                        {{novel.summary}}
                    </div>

                </div>
            </div>

            <AppLoading :loading="!novel.novelId"/>
            <AppClear/>
        </AppPanel>

        <AppPanel class="sections" :title="'《' + novel.name + '》最新章节'" title-align="center">
            <ul>
                <li v-for="section in lastSections" :key="section.sectionId">
                    <router-link :to="getEncryptLink(novel.novelId, section.sectionId)">{{section.title}}</router-link>
                </li>
            </ul>
            <AppLoading :loading="!lastSections.length"/>

            <AppClear :height="20"/>
        </AppPanel>

        <AppPanel class="sections" :title="'《' + novel.name + '》全部章节列表'" title-align="center">
            <ul>
                <li v-for="section in sections" :key="section.sectionId">
                    <router-link :to="getEncryptLink(novel.novelId, section.sectionId)">{{section.title}}</router-link>
                </li>
            </ul>
            <AppLoading :loading="!sections.length"/>

            <AppClear/>
            <AppReward/>
            <AppClear :height="20"/>
        </AppPanel>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                novel: {
                    name: ''
                },
                source: '',
                lastSection: {},
                lastSections: [],
                sections: [],
                novelQueue: {},
                breadcrumbs: [{
                    name: '小说',
                    link: '/novel'
                }, {
                    name: ''
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
            getUpdateStatus: function () {
                if (!this.novelQueue.status) {
                    return '更新完成';
                } else if (this.novelQueue.status === 'Y') {
                    return '更新完成';
                } else if (this.novelQueue.status === 'I') {
                    return '更新中';
                } else if (this.novelQueue.status === 'N') {
                    return '待更新';
                }
            },
            pullNovel: function () {
                this.http.post('/novel/pull', {'novelId': this.novel.novelId}).then(() => {
                    this.success('已经加入更新队列，请稍后刷新查看');
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            init: function () {
                this.http.post('/novel/detail', {'novelId': Util.decrypt(this.$route.params.novelId)}).then(res => {
                    this.novel = res.data.novel;
                    this.novelQueue = res.data.novelQueue || {};
                    this.lastSection = res.data.lastSection || {};
                    this.lastSections = res.data.lastSections;
                    this.sections = res.data.sections;
                    this.source = res.data.source;
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
    @primary-color: #2d8cf0;

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

                a {
                    color: @primary-color;
                    font-size: 15px;
                    float: right;
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
