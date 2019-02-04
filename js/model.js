/**
 * Main model object
 *
 */
const model = {
    sortSettings: {

        sortOption: 'date',
        sortDirection: 'descending'
    }
};

/**
 * Initializes the model
 *
 */
model.init = function() {

    model.updateLocalStore( jsonData );

}

/**
 * Gets posts from local store
 *
 * @return posts {array} An array of post objects
 */
model.getPosts = function() {

    let posts = model.getLocalStore();
    return posts;

}

/**
 * Get a single post based on url slug
 *
 * @param slug {string} Slug for the post
 * @return post {object} Single post
 */
model.getPost = function( slug ) {

    let posts = model.getLocalStore();
    
    for ( var i = 0, max = posts.length; i < max; i++ ) {
        
        if ( posts[i].slug === slug ) {

            return posts[i];

        }

    }

    return null;

}

/**
 * Gets content from local store
 *
 * @return store {object} Object or array of objects of site data
 */
model.getLocalStore = function( ) {

    let posts = [];

    for ( var i = 0, max = localStorage.length; i < max; i++ ) {

        let postData = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );

        posts.push( postData );
        
    }

    return posts.sort( model.sortCompare );

}

/**
 * Saves temporary store to local storage.
 *
 * @param store {string} JSON string of data to store
 */
model.updateLocalStore = function( store ) {

    let data = JSON.parse( store );

    for ( var i = 0, max = data.length; i < max ; i++ ) {
        let postData = data[i];
        localStorage.setItem( postData.slug, JSON.stringify( postData ) );
    }

}


/**
 * Deletes data from local storage
 *
 */
model.removeLocalStore = function() {

    localStorage.removeItem( 'VanillaPress' );

}


/**
 * Gets the sort settings to be used. Date descending by default, user selection if applicable
 *
 * @return sortSettings {object} Current sort settings: sortOption and sortDirection
 *
 */

model.setSortSettings = function() {

    model.sortSettings.sortOption = this.dataset.sortOption;
    model.sortSettings.sortDirection = this.dataset.sortDirection;

}

/**
 * Sorts posts when sort dropdown option is changed
 *
 * @param sortSettings {object} Object with sortOption and sortDirection values
 *
 * @return sortedPosts {array} Posts sorted according to user selected option
 */
model.getSortedPosts = function( posts, sortSettings ) {

    let sortedPosts = posts.sort( model.sortCompare );

    return sortedPosts;

}

/**
 * Comparison function for post sorting
 *
 * @param a {object} First item to compare
 * @param b {object} Second object to compare
 *
 * @return comparison {integer} Result of the comparison
 */
model.sortCompare = function( a, b ) {
    const sortOption = model.sortSettings.sortOption,
          sortDirection = model.sortSettings.sortDirection;
    let comparison = 0,
        itemA,
        itemB;

    if ( sortOption === 'date' ) {

        itemA = Date.parse( a.date );
        itemB = Date.parse( b.date );

    } else if ( sortOption === 'modified' ) {

        itemA = Date.parse( a.modified );
        itemB = Date.parse( b.modified );

    } else if ( sortOption === 'title' ) {

        itemA = a.title;
        itemB = b.title;

    } else if ( sortOption === 'id' ) {

        itemA = a.id;
        itemB = b.id;

    }

    if ( sortDirection === 'ascending' ) {

        if ( itemA < itemB ) {

            comparison = 1;

        } else if ( itemA > itemB ) {

            comparison = -1;

        }

    } else if ( sortDirection === 'descending' ) {

        if ( itemA > itemB ) {

            comparison = 1;

        } else if ( itemA < itemB ) {

            comparison = -1;
        }

    }

    return comparison;
}