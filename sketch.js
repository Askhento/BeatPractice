let kick;
let hat;
let clap;

let bpmSlider;
function preload() {
	kick = loadSound("sounds/kick.wav");
	hat = loadSound("sounds/hat.wav");
	clap = loadSound("sounds/clap.wav");
}


let beatsConfig;
let button;

let pulseTime = 1;

let loopPercent = 0.0;
let pulsePercent = 0.99;
let loopAngle = 0;

let currentPulse = -1;
const beatDivivder = 8;
const beatsPerLoop = 4;
const pulseCount = beatDivivder * beatsPerLoop;
let run = false;
let pulseTimer;
let pulseLastTime = 0;
let pulsePercentLeft = 0.01;
 
let time = 0;


let tracks = [];
let canvas;

function setup() {
	canvas = createCanvas(300, 300);
	canvas.mousePressed(changeTrack);
	frameRate(30);
	// kick.play();\
	// mousePressed(kick.play);
	bpmSlider = createSlider(70, 200, 120, 1);

	// * 4/4 beat sample
	// beatsConfig = [
	// 	[kick],
	// 	[hat],
	// 	[kick, clap],
	// 	[hat],
	// 	[kick],
	// 	[hat],
	// 	[kick, clap],
	// 	[hat]
	// ];


	tracks.push(new Track({
		beatsCount : beatDivivder * beatsPerLoop,
		circles : [
			{
				sample : clap,
				// beatsConfig : [false, true, false, true, false, true, false, true ],
				radius : 70,
				dotColor : "cyan"
			},
			{
				sample : kick,
				// beatsConfig : [true, false, true, false, true, false, true, false ],
				radius : 100,
				dotColor : "red"
			},
			{
				sample : hat,
				// beatsConfig : [false, true, false, true, false, true, false, true ],
				radius : 130,
				dotColor : "orange"
			}
		]
	}));

	// * 3 vs 2 poly beat sample
	// beatsConfig = [
	// 	[hat, kick],
	// 	[],
	// 	[hat],
	// 	[kick],
	// 	[hat],
	// 	[],
	// 	[hat, clap],
	// 	[],
	// 	[hat],
	// 	[kick],
	// 	[hat],
	// 	[hat]
	// ];

	button = createButton('start');
	button.mousePressed(switchRun);

}


// todo : add multiple tracks
// todo : better default beatsConfig
// todo : add touch events 
// todo : fullscreen on mobile device
// todo : add multiple dots per click
// todo : add volume for each sound or for strong/weak beat




function draw() {
	background(0);



	if(run) {
		pulsePercent = (millis() - pulseLastTime) / pulseTime;
	}
	
	loopPercent = (currentPulse + pulsePercent) / pulseCount;
	loopAngle = loopPercent * Math.PI * 2;
	push();

	translate(width / 2, height / 2);

	const x2 = width * cos(loopAngle) / 2;
	const y2 = height * sin(loopAngle) / 2;

	stroke(255);
	strokeWeight(3);
	line(0, 0, x2, y2);

	tracks[0].show();
	pop();



}

function switchRun(){
	run = !run;
	if(run) {
		// run
		button.html('stop');
		nextPulse(pulsePercentLeft);
	} else {
		// pause
		button.html('start');
		pulsePercentLeft = 1 - pulsePercent;
		clearTimeout(pulseTimer);
	}
}


function nextPulse(_pulsePercentLeft) {
	pulseTime = 60 / bpmSlider.value() / beatDivivder * 1000;
	let waitTime = 1;
	pulseLastTime = millis();
	if(_pulsePercentLeft != null) {
		pulseLastTime -= pulseTime * (1 - _pulsePercentLeft);
		waitTime = _pulsePercentLeft;
	}
	waitTime *= pulseTime;

	pulseTimer = setTimeout(
		() => {
			checkSounds();
			nextPulse();
		}, waitTime
	)
}

function checkSounds() {

	currentPulse++;
	if(currentPulse >= pulseCount){
		currentPulse = 0;
	}
	tracks[0].checkSounds(currentPulse);
}

function changeTrack() {
	tracks[0].checkClick();
}
