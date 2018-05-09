window.onload = function() {
    var docWidth = document.documentElement.clientWidth;
    var docHeight = document.documentElement.clientHeight;
    // logview1:view the log. logview2:small point. slog:console.log
    var mylogger = {
        options:{},
        logview: null,
        logview1: null,
        logview2: null,
        logview1Close: null,
        slog: null,
        getDateTime: function(){
            var date = new Date();
            return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '
                +date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'.'+date.getMilliseconds();
        },
        printLog: function(){
            var _this = mylogger;
            var msg = "";
            if (arguments.length>0){
                msg = arguments[0];
            }
            _this.slog.apply(this,arguments);

            var span = document.createElement("span");
            span.style.fontSize = "16px";
            span.innerHTML = _this.getDateTime()+'--'+msg+'<br><hr>';
            _this.logview1.appendChild(span);
            _this.logview1.scrollTop = _this.logview1.scrollHeight;
        },
        init: function (){
            var _this = mylogger;
            this.slog = console.log;
            console.log = this.printLog;
            var width = docWidth-60;
            var height = docHeight/3;
            this.logview = document.createElement("div");
            this.logview.style.width = width+"px";
            this.logview.style.height = height+"px";
            this.logview.style.left = "30px";
            this.logview.style.top = (docHeight/3*2-50)+"px";
            this.logview.style.backgroundColor = "white";
            this.logview.style.zIndex = "99999";
            this.logview.style.position = "absolute";
            this.logview.style.border = "1px solid red";
            this.logview.style.display = "none";
            document.getElementsByTagName("body")[0].appendChild(this.logview);

            this.logview1 = document.createElement("div");
            this.logview1.style.width = "100%";
            this.logview1.style.height = "100%";
            this.logview1.style.overflow = "auto";
            this.logview.appendChild(this.logview1);


            this.logview1Close = document.createElement("div");
            this.logview1Close.style.width = 50+"px";
            this.logview1Close.style.height = 50+"px";
            this.logview1Close.style.right = "0px";
            this.logview1Close.style.top = "0px";
            this.logview1Close.style.backgroundColor = "rgba(0,0,0,0.5)";
            this.logview1Close.style.borderRadius = "20px 20px 20px 20px";
            this.logview1Close.style.position = "absolute";
            this.logview1Close.style.textAlign = "center";
            this.logview1Close.innerText = "-";
            this.logview1Close.style.zIndex = "99999";
            this.logview.appendChild(this.logview1Close);

            this.logview1Close.addEventListener('touchend',function(event){
                _this.logview.style.display = "none";
                _this.logview2.style.display = "block";
            });

            //small boll
            this.logview2 = document.createElement("div");
            this.logview2.style.width = 60+"px";
            this.logview2.style.height = 60+"px";
            this.logview2.style.left = (docWidth-60)+"px";
            this.logview2.style.top = (docHeight/2)+"px";
            this.logview2.style.position = "absolute";
            this.logview2.style.background = "radial-gradient(circle,rgba(255,255,0,0.5),rgba(0,255,0,0.5))";
            this.logview2.style.borderRadius = "30px 30px 30px 30px";
            document.getElementsByTagName("body")[0].appendChild(this.logview2);
            var smX = 0;
            var smY = 0;
            var smStTime = 0;

            this.logview2.addEventListener('touchstart',function(ev){
                var oevent = ev || event;
                smX = oevent.touches[0].clientX - _this.logview2.offsetLeft;
                smY = oevent.touches[0].clientY - _this.logview2.offsetTop;
                smStTime = new Date().getTime();
            });
            this.logview2.addEventListener('touchmove',function(ev){
                var oevent = ev || event;
                _this.logview2.style.left = oevent.touches[0].clientX - smX + 'px';
                _this.logview2.style.top = oevent.touches[0].clientY - smY + 'px';
            });
            this.logview2.addEventListener('touchend',function(ev){
                var nowTime = new Date().getTime();
                if (nowTime-smStTime<200){
                    _this.logview.style.display = "block";
                    _this.logview2.style.display = "none";
                }
            });
        }
    };
    mylogger.init();
}