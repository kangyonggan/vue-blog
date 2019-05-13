export default {
    respCo: '0000',
    respMsg: '成功',
    data: {
        'pageInfo': {
            'endRow': 10,
            'firstPage': 1,
            'hasNextPage': true,
            'hasPreviousPage': false,
            'isFirstPage': true,
            'isLastPage': false,
            'lastPage': 8,
            'list': [
                {
                    'articleId': 1,
                    'title': '前后分离的系统统一加解密2',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'viewNum': 23,
                    'content': '\n' +
                        '### 实现原理\n' +
                        '主要使用transform的rotate属性，将线条组合成Loading图形 (也就是菊花图形)。\n' +
                        '\n' +
                        'animation实现将线条颜色由浅到深，再由深到浅来回变换的动画，通过animation-delay属性来使颜色的变换产生过渡的效果，从而达到类似于Loading动画的效果。\n' +
                        '\n' +
                        '### html代码\n' +
                        '```\n' +
                        '<div class="loading">\n' +
                        '    <span class="line1"></span>\n' +
                        '    <span class="line2"></span>\n' +
                        '    <span class="line3"></span>\n' +
                        '    <span class="line4"></span>\n' +
                        '    <span class="line5"></span>\n' +
                        '    <span class="line6"></span>\n' +
                        '    <span class="line7"></span>\n' +
                        '    <span class="line8"></span>\n' +
                        '</div>\n' +
                        '```\n' +
                        '\n' +
                        '<!-- more -->\n' +
                        '\n' +
                        '### css代码\n' +
                        '```\n' +
                        '.loading {\n' +
                        '    position: fixed;\n' +
                        '    top: 0;\n' +
                        '    right: 0;\n' +
                        '    bottom: 0;\n' +
                        '    left: 0;\n' +
                        '    width: 80px;\n' +
                        '    height: 80px;\n' +
                        '    margin: auto;\n' +
                        '    z-index: 9999;\n' +
                        '}\n' +
                        '\n' +
                        '.loading span {\n' +
                        '    width: 4px;\n' +
                        '    height: 20px;\n' +
                        '    background-color: #ccc;\n' +
                        '    position: absolute;\n' +
                        '    left: 38px;\n' +
                        '    -webkit-animation: loading 1s infinite;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line1 {\n' +
                        '    background-color: #000;\n' +
                        '    -webkit-transform: rotate(0deg);\n' +
                        '    transform: rotate(0deg);\n' +
                        '    -webkit-animation-delay: .3s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line2 {\n' +
                        '    top: 5px;\n' +
                        '    left: 52px;\n' +
                        '    -webkit-transform: rotate(45deg);\n' +
                        '    transform: rotate(45deg);\n' +
                        '    -webkit-animation-delay: .4s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line3 {\n' +
                        '    top: 18px;\n' +
                        '    left: 57px;\n' +
                        '    -webkit-transform: rotate(90deg);\n' +
                        '    transform: rotate(90deg);\n' +
                        '    -webkit-animation-delay: .5s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line4 {\n' +
                        '    top: 31px;\n' +
                        '    left: 52px;\n' +
                        '    -webkit-transform: rotate(135deg);\n' +
                        '    transform: rotate(135deg);\n' +
                        '    -webkit-animation-delay: .6s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line5 {\n' +
                        '    top: 37px;\n' +
                        '    -webkit-animation-delay: .7s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line6 {\n' +
                        '    top: 32px;\n' +
                        '    left: 24px;\n' +
                        '    -webkit-transform: rotate(-135deg);\n' +
                        '    transform: rotate(-135deg);\n' +
                        '    -webkit-animation-delay: .8s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line7 {\n' +
                        '    top: 18px;\n' +
                        '    left: 19px;\n' +
                        '    -webkit-transform: rotate(-90deg);\n' +
                        '    transform: rotate(-90deg);\n' +
                        '    -webkit-animation-delay: .9s;\n' +
                        '}\n' +
                        '\n' +
                        '.loading .line8 {\n' +
                        '    top: 5px;\n' +
                        '    left: 24px;\n' +
                        '    -webkit-transform: rotate(-45deg);\n' +
                        '    transform: rotate(-45deg);\n' +
                        '    -webkit-animation-delay: 1s;\n' +
                        '}\n' +
                        '\n' +
                        '@-webkit-keyframes loading {\n' +
                        '    0% {\n' +
                        '        background-color: #ccc;\n' +
                        '    }\n' +
                        '    50% {\n' +
                        '        background-color: #000;\n' +
                        '    }\n' +
                        '    100% {\n' +
                        '        background-color: #ccc;\n' +
                        '    }\n' +
                        '}\n' +
                        '```\n' +
                        '\n' +
                        '### 效果图\n' +
                        '\n' +
                        '![](https://ws3.sinaimg.cn/large/006tNc79ly1g2w0mk6nkzg306y03mwex.gif)\n',
                    'categoryCode': 'java',
                    'categoryName': 'Java',
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 2,
                    'title': '给log4j2.yml配置uuid',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryCode': 'java',
                    'viewNum': 23,
                    'categoryName': 'Java',
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 3,
                    'title': '给log4j2.yml配置rewrite',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryCode': 'java',
                    'viewNum': 23,
                    'categoryName': 'Java',
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 4,
                    'title': 'SpringBoot中rabbitmq的配置和使用',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryCode': 'java',
                    'categoryName': 'Java',
                    'viewNum': 23,
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 5,
                    'title': 'Rabbitmq简记',
                    'categoryCode': 'java',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryName': 'Java',
                    'viewNum': 23,
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 6,
                    'title': 'SpringBoot中swagger2的配置和使用',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryCode': 'java',
                    'categoryName': 'Java',
                    'viewNum': 23,
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 7,
                    'title': 'SpringBoot中redis-cache的配置和使用',
                    'categoryCode': 'java',
                    'viewNum': 23,
                    'categoryName': 'Java',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 8,
                    'title': 'SpringBoot中log4j2.yml的配置和使用',
                    'categoryCode': 'java',
                    'viewNum': 23,
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryName': 'Java',
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 9,
                    'title': 'Redis简记',
                    'viewNum': 23,
                    'categoryCode': 'java',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryName': 'Java',
                    'createdTime': 1556090343602
                },
                {
                    'articleId': 10,
                    'title': 'Nexus简记',
                    'viewNum': 23,
                    'categoryCode': 'java',
                    'summary': '如果有上一页则返回上一页，如果没上一页（直接输入url打开的网页）则返回首页。兼容主流浏览器。',
                    'categoryName': 'Java',
                    'createdTime': 1556090343602
                }
            ],
            'navigateFirstPage': 1,
            'navigateLastPage': 8,
            'navigatePages': 8,
            'navigatepageNums': [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            'nextPage': 2,
            'pageNum': 1,
            'pageSize': 10,
            'pages': 14,
            'prePage': 0,
            'size': 10,
            'startRow': 1,
            'total': 136
        }
    }
};
