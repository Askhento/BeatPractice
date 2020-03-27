class Circle{
	constructor(config){
		this.sample = config.sample != null? config.sample : 0;
		this.beatsCount = config.beatsCount != null? config.beatsCount : 0;

		this.radius = config.radius != null? config.radius : 0;
		this.ringColor = config.ringColor != null? config.ringColor : 0;
		this.dotSize = config.dotSize != null? config.dotSize : 0;
		this.dotColor = config.dotColor != null? config.dotColor : 0;

		this.beatsConfig = config.beatsConfig != null? config.beatsConfig : [];
		if(this.beatsConfig.length == 0) {

			for (let i = 0; i < this.beatsCount; i++) {	
				this.beatsConfig.push(false);
			}
		} else { 
			this.beatsCount = this.beatsConfig.length;
		}
	}

	show(closest) {

		strokeWeight(1);
		stroke(255);
		noFill();
		ellipse(0, 0, this.radius * 2);

		strokeWeight(3);
		stroke(this.dotColor);
		for (let b = 0; b < this.beatsConfig.length; b++) {
			if(this.beatsConfig[b]) {
				// const sounds = this.beatsConfig[b];
	
				const bAngle = b / this.beatsConfig.length * 2 * Math.PI;
				
				const xb = cos(bAngle) * this.radius;
				const yb = sin(bAngle) * this.radius;

				ellipse(xb, yb, 5);
				
			}		
		}

		if(closest >= 0) {
			// add selected
			strokeWeight(2);
			stroke(255);
			noFill();

			const bAngle = closest / this.beatsConfig.length * 2 * Math.PI;
					
			const xb = cos(bAngle) * this.radius;
			const yb = sin(bAngle) * this.radius;

			ellipse(xb, yb, 10);	
		}


	}

	toggleSample(ang) {
		this.beatsConfig[ang] = !this.beatsConfig[ang];
	}

	checkSounds(currentPulse) {
		if(this.beatsConfig[currentPulse]) {
			this.sample.play();
		}
	}
}