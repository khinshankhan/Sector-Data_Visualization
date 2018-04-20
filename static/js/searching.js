var resu = [];
var pause = false;

var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

var data = function(res){
    
    d3.csv("../../static/data/WorldPopulation.csv", function(d) {
	var country = d["answer"];
	var code = d["Country Code"];
	
	//check if contained
	var resl = res.toLowerCase();
	var countryl = country.toLowerCase();
	var codel = country.toLowerCase();
	
	if(countryl.includes(resl) || codel.includes(resl)){
	    //var temp = [country, code, d["value"]];
	    for (i in d){
		var t = d[i];
		resu.push(t);
	    }
	    //console.log(country);
	    //console.log(code);
	}

	return d;
    }, function(error, data) {
	if (error) throw error;
    });
    pause = true;
};

var understand = function(){
    //NEED ATTENTION HERE!!!
    console.log("Test start:");
    console.log(resu);
    console.log('res1 len: ' + resu.length);
    //console.log(results[0]);
    //console.log(results[0].answer);
    console.log("end");

    //var ooh = document.getElementById("oh").innerHTML;
    //document.getElementById("oh").innerHTML = "hi there";
};

$(document).ready(function() {
    var run = function(e){
	var res = document.getElementById("choice").value;
	//console.log(res);
	data(res);
	//sleep(2000);
	if (pause == true){
	    //console.log(pause);
	    understand();
	    pause = false;
	}
    };
    
    document.getElementById("search_button").addEventListener("click", run);
});
