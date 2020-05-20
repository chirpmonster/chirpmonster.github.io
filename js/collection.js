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