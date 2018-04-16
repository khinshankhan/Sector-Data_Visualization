var data;

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

var populateChart = function(d) {
  data = d;

  var color = d3.scaleSequential(d3.interpolateRainbow).domain([0, data.length]);

  var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

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

        // create transition
        var t = d3.transition()
            .duration(750)
            .ease(d3.easeLinear);

        // handle pie chart
        var pie_text = d3.select("#text-" + data[d].answer.replace(" ", "-").toLowerCase());
        pie_text.text(data[d].answer);
        var pie_slice = d3.select("#arc-" + data[d].answer.replace(" ", "-").toLowerCase());
        pie_slice.transition(t).style("fill", pie_slice.attr("color"));

        // handle table
        var rank = parseInt(d) + 1;
        var tr = document.getElementById("tr_rank_" + rank);
        var answer_td = tr.getElementsByClassName("right")[0];
        var value_td = tr.getElementsByClassName("value")[0];
        answer_td.innerHTML = data[d].answer;
        value_td.innerHTML = data[d].value;

        // handle input box
        guess.value = "";

        // handle dataset to prevent repeats with the similar names
        data[d].answer = "";

        // update score
        score.innerHTML = parseInt(score.innerHTML) + parseInt(document.getElementById("time").innerHTML) + 1;
      }
    }
  });
}

var checkAnswer = function(guess, answer) {
  if (guess && answer) {
    return guess == answer.toLowerCase() || guess == capitalize(answer);
  }
  return false;
}

var revealAll = function() {
  for (var d in data) {
    if (data[d].answer && data[d].answer != "") {

      console.log(data[d].answer);

      // handle pie chart
      var pie_text = d3.select("#text-" + data[d].answer.replace(" ", "-").toLowerCase());
      pie_text.style('fill', 'red').style('font-weight', 'bold').text(data[d].answer);

      // handle table
      var rank = parseInt(d) + 1;
      var tr = document.getElementById("tr_rank_" + rank);
      var answer_td = tr.getElementsByClassName("right")[0];
      var value_td = tr.getElementsByClassName("value")[0];
      answer_td.innerHTML = data[d].answer;
      answer_td.setAttribute("class", "text-danger right");
      value_td.innerHTML = data[d].value;
      value_td.setAttribute("class", "text-danger value");
    }
  }
}

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
}
