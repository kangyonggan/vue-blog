<template>
    <div class="layout">
        <div class="container">
            <Navbar/>
            <keep-alive>
                <div class="main content">
                    <router-view/>
                </div>
            </keep-alive>
            <div class="empty"></div>
        </div>

        <Footer/>
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
        height: 100%;
        position: relative;
        font-size: 16px;
    }

    .container {
        min-height: 100%;
        margin-bottom: -100px;
    }

    .content {
        width: 1288px;
        margin: 0 auto;
    }

    .empty {
        height: 200px;
    }
</style>
