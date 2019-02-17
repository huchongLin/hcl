(function () {
    var Game = window.Game = function () {
        //获取画布
        this.canvas = document.getElementsByClassName('mycanvas')[0];
        this.ctx = this.canvas.getContext('2d');
        //初始化窗口
        this.init();
        //资源对象
        this.R;
        //所有定时器
        this.allTimer = [];
        //加载资源
        var self = this;
        this.loadResources(function () {
            self.start();
        });
    }
    Game.prototype.start = function () {
        //备份game对象
        var self = this;
        //帧数
        self.fno = 0;
        //背景对象
        this.background = new Background();
        //界面对象
        this.interface = new Interface();
        this.interface.printBegin();
        this.interface.beginClick(function () {
            game.background.playAudio();
            //飞机对象
            self.plane = new Plane();
            //敌人对象
            self.enemy = new Enemy();
            //道具对象
            self.prop = new Prop();
            //游戏管理对象
            self.gameManager = new GameManager(self.plane, self.enemy, self.prop);
            self.gameManager.addEnemy();
            self.gameManager.addProp();
            self.begin();

        });


    }
    Game.prototype.begin = function () {
        var self = this;
        //定时器
        this.timer = setInterval(function () {
            //清屏
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            //背景
            self.background.print();
            self.background.move();
            //敌人
            self.enemy.print();
            self.enemy.move();
            //游戏管理
            self.gameManager.enemyIsDie();
            self.gameManager.getProp();
            self.gameManager.upGrade();
            self.gameManager.planeDie();
            self.gameManager.printScore();
            //道具
            self.prop.print();
            self.prop.move();
            //飞机
            self.plane.arms.print();
            self.plane.arms.move();
            self.plane.print();
            self.plane.move();
            //FNO
            self.fno++;
            self.ctx.textAlign = 'left';
            self.ctx.font = '12px 黑体';
            self.ctx.fillText('FNO:' + self.fno, 0, 10);
        }, 20);
        this.allTimer.push(this.timer);
    }
    Game.prototype.init = function () {
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if (windowW > 414) {
            //大屏居中
            this.canvas.style.marginLeft = windowW / 2 - 207 + 'px';
            windowW = 414;

        }
        //812
        if (windowH > 750) {
            windowH = 750;
        }
        this.canvas.width = windowW;
        this.canvas.height = windowH;
        //禁止滑动
        window.ontouchmove = function (e) {
            e.preventDefault && e.preventDefault();
            e.returnValue = false;
            e.stopPropagation && e.stopPropagation();
            return false;
        };
    }
    Game.prototype.loadResources = function (callback) {
        this.R = {};
        var self = this;        //备份R，因为在xhr的监听函数中要用到
        var loadCount = 0;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var Robj = JSON.parse(xhr.responseText);
                //console.info(this);       这个this是xhr对象的
                for (i in Robj.image) {
                    self.R[Robj.image[i].name] = new Image();
                    self.R[Robj.image[i].name].src = Robj.image[i].url;
                    self.R[Robj.image[i].name].onload = function () {
                        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                        self.ctx.font = '20px 楷体';
                        self.ctx.textAlign = 'center';
                        self.ctx.fillText('正在加载资源' + ++loadCount + '/' + Robj.image.length, self.canvas.width / 2, self.canvas.height / 2);
                        if (loadCount == Robj.image.length) {
                            callback();
                        }
                    }
                }
                // console.info(self.R);
            }
        }
        xhr.open('get', 'game.json', true);
        xhr.send(null);
    }
    Game.prototype.rand = function (a, b) {
        return parseInt(Math.random() * (b - a) + a);
    }
}());
