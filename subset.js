let collegamentiorigins = [];
let base = [];
let grafo = ' { }';
let final = '';
let initialnodes = '';
const regexpr = /[0-9]*/g;
let matchnumber = "";
let currentnumber = "";

function assignpowerset() {
    graphToPower();
    grafo = '{  rankdir=BT ' + initialnodes + final + '}';
    if (id < 5) {
        document.getElementById("presentationp").style.display = "none";
        d3.select("#graphpowerset").graphviz()
            .fit(true)
            .width(400)
            .height(400)
            .renderDot('digraph ' + grafo)
            .zoom(false)
            .transition(function() {
                return d3.transition("main")
                    .ease(d3.easeLinear)
                    .delay(500)
                    .duration(1000);
            });
    } else if (id >= 5) {
        document.getElementById("presentationp").style.display = "none";
        d3.select("#graphpowerset").graphviz()
            .fit(true)
            .width(400)
            .height(400)
            .renderDot('digraph ' + grafo)
            .zoom(true)
            .scale(2.5)
            .transition(function() {
                return d3.transition("main")
                    .ease(d3.easeLinear)
                    .delay(500)
                    .duration(1000);
            });
    }
    initialnodes = '';
}

function graphToPower() {
    initialnodes = '';
    final = '';
    base = [];
    for (let i = 0; i <= id; i++) {
        base.push(i);
    }
    base.pop();
    let temp = generatePowerSet(base);
    for (let i = 0; i < temp.length; i++) {
        initialnodes += '"' + temp[i] + '"' + '; ';
        let lung = temp[i].length;
        for (let j = 0; j < temp.length; j++) {
            if (temp[i] == '{ }' & temp[j] != '{ }' & temp[j].length == 3) {
                final += '"' + temp[i] + '"' + '->' + '"' + temp[j] + '";';
            } else if (lung == temp[j].length - 2)
                if (!(final.includes(temp[i] + '->' + temp[j])) & temp[i] != '{ }') {
                    let arrmatchnumbers1 = temp[j].match(regexpr).toString().split(',').join("");
                    let arrmatchnumbers2 = temp[i].match(regexpr).toString().split(',').join("");
                    matchnumber = "";
                    for (let x = 0; x <= arrmatchnumbers2; x++) {
                        currentnumber = arrmatchnumbers2[x];
                        if (arrmatchnumbers1.includes(currentnumber))
                            matchnumber += currentnumber;
                    }
                    if (matchnumber == arrmatchnumbers2)
                        final += '"' + temp[i] + '"' + '->' + '"' + temp[j] + '";';
                }
        }
    }
    downsetstring = initialnodes + final;
}

function downset() {
    let downsets = [];
    if (graphHasCycle == true) {
        document.getElementById("downsetbutton").disabled = true;
        return;
    }
    if (collegamenti.length == 0) {
        graphToPower();
        d3.select("#graphdownset").graphviz()
            .fit(true)
            .width(400)
            .height(400)
            .renderDot('digraph ' + '{ rankdir=BT ' + downsetstring + '}')
            .zoom(false)
            .transition(function() {
                return d3.transition("main")
                    .ease(d3.easeLinear)
                    .delay(500)
                    .duration(1000);
            });
        if (set.length < 6) {
            gpsp = generatePowerSet(set);
            gpsp = gpsp.toString().split(' ').join("");
            pdownsets.html("" + gpsp);
        } else {
            pdownsets.html("" + gpsp + ',...');
        }
    } else {
        connectionDownset();
        pdownsets.html(downsetparagrah);
        d3.select("#graphdownset").graphviz()
            .fit(true)
            .width(400)
            .height(400)
            .renderDot('digraph { rankdir=BT ' +downsetstring+ downsetcoll + '}')
            .zoom(false)
            .transition(function() {
                return d3.transition("main")
                    .ease(d3.easeLinear)
                    .delay(500)
                    .duration(1000);
            });



    }
}

function hasChild(node) {
    if (collegamentiorigins.includes(node))
        return true;
    else
        return false;
}

function generatePowerSet(array) {
    var result = [];
    result.push('{ }');

    for (var i = 1; i < (1 << array.length); i++) {
        var subset = [];
        subset.push('{')
        for (var j = 0; j < array.length; j++)
            if (i & (1 << j)) {
                subset.push(array[j]);
                subset.push(',');
            }
        subset.pop();
        subset.push('}');
        result.push(subset.join(''));
    }
    return result;
}

function graph() {
    if (document.getElementById("graphrappr").style.display == "none") {
        document.getElementById("graphcanvas").style.display = "none";
        document.getElementById("graphrappr").style.display = "block";

        d3.select("#graphrappr").graphviz()
            .fit(true)
            .width(400)
            .height(400)
            .renderDot('digraph ' + '{ rankdir=BT ' + nodegraph + stringgraph + '}')
            .zoom(false)
            .transition(function() {
                return d3.transition("main")
                    .ease(d3.easeLinear)
                    .delay(500)
                    .duration(1000);
            });
    } else {
        document.getElementById("graphcanvas").style.display = "block";
        document.getElementById("graphrappr").style.display = "none";

    }

}