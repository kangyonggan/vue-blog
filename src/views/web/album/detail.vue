<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel class="photos">
            <ul class="album-list">
                <li v-for="photo in albumPhotos" :key="photo.photoId">
                    <dl>
                        <dd>
                            <img :src="photo.thumb" :data-origin="album.url"/>
                        </dd>
                        <dt>
                            2019-05-07
                        </dt>
                    </dl>
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
                album: {
                    albumName: '加载中'
                },
                albumPhotos: [],
                breadcrumbs: [{
                    name: '相册',
                    link: '/album'
                }, {
                    name: '加载中'
                }]
            };
        },
        methods: {
            init: function () {
                this.http.post('/album/detail', {'albumId': encodeURIComponent(this.$route.params.albumId)}).then(res => {
                    this.album = res.data.album;
                    this.albumPhotos = res.data.albumPhotos;
                    this.breadcrumbs[1].name = this.album.albumName;
                    Util.title(this.album.albumName);

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
    .photos {
        padding: 10px;
    }

    .album-list, .album-list dl, .album-list dt, .album-list dd {
        margin: 0;
        padding: 0;
    }

    .album-list {
        list-style: none;
    }

    .album-list li {
        float: left;
        width: 195px;
        margin-top: 10px;
        margin-right: 4px;
        margin-left: 4px;
        border: 1px solid #d2d2d2;
        text-align: center;
    }

    .album-list li dl dd {
        width: 195px;
        height: 133px;
    }

    .album-list li dl dd img {
        width: 195px;
        height: 133px;
    }

    .album-list li dl dt {
        margin-top: 3px;
        margin-bottom: 5px;
        line-height: 22px;
        color: #999;
        font-size: 13px;
    }
</style>
