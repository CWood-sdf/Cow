var i = 0;
var nums = [];
var width, height;
class Cow {
    constructor() {
        this.pos = p.createVector(p.random(0, width), p.random(0, height));
        this.angle = p.random(0, 360);
        this.z = p.random(0, 50);
        this.velocity = p.createVector(0, 0);
        this.angVel = p.random(-0.5, 0.5);
        this.bouyancy = p.random(0.01, 0.05);
        this.acceleration = p.createVector(0, 0);
        this.angAcc = 0;
        this.maxVel = 2;
        this.ascending = p.random(0, 1) > 0.5;
    }
    draw() {
        {
            // p.background(125, 125, 125);
            p.translate(this.pos.x, this.pos.y);
            p.rotate(this.angle);
            p.scale(1.5);
            p.fill("#ffffff");
            p.noStroke();
            p.beginShape();
            p.vertex(-30, 40);
            p.vertex(-30, 0);
            p.vertex(-22, 0);
            p.vertex(-25, 40);
            p.endShape();
            p.beginShape();
            p.rect(-30, -20, 60, 30, 3);
            // p.vertex(-30, 0);
            // p.vertex(-30, -30);
            // p.vertex(30, -30);
            // p.vertex(30, 0);
            p.endShape();
            // p.ellipse(0, 0, 70, 50);
            p.beginShape();
            // right leg
            p.vertex(30, 40);
            p.vertex(30, 0);
            p.vertex(22, 0);
            p.vertex(25, 40);
            p.endShape();
            // p.ellipse(30, -10, 40, 40);
            p.beginShape();
            p.vertex(20, -20);
            p.vertex(40, -20);
            p.vertex(60, -10);
            p.vertex(55, 5);
            p.vertex(30, 3);
            p.endShape();
            p.fill("#000000");
            p.ellipse(40, -13, 5, 5);
            p.ellipse(0, 0, 20, 10);
            p.beginShape();
            p.vertex(-10, -20);
            p.bezierVertex(0, -5, 5, -5, 5, -20);
            p.endShape();
            p.ellipse(-20, -10, 10, 5);
            p.ellipse(20, -15, 10, 10);
            // p.ellipse(50, -15, 10, 10);
            p.beginShape();
            p.vertex(30, 10);
            p.bezierVertex(10, -10, 5, -10, 30, -5);
            p.endShape();
            p.beginShape();
            p.vertex(-30, 10);
            p.bezierVertex(-10, -0, -10, -0, -30, -5);
            p.endShape();
            p.fill("#ff7474");
            p.beginShape();
            p.vertex(-20, 10);
            p.bezierVertex(-20, 25, -5, 25, -5, 10);
            p.endShape();
            p.resetMatrix();
        }
        this.angle += this.angVel;
        this.angVel += this.angAcc;
        if (this.ascending) {
            this.acceleration.y = -this.bouyancy;
        } else {
            this.acceleration.y = this.bouyancy;
        }
        nums.push(p.noise(this.z));
        console.log();
        var avg = nums.reduce((l, r) => l + r, 0) / nums.length;
        while (nums.length > 500) {
            nums.shift();
        }
        this.acceleration.x = (nums[nums.length - 1] - avg) / 10;
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.z += 0.01;
        if (this.velocity.mag() > this.maxVel) {
            this.velocity.div(this.velocity.mag());
            this.velocity.mult(this.maxVel);
        }
        if (this.pos.y < 0 && this.ascending) {
            this.ascending = false;
        }
        if (this.pos.y > height && !this.ascending) {
            this.ascending = true;
            this.velocity.y = 0;
        }
        if (this.pos.x < 0 && this.velocity.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.pos.x > width && this.velocity.x > 0) {
            this.velocity.x *= -1;
        }
    }
}
var cows;
//Just dont look in here
const s = (pi) => {
    p = pi;
    pi.setup = function () {
        pi.createCanvas(p.windowWidth, p.windowHeight);
        width = p.windowWidth;
        height = p.windowHeight;
        $("canvas").contextmenu((e) => {
            e.preventDefault();
        });
        // AKA 20 fish on my monitor
        var cowCount = p.max(
            ((p.windowWidth * p.windowHeight) / 1783680) * 20,
            5,
        );
        console.log(
            p.windowHeight * p.windowWidth,
            p.windowHeight,
            p.windowWidth,
            cowCount,
        );
        cows = [new Cow()];
        while (cows.length <= cowCount) {
            cows.push(new Cow());
        }
        p.angleMode(p.DEGREES);
    };

    pi.draw = function () {
        p.background("#1fa5d2");
        for (var i in cows) {
            cows[i].draw();
        }
        // p.fill(0, 230, 255, 100);
        // p.noStroke();
        // p.rect(0, 0, width, height);
    };
    pi.mouseDragged = function () {};
    pi.mouseClicked = function (e) {};
    pi.mouseReleased = function (e) {};
};
