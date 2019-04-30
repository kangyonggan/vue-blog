<template>
    <div class="footer">
        <div class="content">
            <div class="footer-body">
                <div class="about">
                    <div class="title">关于站长</div>
                    <ul>
                        <li>
                            毕业院校：淮北师范大学
                        </li>
                        <li>
                            专　　业：数学与应用数学
                        </li>
                        <li>
                            职　　业：Java开发工程师
                        </li>
                        <li>
                            住　　址：上海市嘉定区江桥镇
                        </li>
                    </ul>
                </div>
                <div class="contact-links">
                    <div class="title">联系方式</div>
                    <ul>
                        <li>
                            手机号码：18516690317
                        </li>
                        <li>
                            微　　信：18516690317
                        </li>
                        <li>
                            扣　　扣：316071722
                        </li>
                        <li>
                            电子邮箱：java@kangyonggan.com
                        </li>
                    </ul>
                </div>
                <div class="friend-links">
                    <div class="title">友情链接</div>
                    <ul>
                        <li>
                            <a href="https://ckfksc.com" target="_blank">疯狂赛车</a>
                        </li>
                        <li>
                            <a href="http://ckssss.com" target="_blank">生生世世</a>
                        </li>
                        <li>
                            <a href="http://www.ssme.gov.cn" target="_blank">上海市小办</a>
                        </li>
                        <li>
                            <a href="https://houbb.github.io" target="_blank">侯宾宾的博客</a>
                        </li>
                    </ul>
                </div>
                <div class="qrcode">
                    <img src="/src/assets/images/weixin.png"/>
                </div>
            </div>
            <div class="footer-bottom">
                Copyright © 2015-2019. 皖ICP备18009089号.
                <a href="https://blog.kangyonggan.com/atom.xml" target="_blank" class="social-links">
                    <Icon type="social-rss-outline" size="20"/>
                </a>
                <a href="https://github.com/kangyonggan/" target="_blank" class="social-links">
                    <Icon type="social-github" size="20"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="less">
    @import "../../my-theme/custom";

    .footer {
        height: 360px;
        background: #fff;
        border-top: 1px solid #f5f5f5;

        &-body {
            height: 260px;
            padding-top: 45px;

            .qrcode {
                width: 300px;
                float: right;
                text-align: center;

                img {
                    width: 160px;
                }
            }

            .friend-links, .contact-links, .about {
                width: 300px;
                float: left;

                .title {
                    font-weight: bold;
                    color: #333;
                    padding: 5px;
                    display: inline-block;
                    border-bottom: 2px solid @primary-color;
                }

                ul {
                    list-style: none;
                    margin-top: 25px;

                    li {
                        font-size: 13px;
                        line-height: 30px;
                        color: #666;
                    }

                    li a {
                        font-size: 13px;
                        line-height: 30px;
                        color: #666;
                    }

                    li a:hover {
                        text-decoration: underline;
                        text-decoration-color: @primary-color;
                    }
                }
            }
        }

        &-bottom {
            font-size: 14px;
            border-top: 1px solid #e1e1e1;
            height: 100px;
            line-height: 100px;
            color: #aeaeae;

            .social-links {
                float: right;
                margin-right: 16px;
            }
        }
    }
</style>
