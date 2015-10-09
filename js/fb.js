// function FB_APP(){
var PARAM_SCOPE = 'public_profile';
var FB_STATE = 'out'
var FB_ID = '0',
    FB_NAME = '0';
var scr, scr2;
var msg;
var purl;
var WEB_SITE = "http://uni-sport.campaigns.com.tw/";
var sdid;
/////////////////////////////////////////////
//interface 
///////////////////////////////////////////
this.get_FB_STATE = function() {
    return FB_STATE;
}
this.get_FBID = function() {
    return FB_ID;
}
this.get_FB_NAME = function() {
    return FB_NAME;
}
this.get_fb_login = function() {
    fb_login();
}
this.get_ui_post = function() {
    ui_post(msg, purl);
}
this.set_ui_post_params = function(a, b) {
    purl = a;
    msg = b;
}

////CALLBACK ASSET////////////////
function end_getFBInfo() {
    if (loginstate == 'share') {
        ui_post();
    }else if(loginstate == 'challenge') {
        $('.cover').fadeIn().find('.lottery').show().find('.begin').show();
    } else {

    }
}
////END  CALLBACK ASSET////////////////

window.fbAsyncInit = function() {
    FB.init({
        appId: '1472848899683452',
        xfbml: true,
        version: 'v2.4'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/***like box**/
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function get_FBInfo() {
    // console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        //printlog(response["id"] + response["name"] )
        FB_ID = response["id"];
        FB_NAME = response["name"];
        end_getFBInfo();
    });
}

function fb_login() {
    FB.login(function(response) {
        checkLoginState();
    }, {
        scope: PARAM_SCOPE
    });
}
///////
//
///////
function statusChangeCallback(response) {

    if (response.status === 'connected') {
        ///登入
        FB_STATE = 'in';
        get_FBInfo();
    } else if (response.status === 'not_authorized') {
        FB_STATE = 'outa';
        alert('您放棄了抽獎機會! 好可惜喔~~');
        if(loginstate =='challenge'){
            animateFun.secAddclass(ydata = 2);
        }
    } else {
        FB_STATE = 'out';
        alert('您放棄了抽獎機會! 好可惜喔~~');
        if(loginstate =='challenge'){
            animateFun.secAddclass(ydata = 2);
        }
    }
}

function ui_post() {
    //GT("index" , "index","fb_post");
    FB.ui({
            method: 'feed',
            name: "UNI SPORT 腦筋運動會",
            caption: '分享時尚影片，立即拿UNI SPORT優惠，挑戰腦筋運動會，還能再抽７－１１禮券，青春只有一次，優惠也只有這次！ＧＯ！',
            description: '水漾男、女神的好感單品─繽紛UNI SPORT讓你補水更時尚！',
            link: WEB_SITE,
            picture: 'http://uni-sport.campaigns.com.tw/img/fb2.jpg'
        },
        function(response) {
            $('.shareVideo').fadeOut();
            if (response && response.post_id) {
                GT("page2","clk","fbs");
                $.ajax({
                    url: 'http://uni-sport.campaigns.com.tw/api/?mode=getibonno',
                    type: 'POST',
                    data: {
                        fbid: FB_ID
                    },
                    dataType: "json",
                    success: function(resp) {
                        if (resp.state == 1) { //新ID
                           $('.serial').html(resp.data[0].sn);
                           $('.ibonSerial').show();
                        } else{
                            if (resp.state == 2) { //舊ID
                            alert('您已領取過序號，感謝您的熱心參與！');
                            $('.cover').fadeOut().find('.shareVideo').hide();
                            animateFun.secAddclass(ydata = 2);
                            } else if (resp.state == 3) {
                                alert('感謝您的熱心參與！序號己發送完畢');
                                $('.cover').fadeOut().find('.shareVideo').hide();
                                animateFun.secAddclass(ydata = 2);
                            }else{
                                alert('error!請稍後再試');
                                $('.cover').fadeOut().find('.shareVideo').hide();
                                animateFun.secAddclass(ydata = 2);
                            }
                        } 
                    },
                    error: function(){
                        alert('error!請稍後再試');
                        $('.cover').fadeOut().find('.shareVideo').hide();
                        animateFun.secAddclass(ydata = 2);

                    }
                });   
            } else {
                GT("page2","clk","fbsh");
                $('.cover').fadeOut().find('.shareVideo').hide();
                animateFun.secAddclass(ydata = 2);
            }
        }
    );
}
