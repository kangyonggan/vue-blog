<template>
    <div class="navbar">
        <div class="content">
            <router-link to="/" class="logo">
                <img src="/static/images/logo.png"/>
            </router-link>

            <div class="navList">
                <router-link v-for="nav in navList" :key="nav.dictCode"
                             :to="nav.dictCode" :class="isActive(nav.dictCode)?'active':''">
                    {{nav.value}}
                </router-link>
            </div>

            <a target="_blank" href="http://kangyonggan.com:8888" style="float: right;line-height: 80px;">登录</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList: [],
                currentUrl: '/'
            };
        },
        methods: {
            isActive: function (url) {
                if (url === '/') {
                    return this.currentUrl === '/';
                }
                return this.currentUrl.startsWith(url);
            }
        },
        mounted() {
            this.currentUrl = this.$route.path;

            // 设置导航栏
            this.http.get('/navs').then(res => {
                this.navList = res.data.navList;
            }).catch(res => {
                this.error(res.respMsg);
            });
        },
        watch: {
            '$route'(newRoute) {
                this.currentUrl = newRoute.path;
            }
        }
    };
</script>

<style scoped lang="less">
    .navbar {
        height: 80px;
        background: #fff;
        border-bottom: 1px solid #f5f5f5;

        .logo {
            float: left;
            display: inline-block;
            height: 80px;

            img {
                height: 80px;
            }
        }

        .navList {
            float: left;
            margin-left: 20px;

            a {
                margin-left: 10px;
                margin-top: 16px;
                float: left;
                padding: 10px;
                text-align: center;
                color: #595959;
            }
        }

        .navList a.active {
            border-bottom: 2px solid #2d8cf0;
        }

        .navList a:hover {
            border-bottom: 2px solid #2d8cf0;
        }
    }
</style>
