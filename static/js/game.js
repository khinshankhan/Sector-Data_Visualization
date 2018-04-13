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
    .attr("fill", function(d) { console.log(d); return color(d.index); });

  arc.append("text")
    .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
    .attr("dy", "0.35em")
    .attr("id", function(d) { return "text-" + d.data.answer.replace(" ", "-"); });

  var guess = document.getElementById("guess");
  var table = document.getElementById("answer_table");

  guess.addEventListener("input", function() {
    for (var d in data) {
      if (guess.value == data[d].answer && guess.value != "") {

        // handle pie chart
        var pie_text = d3.select("#text-" + guess.value.replace(" ", "-"));
        pie_text.text(guess.value);

        // handle table
        var rank = parseInt(d) + 1;
        var tr = document.getElementById("tr_rank_" + rank);
        var td = tr.getElementsByClassName("right")[0];
        td.innerHTML = guess.value;

        // handle input box
        guess.value = "";

        // handle dataset to prevent repeats with the similar names
        data[d].answer = "";
      }
    }
  });
}
