<template>
    <AppPanel style="padding: 10px;text-align: center">
        <div>
            <input type="number" v-model="num" placeholder="请输入4位不重复的数字"/>

            <Button @click="guess" :disabled="!isNum">猜一次({{times}})</Button>
            <Button @click="gameOver" :disabled="isGameOver">放弃本局</Button>
            <Button @click="reset">重新开局</Button>
        </div>
        <div class="error" v-show="errMsg">{{errMsg}}</div>

        <Table border :columns="columns" :data="data" no-data-text="还没有猜测" class="table"/>

        <div class="intro">
            <h3>游戏规则 | Introduce</h3>
            <ol>
                <li>开局后，系统会随机生成不重复的4个数字（0~9），玩家可以猜8次，若数字和位置都相同则为A，若数字相同但位置不同则为B，每次猜过之后系统都会给出几个A和几个B。</li>
                <li>例：正确答案是2534，玩家猜2305，系统则会给出1A2B。表示有1个数字和位置都正确，有2个数字正确但位置不正确。</li>
                <li>本游戏可锻炼大脑的推理逻辑，适当游戏益闹，过度游戏伤身。</li>
            </ol>
        </div>
        <AppClear/>
    </AppPanel>
</template>

<script>
    export default {
        data() {
            return {
                answer: '',
                num: '',
                isGameOver: true,
                errMsg: '',
                columns: [
                    {
                        title: '猜测次数',
                        key: 'index'
                    },
                    {
                        title: '猜测数字',
                        key: 'num'
                    },
                    {
                        title: '点评',
                        key: 'result'
                    }
                ],
                data: [],
                times: 8
            };
        },
        methods: {
            /**
             * 重新开局
             */
            reset: function () {
                this.answer = this.genRandNum();
                this.num = '';
                this.isGameOver = false;
                this.data = [];
                this.times = 8;
            },
            /**
             * 生成4位不重复的随机数字
             */
            genRandNum: function () {
                let arr = [];
                for (let i = 0; i < 4; i++) {
                    let randNum = Math.floor(Math.random() * 10);
                    if (this.inArrary(arr, randNum)) {
                        i--;
                    } else {
                        arr[i] = randNum;
                    }
                }
                return arr.join('');
            },
            inArrary: function (arr, item) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === item) {
                        return true;
                    }
                }

                return false;
            },
            /**
             * 猜一次
             */
            guess: function () {
                this.times--;

                // 获取几A几B
                let result = this.getResult();
                this.data.push({
                    index: 8 - this.times,
                    num: this.num,
                    result: result
                });

                this.isGameOver = this.num === this.answer;

                this.num = '';

                if (this.times <= 0) {
                    this.gameOver();
                }
            },
            /**
             * 游戏结束
             */
            gameOver: function () {
                this.isGameOver = true;
                this.data.push({
                    index: '-',
                    num: '-',
                    result: '正确答案：' + this.answer
                });
            },
            /**
             * 判断是否是不重复的数字
             *
             * @returns {boolean}
             */
            isRepeat: function () {
                for (let i = 0; i < this.num.length - 1; i++) {
                    for (let j = i + 1; j < this.num.length; j++) {
                        if (this.num[i] === this.num[j]) {
                            return false;
                        }
                    }
                }

                return true;
            },
            /**
             * 判断是否是已经回答过的数字
             */
            isExists: function () {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].num === this.num) {
                        return true;
                    }
                }

                return false;
            },
            /**
             * 获取几A几B
             */
            getResult: function () {
                if (this.num === this.answer) {
                    return '正确';
                }
                let numA = 0;
                let numB = 0;
                for (let i = 0; i < this.num.length; i++) {
                    let targetNum = this.num[i];
                    for (let j = 0; j < this.answer.length; j++) {
                        // 先判断数字是否正确
                        if (this.answer[j] === targetNum) {
                            // 再判断位置是否正确
                            if (i === j) {
                                numA++;
                            } else {
                                numB++;
                            }
                        }
                    }
                }

                return numA + 'A' + numB + 'B';
            }
        },
        mounted() {
            this.reset();
        },
        computed: {
            /**
             * 判断是不是合法数字
             *
             * @returns {boolean}
             */
            isNum: function () {
                if (this.num === '' || this.isGameOver) {
                    this.errMsg = '';
                    return false;
                }
                if (this.num.trim().length !== 4 || !this.isRepeat()) {
                    this.errMsg = '请输入4位不重复的数字';
                    return false;
                }
                if (this.isExists()) {
                    this.errMsg = '这是一个已经猜测过的错误数字';
                    return false;
                }
                this.errMsg = '';
                return true;
            }
        }
    };
</script>

<style scoped lang="less">
    @primary-color: #2d8cf0;

    input[type=number] {
        width: 220px;
        height: 31px;
        line-height: 31px;
        box-sizing: border-box;
        outline: none;
        font-size: 14px;
        padding: 4px 10px;
        background: #fff;
        border: 1px solid #aaa;
        color: #333;
    }

    .error {
        width: 475px;
        margin: 0 auto;
        text-align: left;
        color: @primary-color;
        font-size: 12px;
    }

    .table {
        width: 800px;
        margin: 20px auto;
    }

    .intro {
        width: 1000px;
        margin: 0 auto;
        border-top: 1px dashed #d5d5d5;
        text-align: left;
        font-size: 14px;
        color: #777;

        h3 {
            line-height: 50px;
        }

        ol {
            list-style: decimal;
        }
    }
</style>
