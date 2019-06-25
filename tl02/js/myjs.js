var json;

const colors = ['#00457D', '#FFD300', '#97BF0D', '#E6444F', '#878783'];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function run() {
    $("#loading").remove();
    console.log("loader deleted");
    $.getJSON("data/studzahlen.json", function(data) {
        console.log(data);
        json = data;
        console.log(json);
        let balken_data = [];
        $.each(json, function(index, semester) {
            balken_data.push(semester["studierende"]);
        });
        console.log(balken_data);
        let semester_names = [];
        $.each(json, function(index, semester) {
            semester_names.push(semester["semester"]);
        })
        console.log(semester_names);
        drawBalken(balken_data, semester_names);
        $("#balken > g.bar").hover(function() {
                $(this).find("rect").css('fill', '#E6444F');
                console.log($(this).index());
                let select_label = "#label" + $(this).index();
                console.log(select_label);
                $(select_label).attr("style", "display:inherit");
                // let select_tag = "#tag" + $(this).index();
                // console.log(select_tag);
                // $(select_tag).attr("style", "display:inherit");
            }, function() {
                $(this).find("rect").css('fill', '#00457D');
                let select = "#label" + $(this).index();
                console.log(select);
                $(select).attr("style", "display:none");
                // let select_tag = "#tag" + $(this).index();
                // console.log(select_tag);
                // $(select_tag).attr("style", "display:none");
            })
            .click(function() {
                $("#pie").remove();
                $("#table").remove();
                var semesterName = json[$(this).index()]["semester"];
                console.log(semesterName);
                var falkultaeten = json[$(this).index()]["fakultaeten"];
                console.log(falkultaeten);
                $("#hinweis").attr("style", "display:none");
                drawDonut(semesterName, falkultaeten);
            });
    });
}

function drawBalken(balken_data, semester_names) {

    let height = $(window).height() * 0.6;
    let columWidth = ($(window).width() * 0.6) / 18;

    var y = d3.scaleLinear().domain([0, d3.max(balken_data)]).range([0, height]);

    var svg_balken_chart = d3.select("#balken")
        .attr("height", height + 80)
        .attr("width", columWidth * balken_data.length + 80);

    var bar = svg_balken_chart.selectAll("g.bar")
        .data(balken_data)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
            return "translate(" + (50 + i * columWidth) + "," + (height - y(d)) + ")";
        });

    bar.append("rect")
        .attr("height", y)
        .attr("width", columWidth - 1)
        .attr("class", "bar")
        .attr("style", "fill:#00457D");

    bar.append("text")
        .attr("class", "bar_text")
        .attr("x", "0")
        .attr("y", "0")
        // .attr("transfort", function(d, i) {
        //     return "translate(5," + (height - y(d)) + ") rotate(90)"
        // })
        .attr("transform", "translate(5,5) rotate(90)")
        .text(function(d, i) {
            return semester_names[i];
        });

    var label = svg_balken_chart.selectAll("g.label")
        .data(balken_data)
        .enter()
        .append("g")
        .attr("class", "label")
        .attr("id", function(d, i) {
            return ("label" + i);
        })
        .attr("transform", function(d, i) {
            return "translate(" + (50 + i * columWidth) + "," + (height - y(d)) + ")";
        }).attr("style", "display:none");

    label.append("rect")
        .attr("x", columWidth - 1)
        .attr("y", function(d) {
            return (y(d) - 16);
        })
        .attr("class", "label")
        .attr("height", 16)
        .attr("width", 50)
        .attr("style", "fill:#E6444F");

    label.append("text")
        .attr("class", "label_text")
        .attr("x", columWidth - 1)
        .attr("y", function(d) {
            return (y(d) - 2);
        })
        .text(function(d) {
            return d;
        });

    // var nametag = svg_balken_chart.selectAll("g.tag")
    //     .data(balken_data)
    //     .enter()
    //     .append("g")
    //     .attr("class", "tag")
    //     .attr("id", function(d, i) {
    //         return ("tag" + i);
    //     })
    //     .attr("transform", function(d, i) {
    //         return "translate(" + (50 + i * columWidth) + "," + (height - y(d)) + ")";
    //     }).attr("style", "display:none");

    // nametag.append("rect")
    //     .attr("x", columWidth - 1)
    //     .attr("y", function(d) {
    //         return (y(d) - 32);
    //     })
    //     .attr("class", "tag")
    //     .attr("height", 16)
    //     .attr("width", 200)
    //     .attr("style", "fill:#E6444F");

    // nametag.append("text")
    //     .attr("class", "tag_text")
    //     .attr("x", columWidth - 1)
    //     .attr("y", function(d) {
    //         return (y(d) - 18);
    //     })
    //     .text(function(d, i) {
    //         return semester_names[i];
    //     });

    svg_balken_chart.append("g").append("text").attr("id", "balken_vertical").text("Studierendenzahlen")
        .attr("x", "0").attr("y", "0").attr("style", ("font-size:" + height * 0.05 + ";")).attr("transform", "translate(15," + ((height + 40) / 2) + ") rotate(90)");

    svg_balken_chart.append("g").append("text").attr("id", "balken_horizontal").text("Semester")
        .attr("x", "0").attr("y", "0").attr("style", ("font-size:" + height * 0.05 + ";")).attr("transform", "translate(" + ((columWidth * balken_data.length + 100) / 2) + "," + (height + 40) + ")");

    $("#hinweis").removeAttr("style").attr("style", "float:right");
}

function drawDonut(semestername, donut_data) {

    let data = [];
    let fak_names = [];
    $.each(donut_data, function(i, d) {
        data.push(d["anzahlStud"]);
        fak_names.push(d["name"]);
    });
    console.log(data);

    let pie = d3.pie().sort(null);
    let piedata = pie(data);

    let radiusOuter = ($(window).width()) * 0.13;
    let radiusInner = radiusOuter - 30;
    console.log(radiusOuter);
    console.log(fak_names);

    let arc = d3.arc()
        .innerRadius(radiusInner)
        .outerRadius(radiusOuter);

    let length = radiusOuter * 2;

    let pie_chart = d3.select("div.detail")
        .append("svg")
        .attr("id", "pie")
        .attr("width", length)
        .attr("height", length);

    let arcs = pie_chart.selectAll("g")
        .data(piedata)
        .enter()
        .append("g")
        .attr("transform", "translate(" + radiusOuter + "," + radiusOuter + ")");

    arcs.append("path")
        .attr("fill", function(d, i) {
            return colors[i];
        })
        .attr("d", function(d) {
            return arc(d);
        });

    pie_chart.append("g")
        .append("text")
        .attr("id", "pie_text")
        .attr("x", "0")
        .attr("y", "0")
        .attr("style", ("font-size:" + radiusOuter * 0.1 + ";"))
        .text(function() { return semestername; })
        .attr("transform", "translate(" + radiusOuter + "," + radiusOuter + ")");

    makeTable(data, fak_names);
}

function makeTable(data, fak_names) {

    // $(".detail").append("table").attr("id","table")
    //     .append("tr");

    let width = $(window).width() * 0.28;
    let height = width / 6;

    let table = d3.select("div.detail")
        .append("table")
        .attr("id", "table")
        .attr("width", width)
        .attr("height", height);

    table.append("tr").attr("id", "tr01");
    table.append("tr").attr("id", "tr02");

    d3.select("table#table>tr#tr01")
        .selectAll("th")
        .data(fak_names)
        .enter()
        .append("th")
        .attr("id", function(d, i) {
            return "th" + i;
        })
        .text(function(d) {
            return d;
        }).attr("style", function(d, i) {
            return "background-color: " + colors[i] + "; height: " + (height * 0.6) + ";";
        });

    d3.select("table#table>tr#tr02")
        .selectAll("td")
        .data(data)
        .enter()
        .append("td")
        .text(function(d) {
            return d;
        });

    $("#th0").css({ color: "white" });
}