<template>
    <ul class="tools">
        <li>
            <router-link :to="getEncryptLink(novel.novelId, prevSection.sectionId)" v-if="prevSection.sectionId">
                <Icon type="ios-arrow-back"/>
                上一章
            </router-link>
            <a  v-if="!prevSection.sectionId">
                没有上一章了
            </a>
        </li>
        <li style="text-align: center">
            <router-link :to="getEncryptLink(novel.novelId)">
                章节列表
            </router-link>
        </li>
        <li style="text-align: right">
            <router-link :to="getEncryptLink(novel.novelId, nextSection.sectionId)" v-if="nextSection.sectionId">
                下一章
                <Icon type="ios-arrow-forward"/>
            </router-link>
            <a v-if="!nextSection.sectionId">
                更新
                <Icon type="ios-cloud-download-outline"/>
            </a>
        </li>
    </ul>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        props: {
            novel: {
                type: Object
            },
            prevSection: {
                type: Object
            },
            nextSection: {
                type: Object
            }
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
        }
    };
</script>

<style scoped lang="less">
    .tools {
        background: #fff;
        padding: 8px;
        list-style: none;
        margin: 0;
        height: 40px;

        li {
            float: left;
            width: 33%;

            a {
                font-size: 14px;
            }
        }
    }
</style>
