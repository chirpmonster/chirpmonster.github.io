var Vue1 = new Vue({
    el: '#main',
    data: {
        occupy_img: [{src: "img/zhiye1.png", isChosen: false, thisoccupy: "萨满"},
            {src: "img/zhiye2.png", isChosen: false, thisoccupy: "战士"},
            {src: "img/zhiye3.png", isChosen: false, thisoccupy: "法师"},
            {src: "img/zhiye4.png", isChosen: false, thisoccupy: "德鲁伊"},
            {src: "img/zhiye5.png", isChosen: false, thisoccupy: "牧师"},
            {src: "img/zhiye6.png", isChosen: false, thisoccupy: "圣骑士"},
            {src: "img/zhiye7.png", isChosen: false, thisoccupy: "猎人"},
            {src: "img/zhiye8.png", isChosen: false, thisoccupy: "术士"},
            {src: "img/zhiye9.png", isChosen: false, thisoccupy: "潜行者"},],
        card_img: [{src: "img/card1.png", isChosen: false, thisoccupy: "萨满"},
            {src: "img/card2.png", isChosen: false, thisoccupy: "战士"},
            {src: "img/card3.png", isChosen: false, thisoccupy: "法师"},
            {src: "img/card4.png", isChosen: false, thisoccupy: "德鲁伊"},
            {src: "img/card5.png", isChosen: false, thisoccupy: "牧师"},
            {src: "img/card6.png", isChosen: false, thisoccupy: "圣骑士"},
            {src: "img/card7.png", isChosen: false, thisoccupy: "猎人"},
            {src: "img/card8.png", isChosen: false, thisoccupy: "术士"},],
        nums: ["0", "1", "2", "3", "4", "5", "6", "7+"],
        decks: ["img/touxiang1.png",
            "img/touxiang2.png",
            "img/touxiang3.png",
            "img/touxiang4.png",
            "img/touxiang6.png",
            "img/touxiang5.png",
            "img/touxiang7.png"],
        occupy: "萨满"
    },
    mounted: function () {
        this.chosen(0);
    },
    methods: {
        chosen: function (num) {
            for (i in this.occupy_img)
                this.occupy_img[i].isChosen = false;
            this.occupy_img[num].isChosen = true;
            this.occupy = this.occupy_img[num].thisoccupy;
        }
    }
});