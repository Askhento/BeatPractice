class Track {

    constructor(config) {
		this.beatsCount = config.beatsCount != null? config.beatsCount : 0;
        this.circles = [];
        config.circles.forEach(c => this.circles.push(new Circle({...c, beatsCount : this.beatsCount})));
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.closest = 0;
        this.ang = 0;
    }

    show() {

        this.ang = atan2(mouseY - this.centerY, mouseX - this.centerX);
        this.ang = (this.ang > 0 ? this.ang : (2 * Math.PI + this.ang));
        this.ang = Math.round(this.ang / (2 * Math.PI) * this.beatsCount) % this.beatsCount;



        this.closest = 0;
        let mouseD = Math.pow(mouseX - this.centerX, 2) + Math.pow(mouseY - this.centerY, 2);
        let diff = Math.abs(mouseD - Math.pow(this.circles[0].radius, 2));

        for (let i = 0; i < this.circles.length; i++) {
            const newdiff = Math.abs (mouseD - Math.pow(this.circles[i].radius, 2));
            if (newdiff < diff) {
                diff = newdiff;
                this.closest = i;

            }
        }

        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].show(i == this.closest? this.ang : -1);
        }

    }

    checkClick() {
        this.circles[this.closest].toggleSample(this.ang);
    }

    checkSounds(currentPulse) {
        this.circles.forEach(c => c.checkSounds(currentPulse));
    }

	
}
