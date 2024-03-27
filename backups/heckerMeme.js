var noiseTexture;
var fTexture;
function setup() {
    createCanvas(600, 400);
    frameRate(25);
    fTexture = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/fc/Trinity_Detonation_T%26B.jpg");
    noiseTexture = createGraphics(60, 40);
    noiseTexture.fill(10, 10, 20);
    noiseTexture.noStroke();
    for (var i = 0; i < 60; i++) {
        for (var j = 0; j < 40; j++) {
            noiseTexture.rect(i, j, 0.5, 0.5);
        }
    }
}
document.body.innerHTML += "<div></div>";
var txt = `>cd prototron

Path Directory Changed to prototron.
>view prototron

Files found: 
admin_01
index.bash
prototron_basis
.env
.exec

>cd admin_01
Changing File Path...
[043,512,343],
[231,23,3422],
[12,2323,231],
File Type: 3x3 Prototype Matrix.
Structure Type: Encrypted Database
>rupture admin_01 init touch broken_admin`;
var textIndex = 0;
var scene = 0;
var lineTop = 0;
function draw() {
    if (scene === 0) {
        background(20, 20, 30);
        image(noiseTexture, 0, 0, 600, 400);
        var logTxt = txt.substring(0, textIndex);
        textIndex += 0.5;
        var stringSplit = logTxt.split(`
`);
        fill(10, 10, 20, 100);
        rect(0, -11 + stringSplit.length * 18.75, width, 19);
        fill(0, 200, 0);
        textAlign(CORNER, TOP);
        textFont("Monaco", 15);
        text(logTxt + "█", 10, 10, 580, 380);
        if (textIndex > 325) {
            scene = 1;
        }
    }

    if (scene === 1) {
        background(0);

        image(fTexture, 0, 0, 600, 400);
        fill(255);
        stroke(0);
        strokeWeight(5);
        textFont("monospace");
        textAlign(CENTER, CENTER);
        textSize(50);
        push();
        translate(width / 2, height / 2);
        rotate(sin(frameCount * 0.5) / 2);
        text("Tryin' to hack??", 0, 0);
        pop();
    }

}