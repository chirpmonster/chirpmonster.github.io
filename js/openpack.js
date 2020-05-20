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
        card: [null, {src: ''}, {src: ''}, {src: ''}, {src: ''}, {src: ''}],
        whiteNum:0,
        blueNum:0,
        purpleNum:0,
        goldNum:0,
        history:[]
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
                this.history.push(this.card[i]);
                //console.log(this.history);
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
            if (this.card[num].quality === 'gold'){
                this.queueAudio('audio/gold.mp3');
                this.goldNum++;
            }
            else if (this.card[num].quality === 'purple'){
                this.queueAudio('audio/purple.mp3');
                this.purpleNum++;
            }
            else if (this.card[num].quality === 'blue'){
                this.queueAudio('audio/blue.mp3');
                this.blueNum++;
            }
            else{this.whiteNum++}
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