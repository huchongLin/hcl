(function () {
    var Enemy = window.Enemy = function () {
        var self = this;
        this.allEnemy = [];
        this.audio = [];
        for (var i = 1; i < 4; i++) {
            this.audio[i] = document.createElement("AUDIO");
            document.body.appendChild(this.audio[i]);
        }
        this.audio[1].src = "R/sound/enemy0_down.mp3";
        this.audio[1].src = "R/sound/enemy1_down.mp3";
        this.audio[1].src = "R/sound/enemy2_down.mp3";
        this.Enemy0 = function () {
            this.num = 1;
            this.image = [game.R.enemy00, game.R.enemy01, game.R.enemy02, game.R.enemy03, game.R.enemy04];
            this.w = 51;
            this.h = 39;
            this.x = game.rand(0, game.canvas.width - this.w);
            this.y = -this.h;
            this.ms = game.rand(4, 10);
            this.hp = 1;
            self.allEnemy.push(this);


        }
        this.Enemy1 = function () {
            this.num = 2;
            this.image = [game.R.enemy10, game.R.enemy11, game.R.enemy12, game.R.enemy13, game.R.enemy14];
            this.w = 69;
            this.h = 89;
            this.x = game.rand(0, game.canvas.width - this.w);
            this.y = -this.h;
            this.ms = game.rand(2, 5);
            this.hp = 10;
            self.allEnemy.push(this);
        }
        this.Enemy2 = function () {
            this.num = 3;
            this.image = [game.R.enemy20, game.R.enemy21, game.R.enemy22, game.R.enemy23, game.R.enemy24];
            this.w = 165;
            this.h = 246;
            this.x = game.rand(0, game.canvas.width - this.w);
            this.y = -this.h;
            this.ms = game.rand(0.5, 2);
            this.hp = 30;
            self.allEnemy.push(this);
        }
    }
    Enemy.prototype.print = function () {
        for (i in this.allEnemy) {
            game.ctx.drawImage(this.allEnemy[i].image[0], this.allEnemy[i].x, this.allEnemy[i].y, this.allEnemy[i].w, this.allEnemy[i].h);
        }
    }

    Enemy.prototype.move = function () {
        for (i in this.allEnemy) {
            this.allEnemy[i].y += this.allEnemy[i].ms;
            if (this.allEnemy[i].y > game.canvas.height) {
                this.allEnemy.splice(i, 1);
            }
        }

    }
}());