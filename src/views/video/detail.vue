<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <div class="video" v-html="video.content">
            <div class="loading">加载中...</div>
        </div>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                video: {
                    title: '加载中'
                },
                breadcrumbs: [{
                    name: '视频',
                    link: '/video'
                }, {
                    name: '加载中'
                }]
            };
        },
        methods: {
            init: function () {
                this.http.post('/video/detail', {'videoId': Util.decrypt(this.$route.params.videoId)}).then(res => {
                    this.video = res.data.video;

                    this.breadcrumbs[1].name = this.video.title;
                    Util.title(this.video.title);
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

<style lang="less" scoped>
    .video {
        background: #fff;
        width: 1024px;
        height: 576px;
        position: relative;
        border: 1px solid #d5d5d5;
        margin: 0 auto;

        iframe, embed {
            width: 1024px;
            height: 576px;
            margin: 0 auto;
        }

        .loading {
            position: absolute;
            width: 100%;
            left: 0;
            right: 0;
            text-align: center;
            top: 260px;
            color: #999;
            z-index: 0;
        }
    }

</style>
