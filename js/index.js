var ydata = 0;
var loginstate;
var musicState = 0;
var audioObj = document.getElementsByTagName('audio')[0];
audioObj.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
audioObj.play();
audioObj.volume = 0.8;
$.aniMusicObj = $({
    aniVolumn: 0.8
});
var initial = {
    initialFun: function() {
        $.Window.resize(resizeit.resizeFun).trigger('resize');
        animateFun.scrollFun();
        if (isIE8) {
            $('div.music').hide();
        } else {
            musicwork.musicon();
        }
    }
}
var animateFun = {
    navFun: function() {
        $('.navb').on('click', function() {
            if (!$('.sec_back').is(':animated')) {
                if ($(this).hasClass('navpre')) {
                    if (ydata > 0 && !$('.sec_back').is(':animated')) ydata--;

                } else if ($(this).hasClass('navnext')) {
                    if (ydata < 4 && !$('.sec_back').is(':animated')) ydata++;

                }
                animateFun.secAddclass(ydata);
            }
        });
        $('.navBox ul li').on('click', function() {
            if (ydata != $(this).index()) {
                ydata = $(this).index();
                //console.log(this.snum);
                animateFun.secAddclass(ydata);
            }
        });
    },
    scrollFun: function() {
        $.Wrapper.on('mousewheel', function(event) {
            if (!$('.sec_back').is(':animated')) {
                if (event.deltaY < 0) { //down
                    if (2 < ydata && ydata < 3) {
                        ydata = 3;
                    } else {
                        ydata++;
                        if (ydata > 4) {
                            ydata = 4;
                        } else {
                            animateFun.secAddclass(ydata);
                        }
                    }
                } else { // up
                    if (2 < ydata && ydata < 3) {
                        ydata = 2;
                    } else {
                        ydata--;
                        if (ydata < 0) {
                            ydata = 0;
                        } else {
                            animateFun.secAddclass(ydata);
                        }
                    }
                }
            }
            //console.log(ydata, event.deltaY);
        });
        animateFun.navFun();
        animateFun.clickFun();
    },
    secAddclass: function(snum) {
        ga('send', 'pageview', 'page' + parseInt(snum + 1));
        var secw = $('.sec').eq(snum).position().left;
        var offset = (1600 - $.Window.width()) / 2;
        var gotoleft = secw * -1 - offset;

        $('.navBox ul li').eq(snum).css({
            'width': 0,
            'height': 0,
            'border-width': 9
        }).find('span').css({
            'color': '#000'
        }).parent().siblings().removeAttr('style').find('span').removeAttr('style');
        // console.log(this.gotoleft);
        if (snum == 0) {
            gotoleft = offset * -1;
            $('.navpre').hide().siblings().show();
        } else if (snum == 1) {

        } else if (snum == 4) {
            $('.navnext').hide().siblings().show();

        } else {
            $('.navpre').show().siblings().show();
        }
        aniScroll('.sec_back', 0);
        aniScroll('.sec_middle', 80);
        aniScroll('.sec_front', 140);

        function aniScroll(obj, del) {
            $(obj).stop();
            $(obj).stop().delay(del).animate({
                left: gotoleft
            }, 1000, "easeInOutCubic");
        }
    },
    clickFun: function() {
        $('.ib1').on('click', function() {
            GT("index", "clk", "go1");
            animateFun.secAddclass(ydata = 1);
        });
        $('.ib2').on('click', function() {
            GT("index", "clk", "go2");
            animateFun.secAddclass(ydata = 2);
        });
        $('#v1').on('click', function() {
            GT("page2", "clk", "vd90");
            player.loadVideoById('NEkH768b_Rg');
            $(this).css({
                'background-position': 0 + ' -' + 33 + 'px'
            }).siblings().removeAttr('style');
        });
        $('#v2').on('click', function() {
            GT("page2", "clk", "vd30");
            player.loadVideoById('NP1m81zevqE');
            $(this).css({
                'background-position': -128 + 'px  -' + 33 + 'px'
            }).siblings().removeAttr('style');
        });
        $('#v3').on('click', function() {
            GT("page2", "clk", "vd20");
            player.loadVideoById('qZszKP4Qwbg');
            $(this).css({
                'background-position': -256 + 'px  -' + 33 + 'px'
            }).siblings().removeAttr('style');
        });
        $('.fbshare').on('click', function() {
            GT("page2", "clk", "gofbshare");
            fb_login();
            loginstate = 'share';
        });
        $('.fbcancel').on('click', function() {
            GT("page2", "clk", "gofbcancel");
            $('.cover').fadeOut().find('.shareVideo').removeAttr('style');
            animateFun.secAddclass(ydata = 2);
        });
        $('.serialBtn').on('click', function() {
            GT("page2", "clk", "fbshib");
            $('.cover').fadeOut().find('.ibonSerial').removeAttr('style');
            animateFun.secAddclass(ydata = 3);
        });
        $('.cut3b1').on('click', function() {
            GT("page3", "clk", "enter_vd");
            $('.cover').fadeIn().find('.videoChallenge').show();
            player2.playVideo();
            musicwork.musicoff();
        });
        $('.cut3b2').on('click', function() {
            GT("page3", "clk", "enter");
            $('.sec_all').stop().animate({
                left: '-=1500'
            }, 1000, "easeInOutCubic");
            ydata = 2.5;
            challenge.createQ();
        });
        $('.closebtn').on('click', function() {
            GT("page3", "clk", "closevideo");
            player2.stopVideo(0);
            player2.seekTo(0);
            $('.cover').fadeOut().find('.videoChallenge').removeAttr('style');
            $('.sec_all').stop().animate({
                left: '-=1500'
            }, 1000, "easeInOutCubic");
            ydata = 2.5;
            challenge.createQ();
        });
        $('.again').on('click', function() {
            GT("page3", "clk", "again");
            $('.cover').fadeOut().find('.replay').removeAttr('style');
            animateFun.secAddclass(ydata = 2);
        });
        $('.cancel').on('click', function() {
            GT("page3", "clk", "giveup");
            $('.cover').fadeOut().find('.replay').removeAttr('style');
            animateFun.secAddclass(ydata = 3);
        });
        $('.go').on('click', function() {
            GT("page3", "clk", "lottery");
            $.ajax({
                url: 'http://uni-sport.campaigns.com.tw/api/?mode=lottery',
                type: 'POST',
                data: {
                    fbid: FB_ID
                },
                dataType: "json",
                success: function(resp) {
                    if (resp.state == 0) { //錯誤
                        $('.cover').fadeOut().find('.lottery').removeAttr('style').find('.begin').removeAttr('style');
                        alert('error!請稍後再試');
                    }
                    if (resp.state == 1) { //中獎
                        $('.begin').fadeOut().next().show().find('.resultp').css({
                            'background-image': 'url(img/result1.png)'
                        });
                        $('.result1').show();
                        $("#q-text input[name='wid']").val(resp.data);
                    }
                    if (resp.state == 2) { //未中獎
                        $('.begin').fadeOut().next().show().find('.resultp').css({
                            'background-image': 'url(img/result2.png)'
                        });
                        $('.result2').show();
                    }
                    if (resp.state == 3) {
                        alert('感謝您的熱心參與！禮券已發送完畢');
                        $('.cover').fadeOut().find('.lottery').removeAttr('style').find('.begin').removeAttr('style');
                        animateFun.secAddclass(ydata = 3);
                    }
                    if (resp.state == 4) {
                        alert('感謝您的熱心參與！當日不可重覆抽獎');
                        $('.cover').fadeOut().find('.lottery').removeAttr('style').find('.begin').removeAttr('style');
                        animateFun.secAddclass(ydata = 3);
                    }
                    if (resp.state == 5) {
                        alert('感謝您的熱心參與！當日已達中獎日限額');
                        $('.cover').fadeOut().find('.lottery').removeAttr('style').find('.begin').removeAttr('style');
                        animateFun.secAddclass(ydata = 3);
                    }
                    if (resp.state == 6) {
                        alert('感謝您的熱心參與！當週已達中獎週限額');
                        $('.cover').fadeOut().find('.lottery').removeAttr('style').find('.begin').removeAttr('style');
                        animateFun.secAddclass(ydata = 3);
                    }
                    if (resp.state == 7) {
                        alert('感謝您的熱心參與！已中獎不可再重覆抽獎');
                        $('.cover').fadeOut().find('.lottery').removeAttr('style').find('.begin').removeAttr('style');
                        animateFun.secAddclass(ydata = 3);
                    }

                },
                error: function() {
                    alert('error!請稍後再試');
                    $('.cover').fadeOut();

                }
            });
        });
        $('.result1').on('click', function() {
            GT("page3", "clk", "info1");
            $(this).removeAttr('style').parent().hide().parent().fadeOut().next().fadeIn();
            init_address();
        });
        $('.result2').on('click', function() {
            GT("page3", "clk", "info2");
            $(this).removeAttr('style').parent().hide().parent().hide().parent().fadeOut();
            animateFun.secAddclass(ydata = 3);

        });
        $('.cover,.ruleBox').on('mousewheel', function(event) {
            event.stopPropagation();
        });
        $('.music').click(function() {
            if (musicState == 1) {
                musicwork.musicon();
            } else {
                musicwork.musicoff();
            }
        });
        $('.winb').on('click', function() {
            GT("index", "clk", "winner");
            $.ajax({
                url: 'http://uni-sport.campaigns.com.tw/api/?mode=getlotterylist',
                type: 'GET',
                dataType: "json",
                success: function(resp) {
                    $('.wsec').html('');
                    if (resp.state == 1) {
                        for (var i in resp.data) {
                            $('.wsec').append('<div class="wline"><span>' + decodeURI(resp.data[i].name) + '</span><span>' + resp.data[i].tel + '</span></div>')
                        }
                        $('.cover').fadeIn().find('.winner').show();
                    } else {
                        alert('獎項尚未開出喔！等你來參加！');
                        //$('.cover').fadeOut().find('.winner').hide();
                    }
                },
                error: function() {
                    alert('error!請稍後再試');
                    $('.cover').fadeOut().find('.winner').removeAttr('style');

                }
            });
        });
        $('.closew').on('click', function() {
            $('.cover').fadeOut().find('.winner').removeAttr('style');
        });

    }
}
var challenge = {
    temp: -1,
    createQ: function() {
        $('.qs>div,.steps').removeAttr('style');
        var random = Math.floor(Math.random() * 7);
        var str;
        while (random == challenge.temp) {
            random = Math.floor(Math.random() * 7);
        }
        $.ajax({
            type: "GET",
            url: "e.xml",
            dataType: "xml",
            success: function(xml) {
                for (i = 1; i < 4; i++) {
                    $('.q' + i).html('');
                    var Q = $(xml).find('LEVEL' + i + ' QSET').eq(random);
                    str = '<div class="qtit">' + Q.find('QT').text() + '</div><div class="radio r' + i + '">';
                    for (j = 0; j < Q.find('ANS').length; j++) {
                        str += '<input id="q' + i + j + '" type="radio" name="q' + i + '" value="' + parseInt(j + 1) + '"><label for="q' + i + j + '"><span><span></span></span>' + Q.find('ANS').eq(j).text() + '</label></br>';
                    }
                    str += '</div><div class="sel send"></div>';
                    $('.q' + i).attr('fans', Q.attr('TN')).append(str);
                    $('.q' + i + ' .send').on('click', function() {
                        if (!$(this).parent().find('input').is(':checked')) {
                            alert('請選擇一個答案唷！')
                        } else if ($(this).parent().find('input:checked').val() != $(this).parent().attr('fans')) {
                            $('.cover').fadeIn().find('.replay').show();
                        } else {
                            if ($(this).parent().index() != 2) {
                                $(this).parent().fadeOut().next().fadeIn();
                            } else {
                                loginstate = 'challenge';
                                fb_login();
                            }
                            $('.steps').css({
                                'background-position': -331 * ($(this).parent().index() + 1) + 'px ' + 0
                            });
                        }
                    });
                }
                challenge.temp = random;
            },
            error: function(e) {
                console.log(e);
                alert('出現錯誤！請稍後再試！')
            }
        });
    }
}
var resizeit = {
    resizeFun: function() {
        animateFun.secAddclass(ydata = 0);
        if ($.Window.width() > $.Window.height()) {
            if ($.Window.height() <= 980) {
                this.nav = 3.5;
            } else {
                this.nav = $.Window.height() / $.Window.width() * 20;
            }
        }
        $('.nav').css({
            'top': this.nav + "%"
        });
    }
}

var musicwork = {
        musicoff: function() {
            musicState = 1;
            $.aniMusicObj.stop().animate({
                aniVolumn: 0
            }, {
                step: function(now, fx) {
                    audioObj.volume = now;
                },
                duration: 500,
                complete: function() {
                    audioObj.pause();
                }
            });
            $('.music').css({
                'background-position': -30 + 'px  ' + 0
            })
        },
        musicon: function() {
            $('.music').css({
                'background-position': 0 + '  ' + 0
            });
            musicState = 0;
            $.aniMusicObj.stop().animate({
                aniVolumn: 0.8
            }, {
                step: function(now, fx) {
                    audioObj.volume = now;
                },
                duration: 500,
                complete: function() {
                    audioObj.play();
                }
            });
        }
    }
    //*****去除 png圖 黑邊*****
var PngFix = {
    PngFixF: function(obj) {
        obj.find('img[src$=".png"],img[src$=".gif"]').each(function() {
            this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='" + this.src + "')";
        });
    }
}

//var _resize = new resizeit();
//var _animateFun = new animateFun();
$.Body = $('body');
$.Window = $(window);
$.Wrapper = $.Body.find('div.wrapper');
$.Loading = $.Body.find('div.loading');
$.navbg = $('.navbg');
var $imgs = $('body img'),
    count = 0;
$imgs.imagesLoaded().progress(function(instance, image) {
    count++;
    percent = Math.round(count / $imgs.length * 100);
    $('.loading .percent').html(percent + '%');
    if (count == $imgs.length) {
        PngFix.PngFixF($.Body);
        $.Loading.fadeOut();
        initial.initialFun();
        $(window).trigger("loadingComplete");
    }

});
