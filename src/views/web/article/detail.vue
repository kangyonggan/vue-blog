<template>
    <div>
        {{article.content}}
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                article: {}
            }
        },
        methods: {
            init: function () {
                this.http.post('article', {'articleId': encodeURIComponent(this.$route.params.id)}).then(res => {
                    this.article = res.data.article;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted () {
            this.init();
        },
        watch: {
            '$route' (newRoute) {
                this.init();
            }
        }
    };
</script>

<style scoped lang="less">

</style>
