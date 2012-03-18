var D = function(i,j){
  if( i == -1 && j == -1) return "";
  if( i == 0 ) {
    addClass(document.getElementById(divid+i+","+j),"insertion");  
    return "↓"+j;
  }
  if( j == 0 ) {
    addClass(document.getElementById(divid+i+","+j),"deletion");
    return "←"+i;
  }
  var levenshtein = true;
  var substichar = function(a, b){
    return 2;
  };
  var inschar = function(c){
    return 1;
  };
  var delchar = function(c){
    return 1;
  };
  var choices =[];
  var backtrace = ["←","↓","↙"];//↑↖
  var x = document.getElementById(divid+i+",-1").innerHTML;
  var y = document.getElementById(divid+"-1,"+j).innerHTML;
  var beforei = parseInt(i-1);
  var beforej = parseInt(j-1);

  
  console.log("Calculating the edit distance of "+x+ " and "+y);
  choices.push( parseInt(document.getElementById(divid+ beforei+","+j).innerHTML.replace(/[←↑↖↓↙]/g,"") ) + inschar(x));
  choices.push( parseInt(document.getElementById(divid+ i+","+beforej).innerHTML.replace(/[←↑↖↓↙]/g,"") ) + inschar(y));
  var diagonal = document.getElementById(divid+ beforei+","+beforej ).innerHTML.replace(/[←↑↖↓↙]/g,"");
  if(x.indexOf(y) < 0) {
      choices.push( parseInt(diagonal) + substichar(x,y) );
  }else{
      choices.push( parseInt(diagonal) + 0 );
  }
  
  var mindist = (Math.min(choices[0],choices[1],choices[2]))
  if (mindist != choices[0]) backtrace[0] = "";
  if (mindist != choices[1]) backtrace[1] = "";
  if (mindist != choices[2]) backtrace[2] = "";
  var source = backtrace[0]+backtrace[1]+backtrace[2];
  if (source == "↙" && backtrace[2] == 2 ) addClass(document.getElementById(divid+i+","+j),"substitution");
  if (source == "←") addClass(document.getElementById(divid+i+","+j),"deletion");
  if (source == "↓") addClass(document.getElementById(divid+i+","+j),"insertion");
  console.log("\t "+mindist);
  return source+mindist;
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
      //cellCount++;
   		//document.getElementById(divid+"table").appendChild(tr);
      preappend(divid+'table',tr);
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
var draw_alignment_path = function(divid, xlength, ylength){
  var x = xlength -1;
  var y = ylength -1; 
  if (x < 0 || y < 0) return;
  var el = document.getElementById(divid+x+","+y);
  var choices =[];
  var beforei = parseInt(x-1);
  var beforej = parseInt(y-1);
  choices.push( parseInt(document.getElementById(divid+ beforei+","+y).innerHTML.replace(/[←↑↖↓↙]/g,"")  ) ) ;
  choices.push( parseInt(document.getElementById(divid+ beforei+","+beforej ).innerHTML.replace(/[←↑↖↓↙]/g,"") ) );
  choices.push( parseInt(document.getElementById(divid+ x+","+beforej).innerHTML.replace(/[←↑↖↓↙]/g,"") ) );
  var mindist = (Math.min(choices[0],choices[1],choices[2]))
  
  if (mindist == choices[0]) {
    addClass(el, "optimal");
    draw_alignment_path(divid, x, y+1);
  }
  if (mindist == choices[1]) {
    addClass(el, "optimal");
    draw_alignment_path(divid, x, y);
  }
  if (mindist == choices[2]) {
    addClass(el, "optimal");
    draw_alignment_path(divid, x+1, y);
  }
};
var draw_alignment_path_origin = function(divid,xlength,ylength, x, y){
  // x = x +1;
  // y = y +1;
  if (x >= xlength-1  || y >= ylength-1) {
    if (x== y ) return;
    //otherwise go back and start over
  }
  var el = document.getElementById(divid+x+","+y);
  addClass(el, "optimal");
  var choices =[];
  var afteri = parseInt(x+1);
  var afterj = parseInt(y+1);
  choices.push( parseInt(document.getElementById(divid+ afteri+","+y).innerHTML.replace(/[←↑↖↓↙]/g,"")  ) ) ;
  choices.push( parseInt(document.getElementById(divid+ afteri+","+afterj ).innerHTML.replace(/[←↑↖↓↙]/g,"") ) );
  choices.push( parseInt(document.getElementById(divid+ x+","+afterj).innerHTML.replace(/[←↑↖↓↙]/g,"") ) );
  var mindist = (Math.min(choices[0],choices[1],choices[2]))
  
  if (mindist == choices[1]) {
    draw_alignment_path_origin(divid, xlength,ylength, x+1, y+1);
  }
  else if (mindist == choices[0]) {
    draw_alignment_path_origin(divid, xlength,ylength, x+1, y);
  }
  else if (mindist == choices[2]) {
    draw_alignment_path_origin(divid, xlength,ylength, x, y+1);
  }
}
var draw_word_edit_distance = function(divid, stringx, stringy, callback){
  window.divid = divid;
  draw_table(divid, stringx.length, stringy.length, function(){
    draw_word_axes(stringx, stringy, function(){
      fill_in_word_edit_distance(stringx.length, stringy.length, function(){
        draw_alignment_path(divid, stringx.length, stringy.length);
        draw_alignment_path_origin( divid, stringx.length, stringy.length, 0 , 0);
      });
      window.divid = "";
    });
  });
  if ( typeof callback == "function" ) {
      callback();
  }
};