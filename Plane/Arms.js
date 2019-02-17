(function () {
    var Arms = window.Arms = function (plane) {
        var self = this;
        //屏幕上的子弹
        this.box = [];
        this.plane = plane;

        //所有的武器
        this.allArms = {
            bullet: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet(0, 0));
                    self.audio.play();
                    self.audio.play();
                }, 160);
            },
            bullet1: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet1(0, 0));
                    self.audio.play();
                }, 130);
            },
            bomb: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bomb(0, 0));
                    self.audio.play();
                }, 400);
            },
            bulletTwo: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet(-30, 30));
                    self.box.push(new self.Bullet(30, 30));
                    self.audio.play();
                }, 160);
            },
            bulletTwo1: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet1(-30, 30));
                    self.box.push(new self.Bullet1(30, 30));
                    self.audio.play();
                }, 130);
            },
            bullet2: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet2(0, 0));
                    self.audio.play();
                }, 80);
            },
            bulletThree: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet(-30, 30));
                    self.box.push(new self.Bullet(0, 0));
                    self.box.push(new self.Bullet(30, 30));
                    self.audio.play();
                }, 160);
            },
            bulletTwo2: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet2(-30, 30));
                    self.box.push(new self.Bullet2(30, 30));
                    self.audio.play();
                }, 80);
            },
            bulletThree1: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet1(-30, 30));
                    self.box.push(new self.Bullet1(0, 0));
                    self.box.push(new self.Bullet1(30, 30));
                    self.audio.play();
                }, 130);
            },
            bulletThree2: function () {
                return setInterval(function () {
                    self.audio.load();
                    self.box.push(new self.Bullet2(-30, 30));
                    self.box.push(new self.Bullet2(0, 0));
                    self.box.push(new self.Bullet2(30, 30));
                    self.audio.play();
                }, 80);
            },
        }
        //初始化武器
        this.grade = [];
        this.gradeTop = 0;
        for (i in this.allArms) {
            if (i != "bomb") {
                this.grade.push(i);
            }
        }
        this.use = this.allArms[this.grade[this.gradeTop]]();
        game.allTimer.push(this.use);
        //加载音乐
        this.audio = document.createElement("AUDIO");
        this.audio.src = "R/sound/bullet.mp3";
        document.body.appendChild(this.audio);
        this.audio1 = document.createElement("AUDIO");
        this.audio1.src = "R/sound/out_porp.mp3";
        document.body.appendChild(this.audio1);
        this.Bullet = function (x, y) {
            this.image = game.R.bullet;
            this.w = 22;
            this.h = 22;
            this.x = x;
            this.y = y;
            this.ms = 40;
            this.power = 1.2;
            this.x = this.x + self.plane.w / 2 + self.plane.x - this.w / 2;
            this.y += self.plane.y;

        }
        this.Bullet1 = function (x, y) {
            this.image = game.R.bullet1;
            this.w = 9;
            this.h = 21;
            this.x = x;
            this.y = y;
            this.ms = 30;
            this.fm = 150;
            this.power = 1.5;
            this.x = this.x + self.plane.w / 2 + self.plane.x - this.w / 2;
            this.y += self.plane.y;

        }
        this.Bullet2 = function (x, y) {
            this.image = game.R.bullet2;
            this.w = 9;
            this.h = 21;
            this.x = x;
            this.y = y;
            this.ms = 30;
            this.fm = 50;
            this.power = 2;
            this.x = this.x + self.plane.w / 2 + self.plane.x - this.w / 2;
            this.y += self.plane.y;

        }
        this.Bomb = function (x, y) {
            this.image = game.R.bomb;
            this.w = 63;
            this.h = 53;
            this.x = x;
            this.y = y;
            this.ms = 5;
            this.fm = 500;
            this.power = 20;
            this.x = this.x + self.plane.w / 2 + self.plane.x - this.w / 2;
            this.y += self.plane.y;

        }
    }
    Arms.prototype.useNext = function (flag) {
        if (flag != undefined) {
            clearInterval(this.use);
            this.use = this.allArms[this.grade[++this.gradeTop]]();
        }
        else if (this.gradeTop < this.grade.length - 1) {
            var self = this;
            clearInterval(this.use);
            this.use = this.allArms[this.grade[++this.gradeTop]]();
            var timer = setTimeout(function () {
                self.usePrevious();
                self.audio1.load();
                self.audio1.play();
            }, 5000);
        }
    }
    Arms.prototype.usePrevious = function () {
        if (this.gradeTop > 0) {
            clearInterval(this.use);
            this.use = this.allArms[this.grade[--this.gradeTop]]();
        }
    }
    Arms.prototype.useBomb = function () {
        var self = this;
        clearInterval(this.use);
        this.use = this.allArms['bomb']();
        var timer = setTimeout(function () {
            self.audio1.load();
            clearInterval(self.use);
            self.use = self.allArms[self.grade[self.gradeTop]]();
            self.audio1.play();
        }, 8000);
    }
    Arms.prototype.print = function () {
        for (i in this.box) {
            game.ctx.drawImage(this.box[i].image, this.box[i].x, this.box[i].y, this.box[i].w, this.box[i].h);
        }
    }
    Arms.prototype.changeUse = function (bullet) {
        clearInterval(this.use);
        this.use = bullet();
    }
    Arms.prototype.move = function () {
        for (i in this.box) {
            this.box[i].y -= this.box[i].ms;
            //清理屏幕外面的子弹
            if (this.box[i].x < 0 || this.box[i].y < 0 || this.box[i].x > game.canvas.width || this.box[i].y > game.canvas.height) {
                this.box.splice(i, 1);
            }
        }
    }
}());