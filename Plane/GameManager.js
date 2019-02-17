(function () {
    var GameManager = window.GameManager = function (plane, enemy, prop) {
        this.plane = plane;
        this.enemy = enemy;
        this.prop = prop;
        this.box = this.plane.arms.box;
        this.allEnemy = this.enemy.allEnemy;
        this.allProp = this.prop.allProp;
        this.score = 0;
        this.maxScore = parseInt(localStorage.getItem("maxScore") || 0);
        this.previousScore = this.score;
        this.audio = document.createElement("AUDIO");
        document.body.appendChild(this.audio);
    }
    GameManager.prototype.enemyIsDie = function () {
        //子弹是否射到敌人
        for (i in this.box) {
            for (var j = 0; j < this.allEnemy.length; j++) {
                if (this.box[i].x + this.box[i].w > this.allEnemy[j].x && this.box[i].x < this.allEnemy[j].x + this.allEnemy[j].w && this.box[i].y < this.allEnemy[j].y + this.allEnemy[j].h && this.box[i].y + this.box[i].h > this.allEnemy[j].y && this.allEnemy[j].hp > 0) {
                    var power = this.box[i].power;
                    this.box[i].power -= this.allEnemy[j].hp;
                    this.allEnemy[j].hp -= power;
                    if (this.allEnemy[j].hp <= 0) {
                        if (this.allEnemy[j].num == 1) {
                            this.enemy.audio[1].load();
                            this.score += 10;
                            this.enemy.audio[1].play();
                        }
                        else if (this.allEnemy[j].num == 2) {
                            this.enemy.audio[1].load();
                            this.score += 50;
                            this.enemy.audio[1].play();
                        }
                        else if (this.allEnemy[j].num == 3) {
                            this.enemy.audio[1].load();
                            this.score += 100;
                            this.enemy.audio[1].play();
                        }
                        //备份对象
                        var self = this;
                        var x = self.allEnemy[j].x;
                        var y = self.allEnemy[j].y;
                        var w = self.allEnemy[j].w;
                        var h = self.allEnemy[j].h;
                        var image = self.allEnemy[j].image.splice(0, 4);
                        this.allEnemy.splice(j, 1);

                        //击败动画
                        (function () {
                            var step = 0;
                            var timer = setInterval(function () {
                                if (game.fno % 10 == 0) {
                                    step++;
                                }
                                if (step > 3) {
                                    clearInterval(timer);
                                    return;
                                }
                                game.ctx.drawImage(image[step], x, y, w, h);
                            }, 20);
                        }());
                    }
                    if (--this.box[i].power <= 0) {
                        this.box.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    GameManager.prototype.getProp = function () {
        for (i in this.allProp) {
            if (this.allProp[i].x + this.allProp[i].w > this.plane.x && this.allProp[i].x < this.plane.x + this.plane.w && this.allProp[i].y + this.allProp[i].h > this.plane.y && this.allProp[i].y < this.plane.y + this.plane.h) {
                game.prop.audio.load();
                if (this.allProp[i].num == 1) {
                    this.allProp.splice(i, 1);
                    this.plane.arms.useNext();
                }
                else if (this.allProp[i].num == 2) {
                    this.allProp.splice(i, 1);
                    this.plane.arms.useBomb();
                }
                game.prop.audio.play();
            }
        }
    }
    GameManager.prototype.addEnemy = function () {
        var self = this;
        var time = 0;
        var timer = setInterval(function () {
            time++;
            for (var i = 0; i <= (self.score / 1000); i++) {
                if (time % 100 == 0) {
                    new self.enemy.Enemy0();
                }
                if (time % 300 == 0) {
                    new self.enemy.Enemy1();
                }
                if (time % 500 == 0) {
                    new self.enemy.Enemy2();
                }
            }
        }, 20);
        game.allTimer.push(timer);

    }
    GameManager.prototype.addProp = function () {
        var self = this;
        var time = 0
        var timer;
        setInterval(function () {
            time++;
            if (time % 600 == 0 || time == 20) {
                new self.prop.Prop1();
            }
            if (time % 1100 == 0) {
                new self.prop.Prop2();
            }
        }, 20);
        game.allTimer.push(timer);

    }
    GameManager.prototype.printScore = function () {
        game.ctx.font = "20px 楷体"
        game.ctx.fillText("分数 " + this.score, game.canvas.width - 150, 20);
        game.ctx.closePath();
    }
    GameManager.prototype.upGrade = function () {
        if (this.score > this.previousScore * 1.7 && this.score >= 500) {
            this.audio.load();
            this.audio.volume = 1;
            this.audio.src = "R/sound/get_bomb.mp3";
            this.audio.play();
            this.previousScore = this.score;
            this.plane.arms.useNext(1);
        }
    }
    //游戏结束
    GameManager.prototype.planeDie = function () {
        for (i in this.allEnemy) {
            if (this.allEnemy[i].x + this.allEnemy[i].w > this.plane.x + 20 && this.allEnemy[i].x < this.plane.x + this.plane.w - 20 && this.allEnemy[i].y + this.allEnemy[i].h > this.plane.y + 30 && this.allEnemy[i].y < this.plane.y + this.plane.h - 30) {
                var self = this;
                this.audio.src = "R/sound/game_over.mp3";
                this.audio.volume = 0.5;
                this.audio.play();

                game.background.audio.pause();
                //击败动画
                (function () {
                    var step = 0;
                    var timer = setInterval(function () {
                        if (game.fno % 15 == 0) {
                            step++;
                        }
                        if (step > 3) {
                            clearInterval(timer);
                            for (i in game.allTimer) {
                                clearInterval(game.allTimer[i]);
                            }
                            clearInterval(game.plane.arms.use);
                            setTimeout(function () {
                                clearInterval(game.plane.arms.use);
                            }, 8000);
                            game.interface.printGameover();
                            return;
                        }
                        game.ctx.drawImage(self.plane.dieImage[step], self.plane.x, self.plane.y, self.plane.w, self.plane.h);
                    }, 10);
                }());
                console.info("over");
            }
        }
    }
}());