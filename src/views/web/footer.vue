<template>
    <div class="footer">
        <div class="content">
            <div class="left">
                <div class="title">友情链接</div>
                <ul class="links">
                    <li>
                        <a href="https://houbb.github.io" target="_blank">侯宾宾</a>
                    </li>
                    <li>
                        <a href="http://ckssss.com" target="_blank">生生世世</a>
                    </li>

                    <li>
                        <a href="https://ckfksc.com" target="_blank">疯狂赛车</a>
                    </li>
                    <li>
                        <a href="http://www.ssme.gov.cn" target="_blank">市小办</a>
                    </li>
                </ul>
            </div>
            <div class="center">
                center
            </div>
            <div class="right">
                right
            </div>
            <div class="qr-code">
                qr-code
            </div>

            <AppDivider/>

            <div class="bottom">
                &copy;  Copyright <span>2019</span> 安徽永康科技版权所有 <span>|</span> 皖ICP备18009089号.

                <a>
                    <Icon type="ios-checkmark" color="#999"/>
                </a>

                <a class="favorite" href="https://github.com/kangyonggan" target="_blank">
                    <Icon type="logo-github" color="#999" size="22"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="less">
    .footer {
        height: 200px;
        color: #595959;
        background: #fff;
        border-top: 1px solid #f5f5f5;

        .left, .right, .center, qr-code {
            width: 25%;
            float: left;
        }
    }

    .title {
        margin-top: 10px;
        font-weight: bold;
    }

    .links {
        margin-top: 20px;

        li a {
            line-height: 20px;
            color: #888;
        }
    }

    .bottom {
        color: #999;
        line-height: 40px;

        span {
            margin: 0 5px;
        }

        .favorite {
            float: right;
        }
    }
</style>
