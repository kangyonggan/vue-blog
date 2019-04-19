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
        background: #fafafa;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .container {
        min-height: 100%;
        margin-bottom: -200px;
    }

    .content {
        width: 1024px;
        margin: 0 auto;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .empty {
        height: 200px;
    }
</style>
