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
            <li>
                <router-link to="/tools/sql">
                    <dl>
                        <dd>
                            <img src="/static/images/tools/sql.png"/>
                        </dd>
                        <dt>
                            <Stars :length="4" class="stars"/>
                            SQL格式化
                        </dt>
                    </dl>
                </router-link>
            </li>
            <li>
                <router-link to="/tools/xml">
                    <dl>
                        <dd>
                            <img src="/static/images/tools/xml.png"/>
                        </dd>
                        <dt>
                            <Stars :length="4" class="stars"/>
                            XML格式化
                        </dt>
                    </dl>
                </router-link>
            </li>
            <li>
                <router-link to="/tools/thumb">
                    <dl>
                        <dd>
                            <img src="/static/images/tools/thumb.png"/>
                        </dd>
                        <dt>
                            <Stars :length="5" class="stars"/>
                            生成缩略图
                        </dt>
                    </dl>
                </router-link>
            </li>
            <li>
                <router-link to="/tools/idNoQry">
                    <dl>
                        <dd>
                            <img src="/static/images/tools/idNoQry.png"/>
                        </dd>
                        <dt>
                            <Stars :length="5" class="stars"/>
                            身份证查询
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
