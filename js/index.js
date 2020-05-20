function load() {
    $('.bigImgDiv div').fadeOut(100);
    $('.bigImgDiv img').fadeOut(100);
    $('.main').fadeIn(1000);
}

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