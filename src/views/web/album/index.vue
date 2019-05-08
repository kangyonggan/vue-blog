<template>
    <AppPanel style="padding: 10px;">
        <ul class="album-list">
            <li v-for="album in albums" :key="album.albumId">
                <dl>
                    <dd>
                        <router-link :to="getEncryptLink(album.albumId)"
                           :style="'background-image: url(' + baseUrl + album.cover + ')'"></router-link>
                        <div class="size">{{album.size}}</div>
                    </dd>
                    <dt>
                        {{album.albumName}}
                        <span class="pull-right">2019-01-10</span>
                    </dt>
                </dl>
            </li>
        </ul>

        <AppClear/>
    </AppPanel>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                albums: []
            };
        },
        methods: {
            /**
             * 获取加密连接
             *
             * @param albumId
             * @returns {string}
             */
            getEncryptLink: function (albumId) {
                return '/album/' + Util.encryptUrl(albumId);
            }
        },
        mounted() {
            // 加载相册列表
            this.http.get('/album').then(res => {
                this.albums = res.data.albums;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="less">
    .album-list, .album-list dl, .album-list dt, .album-list dd {
        margin: 0;
        padding: 0;
    }

    .album-list {
        list-style: none;
    }

    .album-list li {
        float: left;
        width: 390px;
        margin: 10px 5px 10px 10px;
        border: 1px solid #d2d2d2;
        text-align: center;
    }

    .album-list li dl dd {
        width: 370px;
        height: 260px;
        margin: 0 auto;
        margin-top: 10px;
        overflow: hidden;
        position: relative;
    }

    .album-list li dl dd a {
        display: inline-block;
        width: 370px;
        height: 260px;
        background-position: center;
        background-size: cover;
    }

    .album-list .size {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #fff;
        font-size: 30px;
    }

    .album-list li dl dt {
        margin-top: 3px;
        margin-bottom: 5px;
        color: #595959;
        line-height: 22px;
        text-align: left;
        margin-left: 13px;
    }

    .album-list li dl dt span {
        color: #999;
        font-size: 13px;
        margin-right: 13px;
    }
</style>
