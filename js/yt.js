  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-67621158-1', 'auto');
  // ga('send', 'pageview');

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
function GT(category,action,label){
    // console.log(category+";"+action+";"+label)
  ga('send','event',category,action,label, 1);  
}//


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player,player2;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ct2player', {
        height: '359',
        width: '639',
        videoId: 'NEkH768b_Rg',
        playerVars: {
            'autoplay': 0,
            'rel': 0,
            'showinfo': 0,
            'egm': 0,
            'wmode': 'transparent',
            'modestbranding': 1,
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    player2 = new YT.Player('Cplayer', {
        height: '359',
        width: '639',
        videoId: 'NEkH768b_Rg',
        playerVars: {
            'autoplay': 0,
            'rel': 0,
            'showinfo': 0,
            'wmode': 'transparent',
            'egm': 0,
            'modestbranding': 1,
        },
        events: {
            
        }
    });
}

var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        musicwork.musicoff();
    }
    if (event.data == YT.PlayerState.ENDED) {
        done = true;
        videoStop(done);
    }
}

function videoStop(done) {
    if (done) {
        $('.cover').fadeIn().find('.shareVideo').show();
    }
}

/***********************************************************************/
function checkStepform() {
    /*check Step1 form data */
    uName = $("#q-text input[name='uName']");
    tel = $("#q-text input[name='tel']");
    email = $("#q-text input[name='email']");    
    uCity = $("#zone1");
    uArea = $("#zone2");
    uAddr = $("#q-text input[name='address']");
    wid = $("#q-text input[name='wid']");
    
  
    var testmail = /^.+@.+\..{2,3}$/;
    var word = /^[A-Za-z]+$/;
    var num= /^[0-9]+$/;
    var specialChars = /^[a-zA-Z0-9]+$/;
    var Chinese = /^[\u4e00-\u9fa5]+$/;
    //var cellPhone = /^09[0-9]{8}+$/;
    var str="";
  
   
    if(uName.val() == "") {
        str+="請填入中文全名 !\n";
    }else if( !Chinese.test(uName.val())){
        str+="請以中文填入全名 !\n";
    }
    if($.trim(tel.val()) == "") {
        str+="請填入電話號碼 !\n";
    }else if(tel.val().length < 9) {
        str+="請填入完整電話號碼 !\n";
    }else if(isNaN(tel.val())) {
        str+="請以數字填入電話號碼 !\n";
    }
    if(email.val() == "") {
        str+="請填入電子信箱 !\n";
    }else if(!checkEmail( email.val())) {
        str+="電子信箱 不正確 !\n";
    }if(uCity.val() == "") {
        str+="請選擇 縣市 !\n";
    }if(uArea.val() == "") {
        str+="請選擇 區域 !\n";
    }if(uAddr.val() == "" ) {
        str+="請填入完整地址 !\n";
    }if(!document.getElementById("readRule").checked) {
        str+="請勾選 閱讀並同意 條款！\n";
    }if(!document.getElementById("sendRule").checked) {
        str+="請勾選 個資法同意使用 選項！\n";
    } 
    if(str!=""){ 
        alert(str);
      return false;
    }
    
    sendData();
    return true;
}


function sendData() {
    $.ajax({
        // url: 'http://uni-sport.campaigns.com.tw/api/index_bak.php?mode=updateuser',
        url: 'http://uni-sport.campaigns.com.tw/api/?mode=updateuser',
        type: 'POST',
        data: {
            id: wid.val(),
            fbid: FB_ID,
            name: uName.val(),
            tel: tel.val(),
            email: email.val(),
            addr: uCity.val()+uArea.val()+uAddr.val(),
        },
        dataType: "json",
        success: function(resp) {
            if (resp.state == 1){ 
               showAlert();
            }
        },
        error: function(){
            alert("出現錯誤，請稍後再試！");
            $('.cover').fadeOut().find('.infoform').hide();
            animateFun.secAddclass(ydata = 3);

        }
    });  
}
function showAlert(){
    alert('感謝您的熱心參與！資料已順利寄出');
    $('.cover').fadeOut().find('.infoform').hide();
    animateFun.secAddclass(ydata = 3);
}
//信箱格式判斷
function checkEmail(email) {
    EmailCheck = new RegExp(/^([a-zA-Z0-9]+)([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9\_\-]+)+$/)
    if (EmailCheck.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function ValidEmail(emailtoCheck) {
    // 規則: 1.只有一個 "@"
    //       2.網址中, 至少要有一個".", 且不能連續出現
    //       3.不能有空白和,

    var regExp = /^[^@^\s^,]+@[^\.@^\s^,]+(\.[^\.@^\s^,]+)+$/;
    if (emailtoCheck.match(regExp))
        return true;
    else
        return false;
}

function clearForm() {
    $("#q-text select[name= 'Product']").val(null);
    $("#q-text input[name= 'Pserial']").val('');
    $("#q-text input[name= 'Preceipt']").val('');
    $("#q-text select[name= 'Store']").val(null);
    $("#q-text input[name= 'Store_name']").val('');
    $("#q-text input[name= 'Buydate']").val('');
    $("#q-text input[name='uName']").val('');
    $("#q-text input[name='tel']").val('');
    $("#q-text input[name='email']").val('');    
    $("#zone1").val('');
    $("#zone2").val('');
    $("#q-text input[name='address']").val('');
    $("#step1frm input[name='zipcode']").val('');
    document.getElementById("readRule").checked = false;
    document.getElementById("sendRule").checked = false;
}
