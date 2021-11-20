let v0;
let v1;
let ctrlv1;
let nodeo;
let noded;
let xoriginge;
let yorigine;
let cerchio;
let overlap = false;
let id = 0;
let cerchi = [];
let linee = [];
let collegamenti = [];
let set = [];
let canvas;
let pcicles;
let psubsets;
let pdownsets;
let gpsp;
let stringgraph = '';
let nodegraph = '';
let graphHasCycle = false;
let nodearray = [];

function setup() {
    canvas = createCanvas(400, 400);
    canvas.id('graphcanvas');
    let container = document.getElementById('containerc&i');
    canvas.parent(container);
    pcicles = createP('Il grafo non ha cicli');
    let psubsetintro = createP('Insieme delle parti :');
    psubsets = createP('{}');
    let pdownsetsintro = createP('Insieme dei downset :');
    pdownsets = createP('{}');
    background(200);
    strokeWeight(2);
    cursor(CROSS);

}

function draw() {
    for (let i = 0; i < cerchi.length; i++) {
        if (contains(cerchi[i].x, cerchi[i].y, mouseX, mouseY)) {
            overlap = true;
            break;
        } else {
            overlap = false;
        }
    }
}

function mousePressed() {
    for (let z = 0; z < cerchi.length; z++) {
        if (mouseButton == LEFT & contains(cerchi[z].x, cerchi[z].y, mouseX, mouseY)) {
            xorigine = mouseX;
            yorigine = mouseY;
            v0 = createVector(xorigine, yorigine);
            nodeo = cerchi[z].id;
            ctrlv1 = true;
            break;
        }
    }


    if (mouseButton == RIGHT & !overlap) {
        if (mouseX >= 0 & mouseX <= 400 & mouseY >= 0 & mouseY <= 400) {
            drawCircle(mouseX, mouseY);
            if (set.length < 6) {
                gpsp = generatePowerSet(set);
                gpsp = gpsp.toString().split(' ').join("");
                psubsets.html("" + gpsp);
            } else {
                psubsets.html("" + gpsp + ',...');
            }
        }
    }
}

function mouseReleased() {
    if (mouseButton == LEFT & ctrlv1) {
        for (let z = 0; z < cerchi.length; z++) {
            if (ctrlv1 & contains(cerchi[z].x, cerchi[z].y, mouseX, mouseY)) {
                noded = cerchi[z].id;
                if (noded != nodeo) {
                    v1 = createVector(mouseX - xorigine, mouseY - yorigine);
                    drawArrow(v0, v1, 'black');
                    if (noded != nodeo) {
                        collegamenti.push(new Link(nodeo, noded));
                        stringgraph += '' + nodeo + '->' + noded + ';';
                        
                        hasCycle();
                    }
                    ctrlv1 = false;
                    break;
                }
            }
        }
    }
}

function keyPressed() {
    if (keyCode == ENTER) {
    }
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    linee.push(line(0, 0, vec.x, vec.y));
    rotate(vec.heading());
    let arrowSize = 5;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function drawCircle(mx, my) {
    cerchi.push(new Node(mx, my, 15, id));
    push();
    fill('white');
    set.push(id);
    translate(mx, my);
    circle(0, 0, 30);
    fill('black');
    textAlign(CENTER, CENTER);
    text(id, 0, 0);
    nodegraph += id + ';';
    nodearray.push("");
    id++;
    overlap = true;
    pop();
}

function contains(px, py, rx, ry) {
    let d = dist(px, py, rx, ry);
    if (d < 15) {
        return true;
    } else {
        return false;
    }
}

class Node {
    constructor(x, y, r, id) {
        this.x = x;
        this.y = y;
        this.r = 15;
        this.id = id;
    }
}
class Link {
    constructor(on, dn) {
        this.on = on;
        this.dn = dn;
    }
}

function hasCycle() {
    visited = [];
    recStack = [];
    for (let i = 0; i <= id; i++) {
        visited[i] = false;
        recStack[i] = false;
    }

    for (let i = 0; i <= id; i++) {
        if (isCyclicUtil(i, visited, recStack)) {
            pcicles.html('Il grafo ha cicli');
            graphHasCycle = true;
            return true;
        }
        return false;
    }
}

function isCyclicUtil(i, visited, recStack) {
    if (recStack[i])
        return true;
    if (visited[i])
        return false;
    visited[i] = true;
    recStack[i] = true;
    for (let j = 0; j < collegamenti.length; j++) {
        if (i == collegamenti[j].on)
            if (isCyclicUtil(collegamenti[j].dn, visited, recStack))
                return true;
    }
    recStack[i] = false;
    return false;
}

