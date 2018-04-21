var getval = function(name){
    return document.querySelector('input[name='+name+']:checked').value;
};

$(document).ready(function() {
    var run = function(e){
        var val = this.value;
        var val2 = getval("gr1");
        var val3 = getval("gr2");
        //console.log(val);
        //console.log(val2);
        //console.log(val3);
        window.location.href = '/quiz/'+val+'_'+val2+'_'+val3;
    };

    var buttons = document.getElementsByTagName('button');
    for (i = 0; i < buttons.length; i++) {
        if(buttons[i].value != ""){
            //console.log(buttons[i].value);
            buttons[i].addEventListener("click", run);
        }
    }
});
