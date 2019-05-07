<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

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
                section: {},
                prevSection: {},
                nextSection: {},
                breadcrumbs: [{
                    name: '小说',
                    link: '/novel'
                }, {
                    name: '小说详情',
                    link: ''
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
                this.http.post('/section', {
                    'novelId': encodeURIComponent(this.$route.params.novelId),
                    'sectionId': encodeURIComponent(this.$route.params.sectionId),
                }).then(res => {
                    this.novel = res.data.novel;
                    this.section = res.data.section;
                    this.prevSection = res.data.prevSection;
                    this.nextSection = res.data.nextSection;

                    this.breadcrumbs[1].name = this.novel.name;
                    this.breadcrumbs[1].link = '/novel/' + Util.encryptUrl(this.novel.novelId);
                    this.breadcrumbs[2].name = this.section.title;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            '$route'() {
                this.init();
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../../../../my-theme/custom";

</style>
