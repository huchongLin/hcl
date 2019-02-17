(function () {
    var Prop = window.Prop = function () {
        var self = this;
        this.allProp = [];
        this.Prop1 = function () {
            this.num = 1;
            this.image = game.R.prop1;
            this.w = 58;
            this.h = 88;
            this.x = game.rand(0, game.canvas.width - this.w);
            this.y = -this.h;
            this.ms = 1.5;
            self.allProp.push(this);
        }
        this.Prop2 = function () {
            this.num = 2;
            this.image = game.R.prop2;
            this.w = 60
            this.h = 103;
            this.x = game.rand(0, game.canvas.width - this.w);
            this.y = -this.h;
            this.ms = 1.5;
            self.allProp.push(this);
        }
        this.audio = document.createElement("AUDIO");
        this.audio.src = "R/sound/get_double_laser.mp3";
        document.body.appendChild(this.audio);
    }
    Prop.prototype.print = function () {
        for (i in this.allProp) {
            game.ctx.drawImage(this.allProp[i].image, this.allProp[i].x, this.allProp[i].y, this.allProp[i].w, this.allProp[i].h);
        }
    }
    Prop.prototype.move = function () {
        for (i in this.allProp) {
            this.allProp[i].y += this.allProp[i].ms;
        }
    }
}());