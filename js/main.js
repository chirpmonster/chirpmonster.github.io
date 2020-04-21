var a = 0;
var Vue1 = new Vue({
    el: '#everything',
    data: {
        profession_img: [{src: "img/zhiye1.png", isChosen: false, profession: "萨满"},
            {src: "img/zhiye2.png", isChosen: false, profession: "战士"},
            {src: "img/zhiye3.png", isChosen: false, profession: "法师"},
            {src: "img/zhiye4.png", isChosen: false, profession: "德鲁伊"},
            {src: "img/zhiye5.png", isChosen: false, profession: "牧师"},
            {src: "img/zhiye6.png", isChosen: false, profession: "圣骑士"},
            {src: "img/zhiye7.png", isChosen: false, profession: "猎人"},
            {src: "img/zhiye8.png", isChosen: false, profession: "术士"},
            {src: "img/zhiye9.png", isChosen: false, profession: "潜行者"},],
        card_img: [{src: "img/card1.png", class: false, profession: "萨满"},
            {src: "img/card2.png", class: "", profession: "战士"},
            {src: "img/card3.png", class: "", profession: "法师"},
            {src: "img/card4.png", class: "", profession: "德鲁伊"},
            {src: "img/card5.png", class: "", profession: "牧师"},
            {src: "img/card6.png", class: "", profession: "圣骑士"},
            {src: "img/card7.png", class: "", profession: "猎人"},
            {src: "img/card8.png", class: "", profession: "术士"},],
        nums: ["0", "1", "2", "3", "4", "5", "6", "7+"],
        decks: ["img/touxiang1.png",
            "img/touxiang2.png",
            "img/touxiang3.png",
            "img/touxiang4.png",
            "img/touxiang6.png",
            "img/touxiang5.png",
            "img/touxiang7.png"],
        profession: "萨满", //显示的职业
        isShadow: false,
        bigimg: {src: "", num: 0}, //改变大图地址
        timer: "", //定时器
        currentNum: "", //识别当前的点击的费用
        currentTarget: "", //记录操作的div
        isabled: false, //判断是否两次点击
        isdeleting: false, //阻止点删除的时候冒泡
    },
    mounted: function () {
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
            this.bigimg.src = this.card_img[num].src;
            this.bigimg.num = num;
            this.card_img[num].class = "cardMove" + num;
            this.isShadow = true;
            //避免大图的模糊效果
            this.timer = setTimeout(function () {
                $(".bigimg").fadeIn(100);
            }, 200)
        },
        //点掉大图，通过遮罩层实现点击事件，通过:class实现动画切换
        hidebigimg: function () {
            this.isShadow = false;
            this.card_img[this.bigimg.num].class = "hideCard" + this.bigimg.num;
            clearTimeout(this.timer);
            $(".bigimg").stop().css("display", "none");
        },
        //选择法力消耗
        clicknums: function (event) {
            $(event.currentTarget).siblings().removeClass("opacity");
            //判断是否第二次点击
            if (this.currentNum === event.currentTarget) {
                $(event.currentTarget).removeClass("opacity");
                this.currentNum = "";
            } else {
                $(event.currentTarget).addClass("opacity");
                this.currentNum = event.currentTarget;
            }
        },
        //点击某个卡组之后卡组置顶，出现卡组详情
        clickMy_deck: function (event) {
            //判断是否连续点击
            if (!this.isabled && !this.isdeleting) {
                this.currentTarget = event.currentTarget;
                //由于display之后位置会变，就先给一个位置，然后进行动画
                $(this.currentTarget).css("top", this.currentTarget.offsetTop - 79);
                $(this.currentTarget).addClass("deckMove");
                $(this.currentTarget).siblings().css("display", "none");
                //旋转切换
                $(".my_deck_list").removeClass("my_deck_list_hide");
                $(".my_deck_list").addClass("my_deck_list_show");
                $(".my_deck_button").attr("value", "完成");
                //放大的时候隐藏删除按键
                $(".delete_deck").css("display","none");
                this.isabled = true;
            }
            this.isdeleting = false;
        },
        //点击返回按钮
        clickButton: function () {
            if ($(".my_deck_button").attr("value") === "返回")
                alert("主页制作中！");
            if ($(".my_deck_button").attr("value") === "完成") {
                //重置this.isabled
                this.isabled = false;
                //旋转回来
                $(".my_deck_list").removeClass("my_deck_list_show")
                $(".my_deck_list").addClass("my_deck_list_hide");
                //恢复正常
                $(this.currentTarget).siblings().css("display", "block");
                $(this.currentTarget).removeClass("deckMove");
                $(this.currentTarget).css("top", 0);
                //显示删除按键
                $(".delete_deck").css("display","inline");
                $(".my_deck_button").attr("value", "返回");
            }
        },
        //删卡组,使用阻止冒泡失败，原因不明，采用修改参数达到阻止冒泡的效果
        deletedeck: function (num) {
                this.decks.splice(num, 1);
                this.isdeleting = true;
        }
    }
});