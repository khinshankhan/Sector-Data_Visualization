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
var bargraph = function(d) {
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  x.domain([0, data.length]);
  y.domain([0, d3.max(data)]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.letter); })
    .attr("y", function(d) { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.frequency); });


  console.log(d);
};


var addRadioListeners = function(){
  for(var i = 0; i < chartRadios.length; i++){
    chartRadios[i].addEventListener("change", changeChart);
  }
};

addRadioListeners();
heatMap.style.display = "none";
graph.style.display = "none";
