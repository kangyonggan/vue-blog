<template>
    <ul class="all-tools">
        <li>
            <span class="index">1</span>
            <div class="right">
                <router-link to="/tools/json">JSON格式化</router-link>
                <Starts :length="5" :size="15"/>
            </div>
        </li>
        <li class="no-border">
            <span class="index">2</span>
            <div class="right">
                <router-link to="/tools/sql">SQL格式化</router-link>
                <Starts :length="4" :size="15"/>
            </div>
        </li>
        <li class="no-border">
            <span class="index">3</span>
            <div class="right">
                <router-link to="/tools/sql">XML格式化</router-link>
                <Starts :length="4" :size="15"/>
            </div>
        </li>
        <li class="no-border">
            <span class="index">4</span>
            <div class="right">
                <router-link to="/tools/thumb">生成缩略图</router-link>
                <Starts :length="4" :size="15"/>
            </div>
        </li>
    </ul>
</template>

<script>
    import Starts from './Stars';

    export default {
        components: {Starts}
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
