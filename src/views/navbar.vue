<template>
    <div class="navbar">
        <div class="content">
            <router-link to="/" class="logo">
                <img src="/src/assets/images/logo.png"/>
            </router-link>

            <div class="navList">
                <router-link v-for="nav in navList" :key="nav.dictCode"
                             :to="nav.dictCode" :class="activeNav===nav.dictCode?'active':''"
                             :style="nav.dictCode==='/login'?'float: right':''">
                    {{nav.value}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList: [],
                activeNav: '/'
            };
        },
        mounted() {
            this.http.get('navList').then(res => {
                this.navList = res.data.navList;
            }).catch(res => {
                this.error(res.respMsg);
            });
        },
        watch: {
            '$route'(newRoute) {
                this.activeNav = newRoute.path;
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../../my-theme/custom";

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

        .navList a {
            margin-left: 10px;
            margin-top: 16px;
            float: left;
            padding: 10px;
            text-align: center;
        }

        .navList a.active {
            border-bottom: 2px solid @primary-color;
        }

        .navList a:hover {
            border-bottom: 2px solid @primary-color;
        }
    }
</style>
