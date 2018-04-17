var test = function(){
var s = document.getElementsByTagName('p'); //document.documentElement.outerHTML
var term = "oof";

for (i = 0; i < s.length; i++) {
    str = s[i];
    console.log(str);
    var n = str.search(term);
    var res = str.slice(n, term.length - 1);
    console.log(res);
    document.getElementById("oh") = res;
}
};

