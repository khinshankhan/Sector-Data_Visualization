$(document).ready(function() {
    var run = function(e){
        var val = this.value;
	console.log(val);
        window.location.href = '/quiz/'+val;
    };

    var buttons = document.getElementsByTagName('button');
    for (i = 0; i < buttons.length; i++) {
	if(buttons[i].value != ""){
	    //console.log(buttons[i].value);
	    buttons[i].addEventListener("click", run);
	}
    }
});
