let card_pool = [{src: null, quality: null, profession: null, type: null, cost: null, attack: null, blood: null}];
let gold_pool = [{src: null, quality: null, profession: null, type: null, cost: null, attack: null, blood: null}];
let purple_pool = [{src: null, quality: null, profession: null, type: null, cost: null, attack: null, blood: null}];
let blue_pool = [{src: null, quality: null, profession: null, type: null, cost: null, attack: null, blood: null}];
let white_pool = [{src: null, quality: null, profession: null, type: null, cost: null, attack: null, blood: null}];
//开包概率，不用const是为了作弊
let gold_probability = 0.01;
let purple_probability = 0.04;
let blue_probability = 0.25;

function load() {
    $('.bigImgDiv div').fadeOut(100);
    $('.bigImgDiv img').fadeOut(100);
    $('.main').fadeIn(1000);
}

let collection = new Vue({
    el: '#collection',
    data: {
        profession_img: [{src: 'img/zhiye1.png', isChosen: false, profession: '萨满'},
            {src: 'img/zhiye2.png', isChosen: false, profession: '战士'},
            {src: 'img/zhiye3.png', isChosen: false, profession: '法师'},
            {src: 'img/zhiye4.png', isChosen: false, profession: '德鲁伊'},
            {src: 'img/zhiye5.png', isChosen: false, profession: '牧师'},
            {src: 'img/zhiye6.png', isChosen: false, profession: '圣骑士'},
            {src: 'img/zhiye7.png', isChosen: false, profession: '猎人'},
            {src: 'img/zhiye8.png', isChosen: false, profession: '术士'},
            {src: 'img/zhiye9.png', isChosen: false, profession: '潜行者'},],
        card_img: [{src: 'img/card1.png', class: '', profession: '萨满'},
            {src: 'img/card2.png', class: '', profession: '战士'},
            {src: 'img/card3.png', class: '', profession: '法师'},
            {src: 'img/card4.png', class: '', profession: '德鲁伊'},
            {src: 'img/card5.png', class: '', profession: '牧师'},
            {src: 'img/card6.png', class: '', profession: '圣骑士'},
            {src: 'img/card7.png', class: '', profession: '猎人'},
            {src: 'img/card8.png', class: '', profession: '术士'},],
        nums: ['0', '1', '2', '3', '4', '5', '6', '7+'],
        decks: ['img/touxiang1.png',
            'img/touxiang2.png',
            'img/touxiang3.png',
            'img/touxiang4.png',
            'img/touxiang6.png',
            'img/touxiang5.png',
            'img/touxiang7.png'],
        profession: '萨满', //显示的职业
        isShadow: false,
        bigImg: {src: 'img/loading.gif', num: 0}, //改变大图地址
        timer: '', //定时器
        currentNum: '', //识别当前的点击的费用
        currentTarget: '', //记录操作的div
        isabled: false, //判断是否两次点击
        // isdeleting: false, //阻止点删除的时候冒泡(解决)
    },
    mounted: function () {
        //初始化显示的职业
        this.chosen(0);
    },
    methods: {
        //选择职业，通过:class实现
        chosen: function (num) {
            for (let i in this.profession_img)
                this.profession_img[i].isChosen = false;
            this.profession_img[num].isChosen = true;
            this.profession = this.profession_img[num].profession;
        },
        //图片变大与模糊
        cardMove: function (num) {
            $('.toggleAudio').attr('src', 'audio/Card_Transition_Out.mp3');
            //移除先前操作的class，用于解决z-index错位问题
            this.card_img[this.bigImg.num].class = '';
            //给bigImg一个src
            this.bigImg.src = this.card_img[num].src;
            //保存当前bigImg的序号
            this.bigImg.num = num;
            //添加带有移动动画的class
            this.card_img[num].class = 'cardMove' + num;
            //添加遮罩层，通过:class='{shadow:isShadow}'实现
            this.isShadow = true;
            //显示bigImg
            this.timer = setTimeout(function () {
                //解决窗口模式下的错位问题
                let top = $('.absimg').eq(num).offset().top;
                let left = $('.absimg').eq(num).offset().left;
                $('.bigImg').css('top', top);
                $('.bigImg').css('left', left);
                $('.bigImg').fadeIn(100);
            }, 300);
        },
        //点掉大图，通过遮罩层实现点击事件，通过:class实现动画切换
        hidebigImg: function () {
            $('.toggleAudio').attr('src', 'audio/Card_Transition_Out.mp3');
            this.isShadow = false;
            //添加带有隐藏的动画的class
            this.card_img[this.bigImg.num].class = 'hideCard' + this.bigImg.num;
            //中止出现动画，防止连续点击出现bug
            clearTimeout(this.timer);
            //隐藏bigImg
            $('.bigImg').stop().css('display', 'none');
        },
        //选择法力消耗
        clicknums: function (event) {
            $(event.currentTarget).siblings().removeClass('opacity');
            //判断是否第二次点击
            if (this.currentNum === event.currentTarget) {
                $(event.currentTarget).removeClass('opacity');
                this.currentNum = '';
            } else {
                $(event.currentTarget).addClass('opacity');
                this.currentNum = event.currentTarget;
            }
        },
        //点击某个卡组之后卡组置顶，出现卡组详情
        clickMy_deck: function (event) {
            //判断是否连续点击
            if (!this.isabled) {
                $('.toggleAudio').attr('src', 'audio/Hub_Click.mp3');
                this.currentTarget = event.currentTarget;
                //由于display之后位置会变，就先给一个位置，然后进行动画
                $(this.currentTarget).css('top', this.currentTarget.offsetTop - 79);
                $(this.currentTarget).addClass('deckMove');
                $(this.currentTarget).siblings().css('display', 'none');
                //旋转切换
                $('.my_deck_list').removeClass('my_deck_list_hide');
                $('.my_deck_list').addClass('my_deck_list_show');
                $('.my_deck_button').attr('value', '完成');
                //放大的时候隐藏删除按键
                $('.delete_deck').css('display', 'none');
                this.isabled = true;
            }
            // this.isdeleting = false;
        },
        //点击返回按钮
        clickButton: function () {
            if ($('.my_deck_button').attr('value') === '返回') {
                $('.toggleAudio').attr('src', 'audio/Back_Click.mp3');
                setTimeout(function () {
                    window.location.assign('index.html');
                }, 800);
            }
            if ($('.my_deck_button').attr('value') === '完成') {
                //重置this.isabled
                $('.toggleAudio').attr('src', 'audio/Back_Click.mp3');
                this.isabled = false;
                //旋转回来
                $('.my_deck_list').removeClass('my_deck_list_show')
                $('.my_deck_list').addClass('my_deck_list_hide');
                //恢复正常
                $(this.currentTarget).siblings().css('display', 'block');
                $(this.currentTarget).removeClass('deckMove');
                $(this.currentTarget).css('top', 0);
                //显示删除按键
                $('.delete_deck').css('display', 'inline');
                $('.my_deck_button').attr('value', '返回');
            }
        },
        //删卡组,采用修改参数达到阻止冒泡的效果(使用阻止冒泡失败，原因不明，有待研究)（已解决冒泡问题）
        deletedeck: function (num) {
            if (confirm('确认删除卡组？'))
                this.decks.splice(num, 1);
            // this.isdeleting = true;
        }
    }
});
let index = new Vue({
    el: '#index',
    data: {
        mask: false,
        packNum: 1,
        friendsNum: 0,
        name: '名字#111',
        nearby: 0,
        online: 0,
        friendsList: false,
        myGold: 1000,
        settingClass: ''
    },
    mounted: function () {
        //监听esc
        let _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if (key === 27)
                _this.keydown_esc();
        }
    },
    methods: {
        //esc事件
        keydown_esc: function () {
            alert(2);
            if (this.friendsList)
                this.friendsList = !this.friendsList;
            else
                this.toggleSetting();
        },
        //使用Vue失败
        hover: function () {
            // this.audio_src='audio/box_large_button.mp3';
            $('.toggleAudio').attr('src', 'audio/box_large_button.mp3');
        },
        clickAudio: function () {
            // this.audio_src='audio/box_hub_button.mp3';
            $('.toggleAudio').attr('src', 'audio/box_hub_button.mp3');
        },
        clickScreen: function () {
            //关闭好友列表
            this.friendsList = false;
            //如果
            if (this.settingClass === 'showSetting')
                this.settingClass = 'hideSetting';
            this.mask = false;
        },
        pvp: function () {

        },
        pve: function () {

        },
        happy: function () {

        },
        others: function () {

        },
        collection: function () {
            setTimeout(function () {
                window.location.assign('collection.html');
            }, 800);
        },
        pack: function () {
            setTimeout(function () {
                window.location.assign('openpack.html');
            }, 800);
        },
        shop: function () {
            if (this.packNum < 100) {
                this.packNum = 99;
            }
        },
        toggleFriends: function () {
            this.friendsList = !this.friendsList;
            this.mask = true;
        },
        toggleSetting: function () {
            //切换状态
            // console.log(this.settingClass);
            if (this.settingClass === 'showSetting')
                this.settingClass = 'hideSetting';
            else
                this.settingClass = 'showSetting';
            this.mask = true;
            // console.log(this.settingClass);
        },
        close: function () {
            // window.close()的兼容性处理,但是使用后会出现另一个页面也能调用close方法，所以暂时取消
            // window.open('', '_self', '');
            window.close();
        }
    }
});
let openpack = new Vue({
    el: '#openPack',
    data: {
        mask: false,
        packNum: 99,
        //用来控制正在拖动的卡包的z-index
        isDrag: false,
        originMouseX: 0,
        originMouseY: 0,
        friendsNum: 0,
        name: '名字#111',
        nearby: 0,
        online: 0,
        friendsList: false,
        myGold: 1000,
        settingClass: '',
        opening: false,
        isAnimate: [false, false, false, false, false, false],
        isRotate: [null, false, false, false, false, false],
        //用于防止连点
        time: 0,
        //给个初始值，防止显示不出
        card: [null, {src: ''}, {src: ''}, {src: ''}, {src: ''}, {src: ''}]
    },
    created: function () {
        this.loadCardpool();
    },
    mounted: function () {
        //监听必须用_this
        let _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            //监听esc
            if (key === 27)
                _this.keydown_esc();
            //监听space
            if (key === 32) {
                _this.keydown_space();
            }
        }
    },
    methods: {
        //通过axios.js获取卡池
        loadCardpool: function () {
            let _this = this;
            axios.get('js/cardpool.php').then
            (function (res) {
                let data = res.data.split('!');
                for (let i = 0; i < data.length - 1; i++) {
                    let JSON_data = JSON.parse(data[i]);
                    data[i] = JSON_data;
                }
                card_pool = data;
//初始化pool
                gold_pool = [];
                purple_pool = [];
                blue_pool = [];
                white_pool = [];
                //console.log(card_pool);
                for (let i in card_pool) {
                    if (card_pool[i].quality === 'gold')
                        gold_pool.push(card_pool[i]);
                    else if (card_pool[i].quality === 'purple')
                        purple_pool.push(card_pool[i]);
                    else if (card_pool[i].quality === 'blue')
                        blue_pool.push(card_pool[i]);
                    else if (card_pool[i].quality === 'white')
                        white_pool.push(card_pool[i]);
                }
                _this.randomCard();
                //console.log(white_pool);
            }, function (err) {
                // console.log(err);
            });
        },
        //esc事件
        keydown_esc: function () {
            if (this.friendsList)
                this.friendsList = !this.friendsList;
            else
                this.toggleSetting();
        },
        keydown_space: function () {
            //按键间隔1s
            let oldtime = this.time;
            this.time = new Date();
            if (this.time - oldtime > 1000) {
                //三个if操作，开包，开卡，关闭
                if (!this.isAnimate[0]) {
                    this.packNum--;
                    this.openpack();
                } else if (this.isRotate[1] === true && this.isRotate[2] === true && this.isRotate[3] === true && this.isRotate[4] === true && this.isRotate[5] === true) {
                    this.closepack();
                    oldtime = 0;
                    this.time = 0;
                } else {
                    for (let i = 1; i <= 5; i++)
                        if (!this.isRotate[i])
                            this.openCard(i);
                }
            }
        },
        start: function (e) {
            this.isDrag = true;
            this.originMouseX = e.clientX;
            this.originMouseY = e.clientY;
            $('#background_video').attr('src', 'img/process.mp4');
            this.packNum--;
        },
        move: function (e) {
            if (this.isDrag) {
                $('#pack').css('width', 220);
                $('#pack').css('left', 175 + e.clientX - this.originMouseX);
                $('#pack').css('top', 200 + e.clientY - this.originMouseY);
            }
        },
        stop: function (e) {
            this.isDrag = false;
            $('#pack').css('width', 200);
            $('#pack').css('left', 175);
            $('#pack').css('top', 200);
            $('#background_video').attr('src', '');
            if (e.clientX > 740 && e.clientX < 950 && e.clientY > 230 && e.clientY < 400)
                this.openpack();
            else {
                this.packNum++;
            }
        },
        //开包
        openpack: function () {
            //用:class让动画动起来!
            this.isAnimate = [true, true, true, true, true, true];
            //防止乱点，开启mask
            this.mask = true;
            //随机程序
            // this.randomCard();
            // console.log(this.card[1].quality);
        },
        //随机卡
        randomCard: function () {
            for (let i = 1; i <= 5; i++) {
                let randomNum1 = Math.random();
                if (randomNum1 <= gold_probability) {
                    let randomNum2 = Math.random() * gold_pool.length;
                    this.card[i] = gold_pool[Math.floor(randomNum2)];
                    // console.log("gold" + Math.floor(randomNum2));
                } else if (randomNum1 > gold_probability && randomNum1 <= gold_probability + purple_probability) {
                    let randomNum2 = Math.random() * purple_pool.length;
                    this.card[i] = purple_pool[Math.floor(randomNum2)];
                    // console.log("pur" + Math.floor(randomNum2));
                } else if (randomNum1 > gold_probability + purple_probability && randomNum1 <= gold_probability + purple_probability + blue_probability) {
                    let randomNum2 = Math.random() * blue_pool.length;
                    this.card[i] = blue_pool[Math.floor(randomNum2)];
                    // console.log("blue" + Math.floor(randomNum2));
                } else {
                    let randomNum2 = Math.random() * white_pool.length;
                    this.card[i] = white_pool[Math.floor(randomNum2)];
                    // console.log("white" + Math.floor(randomNum2));
                }
                // console.log(this.card[i]);
            }
        },
        //完成按钮，重置属性
        closepack: function () {
            this.isAnimate = [false, false, false, false, false, false];
            this.isRotate = [null, false, false, false, false, false];
            this.mask = false;
            $('.packFinish').fadeOut(200);
            //提前加载素材
            this.randomCard();
        },
        //翻转卡牌
        openCard: function (num) {
            this.queueAudio('audio/card_turn_over_norm.mp3');
            if (this.card[num].quality === 'gold')
                this.queueAudio('audio/gold.mp3');
            if (this.card[num].quality === 'purple')
                this.queueAudio('audio/purple.mp3');
            if (this.card[num].quality === 'blue')
                this.queueAudio('audio/blue.mp3');
            //这一行代码花了一个多小时...没这句看起来像废话的话无法执行..怀疑是引用类型的问题？浅拷贝解决，也可能是v-bind在数组某一项变化的时候无法生效的原因
            //两行的原因是不移除上一个动画开始不了下一个动画
            this.isAnimate = [this.isAnimate[0], this.isAnimate[1], this.isAnimate[2], this.isAnimate[3], this.isAnimate[4], this.isAnimate[5]];
            this.isAnimate[num] = false;
            this.isRotate[num] = true;
            if (this.isRotate[1] === true && this.isRotate[2] === true && this.isRotate[3] === true && this.isRotate[4] === true && this.isRotate[5] === true)
                //想用渐变效果，所以没用v-show
                $('.packFinish').fadeIn(500);
        },
        //音效队列，防止连续开多张卡的时候音效相互覆盖
        queueAudio: function (src) {
            for (let i = 1; i <= 12; i++) {
                let $queue = $('.queue' + i);
                if ($queue.attr('src') === '') {
                    $queue.attr('src', src);
                    break;
                }
            }
        },
        hover: function () {
            // this.audio_src='audio/box_large_button.mp3';
            this.queueAudio('audio/box_large_button.mp3');
            // $('.toggleAudio').attr('src', 'audio/box_large_button.mp3');
        },
        clickAudio: function () {
            // this.audio_src='audio/box_hub_button.mp3';
            this.queueAudio('audio/box_hub_button.mp3');
            // $('.toggleAudio').attr('src', 'audio/box_hub_button.mp3');
        },
        clickScreen: function () {
            //关闭好友列表
            this.friendsList = false;
            //如果
            if (this.settingClass === 'showSetting')
                this.settingClass = 'hideSetting';
            //mask无法在开包时关闭
            if (!this.isAnimate[0])
                this.mask = false;
        },
        toggleFriends: function () {
            this.friendsList = !this.friendsList;
            this.mask = true;
        },
        toggleSetting: function () {
            //切换状态
            // console.log(this.settingClass);
            if (this.settingClass === 'showSetting')
                this.settingClass = 'hideSetting';
            else
                this.settingClass = 'showSetting';
            this.mask = true;
            // console.log(this.settingClass);
        },
        zuobi: function () {
            gold_probability = (gold_probability === 0.01) ? 0.6 : 0.01;
            purple_probability = (purple_probability === 0.04) ? 0.25 : 0.04;
            blue_probability = (blue_probability === 0.25) ? 0.1 : 0.25;
            this.toggleSetting();
            this.randomCard();
        },
        close: function () {
            window.close();
        },
        back: function () {
            this.queueAudio('audio/Back_Click.mp3');
            // $('.toggleAudio').attr('src', 'audio/Back_Click.mp3');
            setTimeout(function () {
                window.location.assign('index.html');
            }, 800);
        },
        clear: function (event) {
            $(event.currentTarget).context.src = '';
        }
    }
});