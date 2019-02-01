/**
 * Main model object
 *
 */
const model = {
    sortOptions: {}
};

/**
 * Initializes the model
 *
 */
model.init = function() {

    model.updateLocalStore( jsonData );

}

/**
 * Gets content from local store
 *
 * @param name {string} Name of data to be retrieved
 * @return store {object} Object or array of objects of site data
 */
model.getLocalStore = function( name ) {

    return JSON.parse( localStorage.getItem( name ) );

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
        localStorage.setItem( currentData.slug, JSON.stringify( currentData ) );
    }

    model.buildPostArray();

}

/**
 * Creates an array of posts in local storage
 *
 * @return unsortedPosts {array} Array of posts
 */
model.buildPostArray = function() {

    let unsortedPosts = [];

    for ( var i = 0, max = localStorage.length; i < max; i++ ) {
        let storedItem = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );
        if ( storedItem.type === 'posts' ) {
            unsortedPosts.push( storedItem );
        }
    }

    return unsortedPosts;
}

model.selectSortOption = function() {
    switch ( this.value ) {
        case 'byDateAscending':
            sortedPosts.sort( vanillaPress.sortOptions.byDateAscending );
            break;
        case 'byIdAscending':
            sortedPosts.sort( vanillaPress.sortOptions.byIdAscending );
            break;
        case 'byModifiedAscending':
            sortedPosts.sort( vanillaPress.sortOptions.byModifiedAscending );
            break;
        case 'byTitleAscending':
            sortedPosts.sort( vanillaPress.sortOptions.byTitleAscending );
            break;
        case 'byDateDescending':
            sortedPosts.sort( vanillaPress.sortOptions.byDateDescending );
            break;
        case 'byIdDescending':
            sortedPosts.sort( vanillaPress.sortOptions.byDateDescending );
            break;
        case 'byModifiedDescending':
            sortedPosts.sort( vanillaPress.sortOptions.byModifiedDescending );
            break;
        case 'byTitleDescending':
            sortedPosts.sort( vanillaPress.sortOptions.byTitleDescending );
    }
    vanillaPress.displayAll();
}

model.setSortOption = function( sortOption, ascOrDesc )
    sortOptions: {
        byDateAscending: function( a, b ) {
            const dateA = Date.parse( a.date ),
                  dateB = Date.parse( b.date );
            let comparison = 0;
            if ( dateA > dateB ) {
                comparison = 1;
            } else if ( dateA < dateB ) {
                comparison = -1;
            }
            return comparison;
        },
        byIdAscending: function( a, b ) {
            const idA = a.id,
                  idB = b.id;
            let comparison = 0;
            if ( idA > idB ) {
                comparison = 1;
            } else if ( idA < idB ) {
                comparison = -1;
            }
            return comparison;
        },
        byModifiedAscending: function( a, b ) {
            const dateA = Date.parse( a.modified ),
                  dateB = Date.parse( b.modified );
            let comparison = 0;
            if ( dateA > dateB ) {
                comparison = 1;
            } else if ( dateA < dateB ) {
                comparison = -1;
            }
            return comparison;
        },
        byTitleAscending: function( a, b ) {
            const titleA = a.title,
                  titleB = b.title;
            let comparison = 0;
            if ( titleA > titleB ) {
                comparison = 1;
            } else if ( titleA < titleB ) {
                comparison = -1;
            }
            return comparison;
        },
        byDateDescending: function( a, b ) {
            const dateA = Date.parse( a.date ),
                  dateB = Date.parse( b.date );
            let comparison = 0;
            if ( dateA < dateB ) {
                comparison = 1;
            } else if ( dateA > dateB ) {
                comparison = -1;
            }
            return comparison;
        },
        byIdDescending: function( a, b ) {
            const idA = a.id,
                  idB = b.id;
            let comparison = 0;
            if ( idA < idB ) {
                comparison = 1;
            } else if ( idA > idB ) {
                comparison = -1;
            }
            return comparison;
        },
        byModifiedDescending: function( a, b ) {
            const dateA = Date.parse( a.modified ),
                  dateB = Date.parse( b.modified );
            let comparison = 0;
            if ( dateA < dateB ) {
                comparison = 1;
            } else if ( dateA > dateB ) {
                comparison = -1;
            }
            return comparison;
        },
        byTitleDescending: function( a, b ) {
            const titleA = a.title,
                  titleB = b.title;
            let comparison = 0;
            if ( titleA < titleB ) {
                comparison = 1;
            } else if ( titleA > titleB ) {
                comparison = -1;
            }
            return comparison;
        }
    }