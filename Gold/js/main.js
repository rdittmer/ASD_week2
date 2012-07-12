$(document).bind('pageinit', function(){
	var form = $( '#teeForm' );
   form.validate({
      invalidHandler: function(form, validator){},
      submitHandler: function(){
        /* var data = $( ".teeForm" ).serializeArray();
				localStorage.setItem( "teeForm", data );*/
				storeData();
      }
   });
});

//no longer needed due to jquery
/*function ge( x ){
		var theElement = document.getElementById( x );
		return theElement;
	}*/

function storeData( key )
	{
		if ( !key ) 
		{
			var id     = Math.floor( Math.random() * 10001 );
		}
		else
		{
			id         = key;
		}
		//getSelectedRadio();
		//var opts = getOptions();
		var item       = {};
		
		item.Options           = ["Course:"  ,                $( '#Options' ).val()];
		item.reservist          = ["Reservist:"     ,          $( '#reservist' ).val()];
		item.numberGames = ["Number of Games:" , $( '#numberGames' ).val()];
		item.location           = ["Location:"   ,             $( 'input[name=location]:checked', '#teeForm' ).val()];
		item.date                = ["Date:"   ,       			   $( '#date' ).val()];
		item.notes              = ["Notes"       ,              $( '#notes' ).val()];
		
		localStorage.setItem( id, JSON.stringify( item ) );
		alert( "Tee Time Added!" );
	}
	
	// No longer needed due to jquery
	/*function getSelectedRadio()
	{
		var radios = document.forms[0].location;
		
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].checked )
				locationValue = radios[i].value;
		}
	}
	
	function getOptions(){
  		 var opt = document.forms[0].Options;
  		 for(var i=0; i< opt.length; i++){
     		 if(opt[i].selected){
       			  var optionValue = opt[i].value;
    		  };
   		};
  		 return optionValue;
	};*/
	
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 )
		{
			alert( "You currently have no saved Tee Times. Auto add default Tee Times." );
			autoFillData();
		}
		
		$( '#addItemContent' ).append( '<div id="items" /> ' );
		//var makeDiv  = document.createElement( 'div' );
		//makeDiv.setAttribute( "id", "items" );
		$( '#items' ).append( '<ul id="makeList" /> ' );
		//var makeList = document.createElement( 'ul' );
		//makeDiv.appendChild( makeList );
		//document.body.appendChild( makeDiv );
		//ge( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			$( '#makeList' ).append( '<li /> ' );
			//var makeli      = document.createElement( 'li' );
			///////////////////////////////////////////////////////////////////////////////var linksLi     = document.createElement( 'li' );
			//makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			$( '#makeList li' ).last().append( '<ul id="makeSubList" /> ' );
 			//var makeSubList = document.createElement( 'ul' );
			//makeli.appendChild( makeSubList );
			//getImage( obj.Options[1], makeSubList );
			for( var n in obj )
			{
				$( '#makeSubList' ).append( '<li />' );
				//var makeSubli       = document.createElement( 'li' );
				//makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				$( '#makeSubList li' ).last().append( optSubText );
				//makeSubli.innerHTML = optSubText;
				$( '#li' ).last().append( '<li id="linksLi" /> ' );
				//makeSubList.appendChild( linksLi );
			} 
			makeItemLinks( localStorage.key( i ), $( '#linksLi' ) );
			//$('#additem').page.refresh();
		}
	}
	
	function autoFillData()
	{
		for ( var n in json )
		{
			var id = Math.floor( Math.random()*10001 );
			localStorage.setItem( id, JSON.stringify( json[n] ) );
		}
	
	}
	
	function makeItemLinks( key, linksLi )
	{
		var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Tee Times";
		$( '#editLink').on( "click", editItem );
		$( '#editLink' ).html( "editText" );
		$( '#linksLi' ).append( "editLink" );
		
		var breakTag         = document.createElement( 'br' );
		$( '#linksLi' ).append( "breakTag" );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Tee Time";
		$( '#deleteLink' ).on( "click", deleteItem );
		$( '#deleteLink' ).html( "deleteText" );
		$( '#linksLi' ).append( "deleteLink" );
	}
	
	function editItem()
	{
		var value = localStorage.getItem( this.key );
		var item  = JSON.parse( value );
		
		toggleControls( "off" );
		
		$( '#Options' ).val( item.Options[1] );
		$( '#reservist' ).val( item.reservist[1] );
		$( '#numberGames' ).val( item.numberGames[1] );
		var radios = document.forms[0].location;
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].value == "Front 9" && item.location[1] == "Front 9" )
				radios[i].setAttribute( "checked", "checked" );
			else if ( radios[i].value == "Back 9" && item.location[1] == "Back 9" )
				radios[i].setAttribute( "checked", "checked" );
			else if ( radios[i].value == "All 18" && item.location[1] == "All 18" )
				radios[i].setAttribute( "checked", "checked" );
		}
		$( '#gameDate' ).val( item.date[1] );
		$( '#notes' ).val( item.notes[1] );
		
		thiskey         = this.key;
		$( '#submit' ).on( 'click', storeData( thiskey ) );
	}
	
	function deleteItem()
	{
		var ask = confirm( "Are you sure you want to delete this Tee Time?" );
		if (ask)
		{
			localStorage.removeItem( this.key );
			window.location.reload();
			alert( "Tee Time deleted!" );
		}
		else
		{
			alert( "Tee Time not deleted." );
		}
	}
	
	function toggleControls( n )
	{
		switch( n )
		{
			case "on":
				$( '#teeForm' ).toggle( "hide" );
				//$( '#clearData' ).toggle( "show" );
				$( '#displayData' ).toggle( "hide" );
				$( '#addNew' ).removeClass( "ui-disabled" );
				break;
				
			case "off":
				$( '#teeForm' ).toggle( "show" );
				//$( '#clearData' ).toggle( "show" );
				$( '#displayData' ).toggle( "show" );
				$( '#addNew' ).addClass( "ui-disabled" );
				$( '#items' ).toggle( "hide" );
				break;
				
			default:
				return false;	
		}
	}
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "You have no saved Tee Times." );
		}else{
			localStorage.clear();
			alert( "All Tee Times have been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	function windowReload(){
		window.location.reload();
		return false;
	}
	
	var locationValue;
	//var errMessage = ge( 'errors' );
	//makeOptions();
	
	$( '#displayData' ).on( 'click', getData );
	$( '#clearData'    ).on( 'click', clearLocal );
	$( '#addNew'      ).on( 'click', windowReload );
	//var save        = ge( 'submit' );
	//save.addEventListener( "click", validate );