/**
 * Main model object
 *
 */
const model = {
    //Sets sortSettings default values
    sortSettings: {

        sortOption: 'date',
        sortDirection: 'descending'

    },
    sortOptions: [ 'date', 'modified', 'id', 'title' ],
    sortDirections: [ 'descending', 'ascending' ]
};

/**
 * Initializes the model
 *
 */
model.init = function() {

    model.updateLocalStore( jsonData );

};

/**
 * Gets posts from local store
 *
 * @return posts {array} An array of post objects
 */
model.getPosts = function() {

    let posts = model.getLocalStorePosts();
    return posts;

};

/**
 * Get a single post based on url slug
 *
 * @param slug {string} Slug for the post
 * @return post {object} Single post
 */
model.getPost = function( slug ) {

    let posts = model.getLocalStorePosts();
    
    for ( var i = 0, max = posts.length; i < max; i++ ) {
        
        if ( posts[i].slug === slug ) {

            return posts[i];

        }

    }

    return null;

};

/**
 * Gets pages from local store
 *
 * @return pages {array} An array of page objects
 */
model.getPages = function() {

    let pages = model.getLocalStorePages();
    return pages;

};

/**
 * Get a single page based on url slug
 *
 * @param slug {string} Slug for the page
 * @return page {object} Single page
 */
model.getPost = function( slug ) {

    let pages = model.getLocalStorePages();
    
    for ( var i = 0, max = pages.length; i < max; i++ ) {
        
        if ( pages[i].slug === slug ) {

            return pages[i];

        }

    }

    return null;

};

/**
 * Gets posts from local store
 *
 * @return posts {array} Array of posts in localStorage
 */
model.getLocalStorePosts = function( ) {

    let posts = [];

    for ( var i = 0, max = localStorage.length; i < max; i++ ) {

        let postData = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );

        if ( postData.type === 'post' ) {

            posts.push( postData );

        }
        
    }

    return posts.sort( model.sortCompare );

};

/**
 * Gets pages from local store
 *
 * @return pages {array} Array of pages in localStorage
 */
model.getLocalStorePages = function( ) {

    let pages = [];

    for ( var i = 0, max = localStorage.length; i < max; i++ ) {

        let pageData = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );

        if ( pageData.type === 'page' ) {

            pages.push( pageData );

        }
        
    }

    return pages;

};

/**
 * Saves temporary store to local storage.
 *
 * @param store {string} JSON string of data to store
 */
model.updateLocalStore = function( store ) {

    let postData = JSON.parse( store )['posts'],
        pageData = JSON.parse( store )['pages'];

    for ( var i = 0, max = postData.length; i < max ; i++ ) {

        let singlePostData = postData[i];

        localStorage.setItem( singlePostData.slug, JSON.stringify( singlePostData ) );

    }

    for ( var i = 0, max = pageData.length; i < max ; i++ ) {

        let singlePageData = pageData[i];

        localStorage.setItem( singlePageData.slug, JSON.stringify( singlePageData ) );

    }

    localStorage.setItem( 'sortSettings', JSON.stringify( model.sortSettings ) );

};


/**
 * Deletes data from local storage
 *
 * @param name {string} (optional) The name of an item in localStorage. If null, localStorage is cleared
 */
model.removeLocalStore = function( name ) {

    if ( !name ) {

        localStorage.clear();

    } else {

        localStorage.removeItem( name );

    }    

};

/**
 * Returns an array or sortSettings objects
 *
 * @return possibleSortSettings {array} List of all possible sortSettings
 */
model.generatePossibleSortSettings = function() {

    let options = model.sortOptions,
        directions = model.sortDirections,
        possibleSortSettings = [];

    for(var o = 0, oMax = options.length; o < oMax; o++) {

        for(var d = 0, dMax = directions.length; d < dMax; d++) {

            possibleSortSettings.push( { sortOption: options[ o ], sortDirection: directions[ d ] } );

        }

    }

    return possibleSortSettings;

}

/** Sets sortSettings based on user choice
 *
 * @param sortSelectEl {object} The select element where the user made to choice
 */
model.setSortSettings = function( sortSelectEl ) {

    let selected = sortSelectEl.options[ sortSelectEl.selectedIndex ];

    model.sortSettings.sortOption = selected.getAttribute('data-sort-option');
    model.sortSettings.sortDirection = selected.getAttribute('data-sort-direction');

    localStorage.setItem( 'sortSettings', JSON.stringify( model.sortSettings ) );

};

/**
 * Comparison function for post sorting
 *
 * @param a {object} First item to compare
 * @param b {object} Second item to compare
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

        if ( itemA > itemB ) {

            comparison = 1;

        } else if ( itemA < itemB ) {

            comparison = -1;

        }

    } else if ( sortDirection === 'descending' ) {

        if ( itemA < itemB ) {

            comparison = 1;

        } else if ( itemA > itemB ) {

            comparison = -1;
        }

    }

    return comparison;
};