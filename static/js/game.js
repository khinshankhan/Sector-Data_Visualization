var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

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
  var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.answer); });

  arc.append("text")
    .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
    .attr("dy", "0.35em")
    .attr("id", function(d) { return "text-" + d.data.answer.replace(" ", "-"); });

  var guess = document.getElementById("guess");
  guess.addEventListener("input", function() {
    for (var d in data) {
      if (guess.value == data[d].answer) {
        var text = d3.select("#text-" + guess.value.replace(" ", "-"));
        text.text(guess.value);
        guess.value = "";
        data[d].answer = "";
      }
    }
  });
}
