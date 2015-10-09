function animateFun() {
    var _self = this;
    var ydata = 0;
    this.navFun = function() {
        $('.navpre').on('click', function() {
            if (ydata > 0) ydata--;
            _self.secAddclass(ydata);
        });
        $('.navnext').on('click', function() {
            if (ydata < 4) ydata++;
            _self.secAddclass(ydata);
        });
        $('.navBox ul li').on('click', function() {
            ydata = $(this).index();
            //console.log(this.snum);
            _self.secAddclass(ydata);
        });
    }
    this.scrollFun = function() {
        $.Wrapper.on('mousewheel', function(event) {
            if (event.deltaY < 0) { //down
                ydata++;
                if (ydata >= 4) ydata = 4;
            } else { // up
                ydata--;
                if (ydata <= 0) ydata = 0;
            }
            _self.secAddclass(ydata);
            console.log(ydata);
        })

    }
    this.secAddclass = function(snum) {
        $('.navBox ul li').eq(snum).css({
            'width': 0,
            'height': 0,
            'border-width': 9
        }).find('span').css({
            'color': '#000'
        }).parent().siblings().removeAttr('style').find('span').removeAttr('style');
        // console.log(this.gotoleft);
        if (snum == 0) {
            this.gotoleft = (1920 - $.Window.width()) / -2
        } else {
            this.gotoleft = $('.sec').eq(snum).position().left * -1;
        }
        $('.sec_all').stop().animate({
            left: this.gotoleft
        }, 1000, "easeInOutCubic");
    }


}


function resizeit() {
    this.nav = null;
    this.resizeFun = function() {
        if ($.Window.width() > 1000) {
            $('.sec_all').css({
                'left': (1920 - $.Window.width()) / -2
            });
            if ($.Window.height() <= 850) {
                this.nav = 3.5;
            } else {
                this.nav = $.Window.height() / $.Window.width() * 20;
            }
            $('.nav').css({
                'top': this.nav + "%"
            });
        }
    }
}


(function($) {
    //*****去除 png圖 黑邊*****
    $.fn.PngFix = function() {
        var _self = $(this)
        _self.find('img[src$=".png"],img[src$=".gif"]').each(function() {
            this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='" + this.src + "')";
        });
    }

})(jQuery);
var _resize = new resizeit();
var _animateFun = new animateFun();

$(function() {
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
        $('.loading .hr').css({
            'width': percent + '%'
        });
        if (count == $imgs.length) {
            $.Body.PngFix();
            $.Loading.fadeOut();
            $('.sec_all').css({
                'left': (1920 - $.Window.width()) / -2
            });

            $.Window.resize(_resize.resizeFun).trigger('resize');
            _animateFun.navFun();
            _animateFun.scrollFun();
            // _initial.init();

        }

    });

});
