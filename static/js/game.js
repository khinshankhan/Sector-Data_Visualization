var data;

var chartRadios = document.getElementsByClassName("charts");
var pieChart = document.getElementById("pie");
var heatMap = document.getElementById("map");
var graph = document.getElementById("graph");

var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

//=============Pie Chart=============
var populateChart = function(d) {
  data = d;

  var color = d3.scaleSequential(d3.interpolateRainbow).domain([0, data.length]);

  var info = document.getElementById("infoText");
  var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc")
      .on('mouseover', function(d) {
        if (data[d.index].answer == "") {
          var rank = d.index + 1;
          var tr = document.getElementById("tr_rank_" + rank);
          var answer_td = tr.getElementsByClassName("right")[0];
          info.innerHTML = answer_td.innerHTML + " " + d3.format(",.1%")(d.value / total(data));
        } else {
          info.innerHTML = d3.format(",.1%")(d.value / total(data));
        }
      })
      .on('mouseout', function() {
        info.innerHTML = "Hover over a slice to learn more!";
      });

  arc.append("path")
    .attr("d", path)
    .attr("id", function(d) { return "arc-" + d.data.answer.replace(" ", "-").toLowerCase(); })
    .attr("fill", "#707070")
    .attr("color", function(d) { return color(d.index); });

  arc.append("text")
    .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
    .attr("dy", "0.35em")
    .attr("id", function(d) { return "text-" + d.data.answer.replace(" ", "-").toLowerCase(); });

  var guess = document.getElementById("guess");
  var score = document.getElementById("score");
  var table = document.getElementById("answer_table");

  guess.addEventListener("input", function() {
    for (var d in data) {
      if (checkAnswer(guess.value, data[d].answer) && guess.value != "") {

        reveal(d, false);

        // handle input box
        guess.value = "";

        // handle dataset to prevent repeats with the similar names
        data[d].answer = "";

        // update score
        score.innerHTML = parseInt(score.innerHTML) + parseInt(document.getElementById("time").innerHTML) + 1;
      }
    }
  });
};

var checkAnswer = function(guess, answer) {
  if (guess && answer) {
    return guess == answer.toLowerCase() || guess == capitalize(answer);
  }
  return false;
};

var reveal = function(d, end) {
  var pie_text = d3.select("#text-" + data[d].answer.replace(" ", "-").toLowerCase());

  if (!end) {
    // create transition
    var t = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);

    // handle pie chart
    pie_text.text(data[d].answer);
    var pie_slice = d3.select("#arc-" + data[d].answer.replace(" ", "-").toLowerCase());
    pie_slice.transition(t).style("fill", pie_slice.attr("color"));
  } else {
    pie_text.style('fill', 'red').style('font-weight', 'bold').text(data[d].answer);
  }

  // handle table
  var rank = parseInt(d) + 1;
  var tr = document.getElementById("tr_rank_" + rank);
  var answer_td = tr.getElementsByClassName("right")[0];
  var value_td = tr.getElementsByClassName("value")[0];
  answer_td.innerHTML = data[d].answer;
  value_td.innerHTML = numberFormat(data[d].value);

  if (end) {
    answer_td.setAttribute("class", "text-danger right");
    value_td.setAttribute("class", "text-danger value");
  }
};

var revealAll = function() {
  for (var d in data) {
    if (data[d].answer && data[d].answer != "") {
      reveal(d, true);
    }
  }
};

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var time = document.getElementById("time");
var guess = document.getElementById("guess");
var countdown = setInterval(function() {
  if (parseInt(time.innerHTML) > 0) {
    time.innerHTML = parseInt(time.innerHTML) - 1;
  } else {
    stopGame();
  }
}, 1000);

var stopGame = function() {
  guess.disabled = true;
  revealAll();
  clearInterval(countdown);
};

var numberFormat = function (s) {
  return d3.format(",")(s);
};

var total = function(data) {
  var s = 0;

  for (var d in data) {
    if (data[d].value) {
      s += parseInt(data[d].value);
    }
  }

  return s;
};

var changeChart = function(){
  if(this.getAttribute("selection") == "Pie Chart"){
    pieChart.style.display = "block";
    heatMap.style.display = "none";
    graph.style.display = "none";
  }
  else if(this.getAttribute("selection") == "Heat Map"){
    pieChart.style.display = "none";
    heatMap.style.display = "block";
    graph.style.display = "none";
  }
  else{
    pieChart.style.display = "none";
    heatMap.style.display = "none";
    graph.style.display = "block";
  }
};


// BAR GRAPH STUFF
var barg_margin = {top: 20, right: 20, bottom: 50, left: 40},
    barg_width = 500 - barg_margin.left - barg_margin.right,
    barg_height = 500 - barg_margin.top - barg_margin.bottom;

var barg_svg = d3.select("#graph").append("svg")
      .attr("width", barg_width + barg_margin.left + barg_margin.right)
      .attr("height", barg_height + barg_margin.top + barg_margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + barg_margin.left + "," + barg_margin.top + ")");

var barg_x = d3.scale.ordinal().rangeRoundBands([barg_margin.left, barg_width - barg_margin.right], .05),
    barg_y = d3.scaleLinear().rangeRound([barg_height - barg_margin.bottom, barg_margin.top]);//d3.scale.linear().range([barg_height, 0]);

var barg_g = barg_svg.append("g")
    .attr("transform", "translate(" + barg_margin.left + "," + barg_margin.top + ")");



var bargraph = function(data) {
  console.log(data);
  data.push("temp"); //cheaty

  barg_x.domain(data.map(function(d) { return d.answer; }));
  barg_y.domain([0, d3.max(data, function(d) { return parseInt(d.value); }) * 1.25]);

  data.pop(); //end cheaty

  barg_g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + -3 + "," + (barg_height - barg_margin.bottom) + ")")
    .call(d3.axisBottom(barg_x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "translate(" + (5 + (barg_x.rangeBand() - 10)/2) + ", 0) rotate(-90)" );


  barg_g.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(" + barg_margin.left + ", 0)")
    .call(d3.axisLeft(barg_y).ticks(10, "g"));

  barg_g.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .style("fill", "lightsteelblue")
    .attr("x", function(d) { return barg_x(d.answer) + 5; })
    .attr("width", barg_x.rangeBand() - 10)
    .attr("y", function(d) { return barg_y(parseInt(d.value)) - barg_margin.bottom ; })
    .attr("height", function(d) { return barg_height - barg_y(parseInt(d.value)); });
};


var addRadioListeners = function(){
  for(var i = 0; i < chartRadios.length; i++){
    chartRadios[i].addEventListener("change", changeChart);
  }
};

addRadioListeners();
setTimeout(function(){heatMap.style.display = "none";}, 50);//need this because there is no possible way to tell when the geomap has been rendered and it cant be hidden until it is rendered
setTimeout(function(){graph.style.display = "none";}, 50);
