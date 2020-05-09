function load() {
    $('.bigimgDiv div').fadeOut();
    $('.bigimgDiv img').fadeOut();
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
        bigimg: {src: 'img/loading.gif', num: 0}, //改变大图地址
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
            for (i in this.profession_img)
                this.profession_img[i].isChosen = false;
            this.profession_img[num].isChosen = true;
            this.profession = this.profession_img[num].profession;
        },
        //图片变大与模糊
        cardMove: function (num) {
            //移除先前操作的class，用于解决z-index错位问题
            this.card_img[this.bigimg.num].class = '';
            //给bigimg一个src
            this.bigimg.src = this.card_img[num].src;
            //保存当前bigimg的序号
            this.bigimg.num = num;
            //添加带有移动动画的class
            this.card_img[num].class = 'cardMove' + num;
            //添加遮罩层，通过:class='{shadow:isShadow}'实现
            this.isShadow = true;
            //显示bigimg
            this.timer = setTimeout(function () {
                //解决窗口模式下的错位问题
                let top = $('.absimg').eq(num).offset().top;
                let left = $('.absimg').eq(num).offset().left;
                $('.bigimg').css('top', top);
                $('.bigimg').css('left', left);
                $('.bigimg').fadeIn(100);
            }, 300);
        },
        //点掉大图，通过遮罩层实现点击事件，通过:class实现动画切换
        hidebigimg: function () {
            this.isShadow = false;
            //添加带有隐藏的动画的class
            this.card_img[this.bigimg.num].class = 'hideCard' + this.bigimg.num;
            //中止出现动画，防止连续点击出现bug
            clearTimeout(this.timer);
            //隐藏bigimg
            $('.bigimg').stop().css('display', 'none');
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
            if ($('.my_deck_button').attr('value') === '返回')
                $('.toggleAudio').attr('src', 'audio/Back_Click.mp3');
            setTimeout(function () {
                window.location.assign('index.html');
            }, 800);
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
        gold: 1000,
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
        gold: 1000,
        settingClass: '',
        opening: false,
        isAnimate: [false, false, false, false, false, false],
        isRotate: [null, false, false, false, false, false],
        time: 0
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
        //esc事件
        keydown_esc: function () {
            if (this.friendsList)
                this.friendsList = !this.friendsList;
            else
                this.toggleSetting();
        },
        keydown_space: function () {
            //按键间隔
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
                    this.openCard(1);
                    this.openCard(2);
                    this.openCard(3);
                    this.openCard(4);
                    this.openCard(5);
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
            this.isAnimate = [true, true, true, true, true, true];
            this.mask = true;
        },
        //完成按钮，重置属性
        closepack: function () {
            this.isAnimate = [false, false, false, false, false, false];
            this.isRotate = [null, false, false, false, false, false];
            this.mask = false;
            $('.packFinish').fadeOut(200);
        },
        //翻转卡牌
        openCard: function (num) {
            //这一行代码花了一个多小时...没这句看起来像废话的话无法执行..怀疑是引用类型的问题？浅拷贝，也可能是v-bind在数组某一项变化的时候无法生效的原因
            this.isAnimate = [this.isAnimate[0], this.isAnimate[1], this.isAnimate[2], this.isAnimate[3], this.isAnimate[4], this.isAnimate[5]];
            this.isAnimate[num] = false;
            this.isRotate[num] = true;
            if (this.isRotate[1] === true && this.isRotate[2] === true && this.isRotate[3] === true && this.isRotate[4] === true && this.isRotate[5] === true)
                //想用渐变效果，所以没用v-show
                $('.packFinish').fadeIn(500);
        },
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
        close: function () {
            window.close();
        },
        back: function () {
            $('.toggleAudio').attr('src', 'audio/Back_Click.mp3');
            setTimeout(function () {
                window.location.assign('index.html');
            }, 800);
        }
    }
});