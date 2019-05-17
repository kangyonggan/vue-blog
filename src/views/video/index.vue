<template>
    <AppPanel style="padding: 10px;">
        <ul class="video-list">
            <li v-for="video in videos" :key="video.videoId">
                <dl>
                    <dd>
                        <router-link :to="getEncryptLink(video.videoId)"
                           :style="'background-image: url(' + video.cover + ')'"></router-link>
                        <div class="size">{{video.viewNum}}</div>
                    </dd>
                    <dt>
                        {{video.title}}
                        <span class="pull-right">{{dateFormat(video.createdTime, 'yyyy-MM-dd')}}</span>
                    </dt>
                </dl>
            </li>
        </ul>

        <AppLoading :loading="!videos.length"/>
        <AppClear/>
    </AppPanel>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                videos: []
            };
        },
        methods: {
            /**
             * 获取加密连接
             *
             * @param videoId
             * @returns {string}
             */
            getEncryptLink: function (videoId) {
                return '/video/' + Util.encryptUrl(videoId);
            }
        },
        mounted() {
            // 加载视频列表
            this.http.get('/video').then(res => {
                this.videos = res.data.videos;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="less">
    .video-list, .video-list dl, .video-list dt, .video-list dd {
        margin: 0;
        padding: 0;
    }

    .video-list {
        list-style: none;
    }

    .video-list li {
        float: left;
        width: 390px;
        margin: 10px 5px 10px 10px;
        border: 1px solid #d2d2d2;
        text-align: center;
    }

    .video-list li dl dd {
        width: 370px;
        height: 260px;
        margin: 0 auto;
        margin-top: 10px;
        overflow: hidden;
        position: relative;
    }

    .video-list li dl dd a {
        display: inline-block;
        width: 370px;
        height: 260px;
        background-position: center;
        background-size: cover;
    }

    .video-list .size {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #fff;
        font-size: 30px;
    }

    .video-list li dl dt {
        margin-top: 3px;
        margin-bottom: 5px;
        color: #595959;
        line-height: 22px;
        text-align: left;
        margin-left: 13px;
    }

    .video-list li dl dt span {
        color: #999;
        font-size: 13px;
        margin-right: 13px;
    }
</style>
