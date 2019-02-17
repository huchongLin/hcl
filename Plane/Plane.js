(function () {
    var Plane = window.Plane = function () {
        this.image = game.R.hero;
        this.dieImage = [game.R.hero1, game.R.hero2, game.R.hero3, game.R.hero4];
        this.w = 100;
        this.h = 124;
        this.x = game.canvas.width / 2 - this.w / 2;
        this.y = game.canvas.height - this.h;
        this.canvasLeft = game.canvas.offsetLeft;
        this.canvasTop = game.canvas.offsetTop;
        this.arms = new Arms(this);
    }
    Plane.prototype.print = function () {
        game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    Plane.prototype.move = function () {
        var self = this;
        window.onmousemove = function (event) {
            if (event.x > self.canvasLeft && event.x < self.canvasLeft + game.canvas.width) {
                self.x = event.x - self.w / 2 - self.canvasLeft;
            }
            if (event.y > self.canvasTop && event.y < self.canvasTop + game.canvas.height) {
                self.y = event.y - self.h / 2;
            }
        }
        window.addEventListener("touchmove", function (event) {
            var ex = event.targetTouches[0].pageX;
            var ey = event.targetTouches[0].pageY;
            if (ex > self.canvasLeft && ex < self.canvasLeft + game.canvas.width) {
                self.x = ex - self.w / 2 - self.canvasLeft;
            }
            if (ey > self.canvasTop && ey < self.canvasTop + game.canvas.height) {
                self.y = ey - self.h / 2;
            }
        },false);
    }
}());