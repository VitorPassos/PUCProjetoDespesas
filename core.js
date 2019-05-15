// JavaScript Document
//On load page, init the timer which check if the there are anchor changes each 300 ms
$(document).ready(function(){
	setInterval("checkAnchor()", 300);
});
var currentAnchor = null;
//Function which chek if there are anchor changes, if there are, sends the ajax petition
function checkAnchor(){
	//Check if it has changes
	if(currentAnchor != document.location.hash){
		currentAnchor = document.location.hash;
		//if there is not anchor, the loads the default section
		if(!currentAnchor){
			query = "home";
		}else{
			//Creates the  string callback. This converts the url URL/#main&id=2 in URL/?section=main&id=2
			var splits = currentAnchor.substring(1).split('&');
			//Get the section
			var section = splits[0];
			delete splits[0];
			//Create the params string
			var params = splits.join('&');
			var query = section /*+ params*/;
			
		}
		$.post( "pagina.php", { url: query }).done(function( data ) {
			$('.modal-box-conteudo').html(data);
		 });
		
		//return query;
	}
}

