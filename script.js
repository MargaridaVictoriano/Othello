function genDivs(v) {
    var e = document.body;
    for (var i = 0; i < v; i++) {
        var row = document.createElement("div");
        row.className = "row";
        for (var x = 1; x <= v; x++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            cell.innerText = (i * v) + x;
            row.appendChild(cell);
        }
        e.appendChild(row);
    }
    document.getElementById("code").innerText = e.innerHTML;
}

function instr() {
    var rules = document.getElementById("no-show");
    var rotate = document.getElementById("rotate-me");

    if (rules.style.display === "none" || !rules.style.display) {
        rules.style.display = "block";
        rotate.style.transform = "rotate(180deg)";
    } else {
        rules.style.display = "none";
        rotate.style.transform = "rotate(0deg)";
    }
}