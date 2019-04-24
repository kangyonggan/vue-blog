<template>
    <div>
        <AppPanel :width="800" float="left">
            <ul>
                <li v-for="article in pageInfo.list" :key="article.articleId">
                    <router-link :to="getEncryptLink(article.articleId)">{{article.title}}</router-link>
                </li>
            </ul>
        </AppPanel>
        <AppPanel :width="380" float="right">
            xxx
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
                return 'article/' + Util.encryptUrl(articleId);
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

</style>
