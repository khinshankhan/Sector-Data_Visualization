var resu = [];

var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

var data = function(res, fin){
    var j = 0;
    d3.csv("../../static/data/WorldPopulation.csv", function(d) {
	var country = d["answer"];
	var code = d["Country Code"];
	
	//check if contained
	var resl = res.toLowerCase();
	var countryl = country.toLowerCase();
	var codel = country.toLowerCase();
	
	if(countryl.includes(resl) || codel.includes(resl)){
	    var temp = [country, code, d["value"]];
	    //console.log(country);
	    //console.log(code);
	    resu.push(temp);
	}
	if(j == 202){
	    understand();
	    console.log(j);
	    fin(res);
	}
	j+=1;
	return d;
    }, function(error, data) {
	if (error) throw error;
    });
};

var understand = function(){
    console.log("Test start:");
    console.log(resu);
    console.log('res len: ' + resu.length);
    console.log("end");
};

var send = function(res) {
    var temp = JSON.stringify(resu);
    $.ajax({
	url: '/searchjs',
	data : { q : res, d : temp },
	type: 'POST',
	success: function(d) {
	    console.log(d);
	    window.location.href = '/search/'+res; 
	} //end success callback
    });//end ajax call
};

$(document).ready(function() {
    var run = function(e){
	var res = document.getElementById("choice").value;
	//console.log(res);
	data(res, send);
    };
    
    document.getElementById("search_button").addEventListener("click", run);
});
