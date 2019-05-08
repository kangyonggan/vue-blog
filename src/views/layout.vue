<template>
    <div class="layout">
        <div class="container">
            <Navbar/>
            <keep-alive>
                <div class="main content">
                    <div class="empty-30"></div>
                    <router-view/>
                    <div class="empty-30"></div>
                </div>
            </keep-alive>
            <div class="empty"></div>
        </div>

        <Footer/>

        <BackTop></BackTop>
    </div>
</template>

<script>
    import Navbar from './navbar';
    import Footer from './footer';

    export default {
        components: {Navbar, Footer}
    };
</script>

<style lang="less">
    .layout {
        background: #f5f6f8;
        width: 100%;
        position: relative;
        font-size: 16px;
    }

    .container {
        min-height: 100%;
        margin-bottom: -360px;
    }

    .empty {
        height: 360px;
    }

    .empty-30 {
        clear: both;
        height: 30px;
    }

    .content {
        width: 1240px;
        margin: 0 auto;
    }

    .pull-left {
        float: left;
    }

    .pull-right {
        float: right;
    }
</style>
