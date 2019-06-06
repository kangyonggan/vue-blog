<template>
    <AppPanel style="padding: 10px;">
        <ul class="tool-list">
            <li>
                <router-link to="/tools/json">
                    <dl>
                        <dd>
                            <img src="/static/images/tools/json.png"/>
                        </dd>
                        <dt>
                            <Stars :length="5" class="stars"/>
                            JSON格式化
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

    export default {
        components: {Stars}
    };
</script>

<style scoped lang="less">
    .tool-list {
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
