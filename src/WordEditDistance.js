var D = function(i,j){
  if( i == -1 && j == -1) return "";
  if( i == 0 ) return j;
  if( j == 0 ) return i;
  var levenshtein = true;
  var substichar = 2;
  var inschar= 1;
  var delchar = 1;
  var choices =[];

  var x = document.getElementById(divid+i+",-1").innerHTML;
  var y = document.getElementById(divid+"-1,"+j).innerHTML;
  var beforei = parseInt(i-1);
  var beforej = parseInt(j-1);

  
  console.log("Calculating the edit distance of "+x+ " and "+y);
  var diagonal = document.getElementById(divid+ beforei+","+beforej ).innerHTML;
  if(x.indexOf(y) < 0) {
      choices.push( parseInt(diagonal) + substichar );
  }else{
      choices.push( parseInt(diagonal) + 0 );
  }
  
  choices.push( parseInt(document.getElementById(divid+ beforei+","+j).innerHTML) + inschar);
  choices.push( parseInt(document.getElementById(divid+ i+","+beforej).innerHTML) + inschar);
  
  var mindist = (Math.min(choices[0],choices[1],choices[2]))
  console.log("\t "+mindist);
  return mindist;
};
var draw_table = function( divid, xlength, ylength, callback ){
	  document.getElementById(divid).innerHTML= "<div id='graphic'><table id='"+divid+"table'></table></div>";
  	var cellCount = 0;
    for( var y = -1; y < ylength; y++){
  		var tr = document.createElement("tr");
   		tr.setAttribute("id","row"+y);
   		for( var x = -1; x < xlength; x++ ){
   			var td = document.createElement("td");
	    	td.setAttribute("id",divid+x+","+y);
        if(cellCount % 2 == 0) addClass(td,"shaded");
        cellCount++;
	    	td.innerHTML="";
	    	tr.appendChild(td);
   		}
      cellCount++;
   		document.getElementById(divid+"table").appendChild(tr);
  	}
    if (typeof callback == "function" ) {
      callback();
    }
};
var draw_word_axes = function( stringx, stringy, callback ){
	  for( y in stringy ){
  		document.getElementById(divid+"-1,"+y).innerHTML=stringy[y];
  		for( x in stringx ){
    		if( y == 0 ) document.getElementById(divid+x+",-1").innerHTML=stringx[x];
    	}
  	}
    if (typeof callback == "function" ) {
      callback();
    }
};
var fill_in_word_edit_distance = function( xlength, ylength, callback ){
  for( var y = 0; y < ylength; y++){
    for( var x = 0; x < xlength; x++ ){
      document.getElementById(divid+x+","+y).innerHTML = D(x,y);
    }
  }
  if ( typeof callback == "function" ) {
      callback();
  }
};

draw_word_edit_distance = function(divid, stringx, stringy, callback){
  window.divid = divid;
  draw_table(divid, stringx.length, stringy.length, function(){
    draw_word_axes(stringx, stringy, function(){
      fill_in_word_edit_distance(stringx.length,stringy.length);
      window.divid = "";
    });
  });
  if ( typeof callback == "function" ) {
      callback();
  }
};