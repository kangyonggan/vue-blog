<template>
    <ul class="all-tools">
        <li v-for="(item, index) in tools" :key="index">
            <span class="index">{{index + 1}}</span>
            <div class="right">
                <router-link :to="item.url">{{item.name}}</router-link>
                <Starts :length="item.stars" :size="15"/>
            </div>
        </li>
    </ul>
</template>

<script>
    import Starts from './Stars';
    import tools from './tools';

    export default {
        components: {Starts},
        data() {
            return {
                tools: tools
            };
        }
    };
</script>

<style scoped lang="less">
    @import "../../../my-theme/custom";

    ul.all-tools {
        list-style: none;
        margin: 0;
        padding: 10px;

        li {
            float: left;
            height: 45px;
            width: 364px;
            margin-top: 5px;
            border-bottom: 1px solid #d5d5d5;

            span.index {
                float: left;
                display: inline-block;
                width: 30px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: 24px;
                font-weight: 400;
                color: #e0e0e0;
                margin-right: 5px;
            }

            div.right {
                width: 304px;
                float: left;
                height: 45px;
                line-height: 45px;

                a {
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 400;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                i {
                    color: @primary-color;
                    float: right;
                    margin-top: 12px;
                }
            }
        }

        li.no-border {
            border-bottom: 1px solid #fff;
        }
    }
</style>
