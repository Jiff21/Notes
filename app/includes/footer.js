/**********************************************************************
* Include for the footer using AJAX.  Hold till you know enough BE.
***********************************************************************/

$.ajax({
  url: '/imports/footer.html',
  // data: data,
  error: function(error) {
  	 console.log('ERROR No Footer Data:::: ', error);
  },

  success: function(fileData) {
	console.log('OUR Footer AJAX Loaded :::: ', fileData);
	$('.footerPlaceholder').html(fileData);
  },

  dataType: 'html'

});