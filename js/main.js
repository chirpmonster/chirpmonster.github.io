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
        profession: "萨满",
        isShadow: false,
        bigimg: {src: "", num: 0},
        timer: "",
        current: "",
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
            if (this.current === event.currentTarget) {
                $(event.currentTarget).removeClass("opacity");
                this.current = "";
            } else {
                $(event.currentTarget).addClass("opacity");
                this.current = event.currentTarget;
            }
        },
        //点击某个卡组之后卡组置顶，出现卡组详情
        clickmydeck: function (event) {
            var that = event.currentTarget;
            $(that).css("top", that.offsetTop - 68);
            $(that).addClass("deckMove");
            $(that).siblings().css("display", "none");
        }
    }
});