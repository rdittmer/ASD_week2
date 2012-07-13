$( '#remoteData' ).live( 'pageinit', function(){
  $( '#jsonButton' ).on( "click", function () {
	  console.log("button clicked");
        $.ajax( {
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success:function ( response ) {
                for ( var i = 0, len = response.json.length; i < len; i++ ) {
                    var item = response.json[i];
					console.log(item);
                    $( ' ' + 
					'<div class="times">' +
					'<p>' + item.Options + '</p>' +
					'<p>' + item.reservist + '</p>' +
					'<p>' + item.numberGames + '</p>' +
					'<p>' + item.location + '</p>' +
					'<p>' + item.date + '</p>' +
					'<p>' + item.notes + '</p>' +
					'</div>'
					).appendTo( '#jsonData' );
                }
            }
        });
    });
});