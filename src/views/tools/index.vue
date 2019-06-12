<template>
    <AppPanel style="padding: 10px;">
        <ul class="tool-list">
            <li v-for="item in tools" :key="item.url">
                <router-link :to="item.url">
                    <dl>
                        <dd>
                            <img :src="item.icon"/>
                        </dd>
                        <dt>
                            <Stars :length="item.stars" class="stars"/>
                            {{item.name}}
                        </dt>
                    </dl>
                </router-link>
            </li>
        </ul>

        <AppClear/>
    </AppPanel>
</template>

<script>
    import Stars from './Stars';
    import tools from './tools';

    export default {
        components: {Stars},
        data() {
            return {
                tools: tools
            };
        }
    };
</script>

<style scoped lang="less">
    .tool-list {
        list-style: none;

        li {
            float: left;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 5px;
            width: 284px;
            height: 284px;
            margin: 10px;
            text-align: center;
            position: relative;

            img {
                height: 200px;
                margin-top: 25px;
            }

            dt {
                color: #848d99;
                margin-top: 9px;

                .stars {
                    position: absolute;
                    right: 5px;
                    top: -8px;
                }
            }
        }
    }
</style>
