(function () {
    var Interface = window.Interface = function () {
        this.canvasLeft = game.canvas.offsetLeft;    
        this.begin = {
            image: game.R.name,
            w: 429 * 0.7,
            h: 84 * 0.7,
            x: game.canvas.width / 2 - 429 * 0.7 / 2,
            y: 20,
        }
        this.beginText = {
            text: "开始游戏",
            x: game.canvas.width / 2 - 60,
            y: game.canvas.height / 2,
            w: 120,
            h: 30
        }
        this.pause = {
            image: [game.R.resume, game.R.restart, game.R.quit],
            w: [54, 110, 112],
            h: [26, 28, 24],
            x: [game.canvas.width / 2 - 25, game.canvas.width / 2 - 50, game.canvas.width / 2 - 50],
            y: [game.canvas.height / 2 * 0.618, game.canvas.height / 2 * 0.618 + 100, game.canvas.height / 2 * 0.618 + 200],
        }
        this.gameover = {
            image: game.R.gameover,
            w: game.canvas.width,
            h: 852 / 480 * game.canvas.width,
            x: 0,
            y: 0
        }
    }
    Interface.prototype.printBegin = function () {
        //清屏
        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.background.print();
        game.background.move();
        game.ctx.drawImage(this.begin.image, this.begin.x, this.begin.y, this.begin.w, this.begin.h);
        game.ctx.textAlign = 'left';
        game.ctx.font = '30px 楷体';
        game.ctx.fillText("开始游戏", this.beginText.x, this.beginText.y);
    }
    Interface.prototype.beginClick = function (callback) {
        var self = this;
        game.canvas.onmousedown = function (e) {
            var x = e.x - self.canvasLeft;
            var y = e.y;
            if (x > self.beginText.x && x < self.beginText.x + self.beginText.w && y > self.beginText.y - self.beginText.h && y < self.beginText.y) {
                callback();
            }
        }
    }
    Interface.prototype.printPause = function () {
        for (var i = 0; i < 3; i++) {
            game.ctx.drawImage(this.pause.image[i], this.pause.x[i], this.pause.y[i], this.pause.w[i], this.pause.h[i]);
        }
    }
    Interface.prototype.printGameover = function () {
        if (game.gameManager.maxScore < game.gameManager.score) {
            game.gameManager.maxScore = game.gameManager.score;
        }
        localStorage.setItem("maxScore", game.gameManager.maxScore);
        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.ctx.drawImage(this.gameover.image, this.gameover.x, this.gameover.y, this.gameover.w, this.gameover.h);
        game.ctx.textAlign = 'center';
        game.ctx.font = '70px 楷体';
        game.ctx.fillText(game.gameManager.maxScore, this.beginText.x, this.beginText.y - 30);
        game.ctx.fillText(game.gameManager.score, this.beginText.x, this.beginText.y + 230);
        var click = window.onclick = function(){
            window.location.reload();            
        }
    }
}());