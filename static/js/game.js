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

var populateChart = function(data) {
  var color = d3.scaleSequential(d3.interpolateRainbow).domain([0, data.length]);

  var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.index); });

  arc.append("text")
    .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
    .attr("dy", "0.35em")
    .attr("id", function(d) { return "text-" + d.data.answer.replace(" ", "-").toLowerCase(); });

  var guess = document.getElementById("guess");
  var table = document.getElementById("answer_table");

  guess.addEventListener("input", function() {
    for (var d in data) {
      if (checkAnswer(guess.value, data[d].answer) && guess.value != "") {

        // handle pie chart
        var pie_text = d3.select("#text-" + data[d].answer.replace(" ", "-").toLowerCase());
        pie_text.text(data[d].answer);

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

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
