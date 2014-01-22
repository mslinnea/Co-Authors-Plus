/* Quick Edit support for Co-Authors-Plus */
(function($) {

	// we create a copy of the WP inline edit post function
	var wpInlineEdit = inlineEditPost.edit

	// and then we overwrite the function with our own code
	inlineEditPost.edit = function( id ) {

		// "call" the original WP edit function
		// we don't want to leave WordPress hanging
		wpInlineEdit.apply( this, arguments )

		// get the post ID
		var postId = 0
		if ( typeof( id ) == 'object' )
			postId = parseInt( this.getId( id ) )

		if ( postId > 0 ) {

			var $editRow = $( '#edit-' + postId )
			var $coauthorsSelect = $('[name="coauthors[]"]', $editRow)
			var $postRow = $( '#post-' + postId )

			// initialize coauthors
			var coauthors = $.map($('.column-coauthors a', $postRow), function(el) {
				return {id: $(el).data('author-id'), text: $(el).text() }
			})

			$coauthorsSelect.select2({
				multiple: true,
				initSelection: function(element, callback) {
					return callback(coauthors)
				},
				query: function() {
					
				}
			})
			$coauthorsSelect.select2("container").find("ul.select2-choices").sortable({
				containment: 'parent',
				start: function() { $coauthorsSelect.select2("onSortStart") },
				update: function() { $coauthorsSelect.select2("onSortEnd") }
			})
		}
	}

})(jQuery)