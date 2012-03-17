var D = function(i,j){
  console.log("Calculating the edit distance of substrings up to i and j of the word.");
  var levenshtein = true;
  var substichar = 2;
  var inschar= 1;
  var delchar = 1;


}
var draw_table = function( xlength, ylength){
	document.getElementById("word_edit_distance").innerHTML= "<div id='graphic'><table border='1' id='table'></table></div>";
  	for( var y = -1; y < ylength; y++){
  		var tr = document.createElement("tr");
   		tr.setAttribute("id","row"+y);
   		for( var x = -1; x < xlength; x++ ){
   			var td = document.createElement("td");
	    	td.setAttribute("id",x+","+y);
	    	td.innerHTML=x+","+y;
	    	tr.appendChild(td);
   		}
   		document.getElementById("table").appendChild(tr);
  	}
}
var draw_word_axes = function(stringx, stringy){
	draw_table(stringx.length,stringy.length);
  	for( y in stringy ){
  		document.getElementById("-1,"+y).innerHTML=stringy[y];
  		for( x in stringx ){
    		if( y == 0 ) document.getElementById(x+",-1").innerHTML=stringx[x];
    	}
  	}
}