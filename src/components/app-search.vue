<template>
    <div>
        <div class="search">
            <ul class="tabs">
                <li v-for="(tab, index) in tabs" :key="index" @click="activeTab" :class="{'active':index===0}">
                    {{tab.text}}
                </li>
            </ul>

            <div class="form">
                <img src="/src/assets/images/search-top-icon.png" :style="'left:' + imgLeft + 'px'">
                <div class="input">
                    <Icon type="ios-search" size="28" color="#bdc4d5"/>
                    <input name="key" autocomplete='off' :placeholder="placeholder"/>
                    <div class="input-append">
                        <span>|</span>
                        <a href="javascript:">搜 索</a>
                    </div>
                </div>
            </div>

            <div class="hots">
                <span>热　　搜：</span>
                <ul>
                    <li>
                        <a href="javascript:">Java</a>
                    </li>
                    <li>
                        <a href="javascript:">Linux</a>
                    </li>
                    <li>
                        <a href="javascript:">Spring Boot</a>
                    </li>
                    <li>
                        <a href="javascript:">逆天邪神</a>
                    </li>
                </ul>
            </div>
        </div>
        <div style="clear: both;height: 30px;"></div>
    </div>
</template>

<script>
    import Vue from 'vue';

    const AppSearch = {
        props: {},
        data() {
            return {
                tabs: [{
                    text: '文 章',
                    url: 'searchArticle'
                }, {
                    text: '小 说',
                    url: 'searchNovel'
                }],
                imgLeft: 25,
                placeholder: '请输入需要查找的文章标题，支持模糊搜索'
            };
        },
        methods: {
            /**
             * 激活Tab页
             *
             * @param e
             */
            activeTab: function (e) {
                let parent = e.target.parentNode;

                let currIndex = 0;
                for (let i = 0; i < parent.children.length; i++) {
                    if (parent.children[i] === e.target) {
                        currIndex = i;
                    }
                    parent.children[i].setAttribute('class', '');
                }

                if (currIndex === 0) {
                    this.placeholder = '请输入需要查找的文章标题，支持模糊搜索';
                } else if (currIndex === 1) {
                    this.placeholder = '请输入需要查找的小说名称或作者，支持模糊搜索';
                }
                this.imgLeft = 25 + currIndex * 80;
                e.target.setAttribute('class', 'active');
            }
        }
    };

    export default AppSearch;

    Vue.component('AppSearch', AppSearch);
</script>

<style scoped lang="less">
    @import "../../my-theme/custom";

    .search {
        width: 1000px;
        height: 94px;
        margin: 0 auto;
    }

    .tabs {
        display: block;
        list-style: none;
        height: 40px;
        padding: 0;
        margin: 0;

        li {
            float: left;
            width: 70px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            color: #303133;
            font-size: 14px;
            margin-left: 10px;
        }

        li.active {
            color: @primary-color;
        }
    }

    .form {
        position: relative;
        margin-top: 10px;

        img {
            position: absolute;
            top: -15px;
        }

        .input {
            width: 960px;
            height: 40px;
            border: 2px solid #dedede;
            border-radius: 5px;
            background: #fff;

            i {
                margin: 5px 15px 0 20px;
                float: left;
            }

            input {
                outline: none;
                width: 820px;
                height: 35px;
                border: none;
                float: left;
                color: #595959;
            }

            input::-webkit-input-placeholder {
                font-size: 13px;
                color: #999;
            }

            .input-append {
                float: left;
                line-height: 36px;

                span {
                    color: #999;
                }

                a {
                    color: @primary-color;
                    margin-left: 13px;
                }
            }
        }
    }

    .hots {
        margin-top: 5px;
        margin-left: 5px;
        font-size: 13px;

        span {
            float: left;
        }

        ul {
            float: left;
            list-style: none;
            margin: 0;
            height: 0;

            li {
                float: left;
                margin-left: 20px;

                a {
                    color: @primary-color;
                }

                a:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
