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

    let posts = model.getLocalStore();
    return posts;

};

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

};

/**
 * Gets content from local store
 *
 * @return store {object} Object or array of objects of site data
 */
model.getLocalStore = function( ) {

    let posts = [];

    for ( var i = 0, max = localStorage.length; i < max; i++ ) {

        let postData = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );

        if ( postData.type === 'posts' ) {

            posts.push( postData );

        }
        
    }

    return posts.sort( model.sortCompare );

};

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

    localStorage.setItem( 'sortSettings', JSON.stringify( model.sortSettings ) );

};


/**
 * Deletes data from local storage
 *
 * @param name {string} (optional) The name of an item in localStorage. If null, localStorage is cleared
 */
model.removeLocalStore = function( name ) {

    if ( name === null ) {

        localStorage.clear();

    } else {

        localStorage.removeItem( name );

    }    

};

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