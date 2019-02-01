function storePosts() {
	if ( localStorage.getItem( 'postsUpToDate' ) != 'true' ) {
	    for ( i = 0; i < JSON.parse( jsonData ).length; i++ ) {
	        let postData = JSON.parse( jsonData )[i];
	        localStorage.setItem( postData['slug'], JSON.stringify( postData ) );
	        localStorage.setItem( 'postsUpToDate', 'true' );
	    }
	}
}
function buildPostArray() {
	for ( i = 0; i < localStorage.length; i++ ) {
        let storedItem = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );
        if ( storedItem.type === 'posts' ) {
            sortedPosts.push( storedItem );
        }
    }
}