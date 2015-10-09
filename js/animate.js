// console.log
var App = App||{};
App.animate = App.animate || function(){
	"use strict"

	var self = $("#animate");

	function init(){
		//console.log("animate.startup...");
		buildListeners();
	}

	function buildListeners(){
		$(window).bind("loadingComplete", function(){
			pdAnimate();

			waveAnimate();
			waveAnimate2();
			seagullAnimate1();
			seagullAnimate2();
			seagullAnimate3();
			seagullAnimate4();
			peopleAnimate();
		});
	}

	var _idx=7, _prevIdx=0;
	function pdAnimate(){
		setTimeout(function(){
			_prevIdx=_idx;
			_idx--;
			if (_idx<1){
				_idx=7;
				$(".ipd"+_idx).fadeIn(700);
				$(".ipd"+_prevIdx).fadeOut(700);
			} else {
				$(".ipd"+_idx).show();
				$(".ipd"+_prevIdx).fadeOut(700);
			}
			
			pdAnimate();
		}, 2000);
	}

	function waveAnimate(){
		TweenLite.to(".c4l", 2, {
			top:702,
			ease:Sine.easeInOut,
			onComplete:function(){
				TweenLite.to(".c4l", 2, {
					top:722,
					ease:Sine.easeInOut,
					onComplete:waveAnimate
				});
			}
		})
	}

	function waveAnimate2(){
		TweenLite.to(".c4l-2", 2, {
			top:742,
			ease:Sine.easeInOut,
			delay:.2,
			onComplete:function(){
				TweenLite.to(".c4l-2", 2, {
					top:722,
					ease:Sine.easeInOut,
					onComplete:waveAnimate2
				});
			}
		})
	}

	function seagullAnimate1(){
		TweenLite.to(".seagull1", 1, {
			marginTop:-26,
			ease:Linear.easeNone,
			onComplete:function(){
				TweenLite.to(".seagull1", 1, {
					marginTop:-46,
					ease:Linear.easeNone,
					onComplete:seagullAnimate1
				});
			}
		})
	}

	function seagullAnimate2(){
		TweenLite.to(".seagull2", .8, {
			marginTop:-66,
			ease:Linear.easeNone,
			onComplete:function(){
				TweenLite.to(".seagull2", .8, {
					marginTop:-46,
					ease:Linear.easeNone,
					onComplete:seagullAnimate2
				});
			}
		})
	}

	function seagullAnimate3(){
		TweenLite.to(".seagull3", .6, {
			marginTop:-26,
			ease:Linear.easeNone,
			onComplete:function(){
				TweenLite.to(".seagull3", .6, {
					marginTop:-46,
					ease:Linear.easeNone,
					onComplete:seagullAnimate3
				});
			}
		})
	}

	function seagullAnimate4(){
		TweenLite.to(".seagull4", .75, {
			marginTop:-40,
			ease:Linear.easeNone,
			onComplete:function(){
				TweenLite.to(".seagull4", .75, {
					marginTop:-46,
					ease:Linear.easeNone,
					onComplete:seagullAnimate4
				});
			}
		})
	}

	function peopleAnimate(){
		TweenLite.to(".people", 2, {
			rotation:5,
			transformOrigin:"69% 0",
			ease:Quart.easeInOut,
			onComplete:function(){
				TweenLite.to(".people", 2, {
					rotation:-15,
					transformOrigin:"69% 0",
					ease:Quart.easeInOut,
					onComplete:peopleAnimate
				});
			}
		})
	}

	return {
		startup:init
	}
}();
App.animate.startup();