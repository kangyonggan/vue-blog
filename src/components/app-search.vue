<template>
    <div>
        <div class="search">
            <ul class="tabs">
                <li v-for="(tab, index) in tabs" :key="index" @click="clickTab" :class="{'active':index===currIndex}">
                    {{tab.text}}
                </li>
            </ul>

            <div class="form">
                <img src="/static/images/search-top-icon.png" :style="'left:' + imgLeft + 'px'">
                <div class="input" :class="{preResult: showTips}">
                    <Icon type="ios-search" size="28" color="#bdc4d5"/>
                    <input name="key" v-model="key" autocomplete='off' :placeholder="placeholder" @keyup.enter="search"
                           @input="preSearch" @keydown="keydown" @click="clickInput"/>
                    <div class="tips" v-show="showTips">
                        <ul v-if="currIndex===0">
                            <li :class="{active: cursorIndex===index}" v-for="(item, index) in preList"
                                :key="index" @click="selectPreItem($event, item)"
                                v-html="formatResultKey(item.title)"></li>
                            <AppLoading :loading="isSearching" :height="150"/>
                        </ul>
                        <ul v-if="currIndex===1">
                            <li :class="{active: cursorIndex===index}" v-for="(item, index) in preList"
                                :key="index" @click="selectPreItem($event, item)">
                                <div class="pre-name" v-html="formatResultKey(item.name)">{{item.name}}</div>
                                <div class="pre-author" v-html="formatResultKey(item.author)"></div>
                            </li>
                            <AppLoading :loading="isSearching" :height="150"/>
                        </ul>
                        <div class="empty-result" v-show="!preList.length && !isSearching">
                            没有匹配的结果
                        </div>
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
    import {debounce} from '@/libs/common';

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
                key: '',
                keyId: 0,
                preList: [],
                isSearching: false,
                showTips: false,
                cursorIndex: -1
            };
        },
        mounted: function () {
            this.showTips = false;
            this.imgLeft = 25 + this.activeTab * 80;
            this.currIndex = this.activeTab;

            if (this.currIndex === 0) {
                this.placeholder = '请输入需要查找的文章标题，支持模糊搜索';
            } else if (this.currIndex === 1) {
                this.placeholder = '请输入需要查找的小说名称或作者，支持模糊搜索';
            }

            let that = this;
            // 点击空白区域关闭
            document.onclick = function (e) {
                if (e.target.getAttribute('name') !== 'key') {
                    that.showTips = false;
                }
            };
        },
        methods: {
            formatResultKey: function (text) {
                let index = text.toLowerCase().indexOf(this.key.toLowerCase());
                if (index === -1) {
                    return text;
                }
                return text.substring(0, index) + '<span style="color: #8c0776">' + text.substring(index, index + this.key.length) + '</span>' + text.substring(index + this.key.length);
            },
            /**
             * 点击Tab页
             *
             * @param e
             */
            clickTab: function (e) {
                this.showTips = false;
                this.key = '';
                this.keyId = 0;
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
                if (!this.keyId) {
                    return;
                }
                this.showTips = false;
                if (this.currIndex === 0) {
                    // 搜索文章
                    this.$router.push({
                        path: '/article/' + Util.encryptUrl(this.keyId)
                    });
                } else {
                    // 搜索小说
                    this.$router.push({
                        path: '/novel/' + Util.encryptUrl(this.keyId),
                    });
                }
            },
            clickInput: function () {
                if (!this.showTips && this.preList.length) {
                    this.showTips = true;
                }
            },
            preSearch: debounce(function (e) {
                this.preList = [];
                if (e.target.value) {
                    this.showTips = true;
                    this.isSearching = true;
                    this.cursorIndex = -1;
                    if (this.currIndex === 0) {
                        // 预搜索文章
                        this.http.post('/article/preSearch', {key: e.target.value}).then(res => {
                            this.preList = res.data.preList;
                            this.isSearching = false;
                        }).catch(res => {
                            this.error(res.respMsg);
                            this.isSearching = false;
                        });
                    } else {
                        // 预搜索小说
                        this.http.post('/novel/preSearch', {key: e.target.value}).then(res => {
                            this.preList = res.data.preList;
                            this.isSearching = false;
                        }).catch(res => {
                            this.error(res.respMsg);
                            this.isSearching = false;
                        });
                    }
                } else {
                    this.showTips = false;
                }
            }),
            selectPreItem: function (e, item) {
                if (this.currIndex === 0) {
                    this.key = item.title;
                    this.keyId = item.articleId;
                } else {
                    this.key = item.name;
                    this.keyId = item.novelId;
                }
                this.showTips = false;

                this.search();
            },
            keydown: function (e) {
                this.keyId = 0;
                if (this.showTips) {
                    if (e.keyCode === 38) {
                        // 上
                        this.cursorIndex = this.cursorIndex - 1;
                        if (this.cursorIndex < 0) {
                            this.cursorIndex = this.preList.length - 1;
                        }
                    } else if (e.keyCode === 40) {
                        // 下
                        this.cursorIndex = this.cursorIndex + 1;
                        if (this.cursorIndex >= this.preList.length) {
                            this.cursorIndex = 0;
                        }
                    }

                    if (this.cursorIndex >= 0 && this.preList.length > this.cursorIndex) {
                        if (this.currIndex === 0) {
                            this.key = this.preList[this.cursorIndex].title;
                            this.keyId = this.preList[this.cursorIndex].articleId;
                        } else {
                            this.key = this.preList[this.cursorIndex].name;
                            this.keyId = this.preList[this.cursorIndex].novelId;
                        }
                    }
                }

                return true;
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
            z-index: 1000;
        }

        .preResult {
            border-bottom: 1px solid #dedede !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        .input {
            position: relative;
            width: 960px;
            height: 45px;
            border: 2px solid #dedede;
            border-radius: 5px;
            background: #fff;

            .tips {
                position: absolute;
                left: -2px;
                top: 43px;
                right: -2px;
                padding: 10px 20px 20px 20px;
                box-sizing: border-box;
                border: 2px solid #dedede;
                border-top: 0;
                background: #fff;
                z-index: 999;
                max-height: 450px;

                .empty-result {
                    height: 150px;
                    text-align: center;
                    color: #999;
                    font-size: 15px;
                    line-height: 150px;
                }

                li {
                    padding: 3px 10px;
                    height: 30px;
                    line-height: 25px;
                    font-size: 14px;
                    color: #888;
                    cursor: pointer;

                    .pre-name {
                        float: left;
                    }

                    .pre-author {
                        float: right;
                        color: #999;
                    }
                }

                li:hover {
                    background: #f5f5f5;
                }

                li.active {
                    background: #f5f5f5;
                    color: @primary-color;
                }
            }

            i {
                margin: 8px 15px 0 20px;
                float: left;
            }

            input {
                outline: none;
                width: 820px;
                height: 41px;
                border: none;
                float: left;
                color: #595959;
            }

            input::-webkit-input-placeholder {
                font-size: 13px;
                color: #999;
            }
        }
    }
</style>
