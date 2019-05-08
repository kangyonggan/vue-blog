<template>
    <div>
        <div class="search">
            <ul class="tabs">
                <li v-for="(tab, index) in tabs" :key="index" @click="clickTab" :class="{'active':index===currIndex}">
                    {{tab.text}}
                </li>
            </ul>

            <div class="form">
                <img src="/src/assets/images/search-top-icon.png" :style="'left:' + imgLeft + 'px'">
                <div class="input">
                    <Icon type="ios-search" size="28" color="#bdc4d5"/>
                    <input name="key" v-model="key" autocomplete='off' :placeholder="placeholder" @keyup.enter="search"/>
                    <div class="input-append">
                        <span>|</span>
                        <a href="javascript:" @click="search">搜 索</a>
                    </div>
                </div>
            </div>
        </div>
        <div style="clear: both;height: 30px;"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Util from '@/libs/util';

    const AppSearch = {
        props: {
            activeTab: {
                required: false,
                type: Number,
                default: 0
            }
        },
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
                currIndex: 0,
                placeholder: '请输入需要查找的文章标题，支持模糊搜索',
                key: ''
            };
        },
        mounted: function () {
            this.imgLeft = 25 + this.activeTab * 80;
            this.currIndex = this.activeTab;

            if (this.currIndex === 0) {
                this.placeholder = '请输入需要查找的文章标题，支持模糊搜索';
            } else if (this.currIndex === 1) {
                this.placeholder = '请输入需要查找的小说名称或作者，支持模糊搜索';
            }

            let key = this.$route.query.key;
            if (key) {
                key = Util.decryptUrl(key);
            } else {
                key = '';
            }
            this.key = key;
        },
        methods: {
            /**
             * 点击Tab页
             *
             * @param e
             */
            clickTab: function (e) {
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

                this.currIndex = currIndex;
            },
            search: function () {
                if (this.currIndex === 0) {
                    // 搜索文章
                    this.$router.push({
                        path: '/article',
                        query: {
                            key: Util.encryptUrlSimple(this.key)
                        }
                    });
                } else {
                    // 搜索小说
                    this.$router.push({
                        path: '/novel',
                        query: {
                            key: Util.encryptUrlSimple(this.key)
                        }
                    });
                }
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
</style>
