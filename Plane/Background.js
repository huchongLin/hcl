(function () {
    var Background = window.Background = function () {
        this.image = game.R.background;
        this.w = 480;
        this.h = 852;
        this.x = 0;
        this.y = -this.h;
    }

    Background.prototype.print = function () {

        game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        game.ctx.drawImage(this.image, this.x, this.y + this.h, this.w, this.h);

    }
    Background.prototype.move = function () {
        this.y++;
        if (this.y > 0) {
            this.y = -this.h;
        }
    }
    Background.prototype.playAudio = function () {
        this.audio = document.createElement("AUDIO");
        this.audio.src = "R/sound/game_music.mp3";
        document.body.appendChild(this.audio);
        this.audio.loop = true;
        this.audio.volume = 0.5;
        this.audio.play();
    }
    Background.prototype.pauseAudio = function () {
        this.audio.pause();
    }
}());