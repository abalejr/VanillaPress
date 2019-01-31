
/**
 * Main app file. Initializes app components.
 */
const pageContentEl = document.getElementById( 'pageContent' ),
      pageTitleEl = document.getElementById( 'pageTitle' ),
      logoLink = document.querySelector('#siteName a'),
      sortSelect = document.getElementById('sortOptions');
let postLinks,
    sortedPosts = [];
/**
 * The main app object.
 *
 */
const vanillaPress = {

    init: function() {

        // Add any functions here you want
        // to run to start the application
        console.log( jsonData );
        if ( ! localStorage.getItem( 'initialized' ) ) {
            for ( i = 0; i < JSON.parse( jsonData ).length; i++ ) {
                let postData = JSON.parse( jsonData )[i];
                localStorage.setItem( postData['slug'], JSON.stringify( postData ) );
                localStorage.setItem( 'initialized', 'true' );
            }
        }
        for ( i = 0; i < localStorage.length; i++ ) {
            let storedItem = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );
            if ( storedItem.type === 'posts' ) {
                sortedPosts.push( storedItem );
            }
        }
        sortedPosts.sort( vanillaPress.sortOptions.byDateDescending );
        vanillaPress.displayAll();
        logoLink.addEventListener( 'click', vanillaPress.displayAll, false );
        sortSelect.onchange = vanillaPress.selectSortOption;
    },
    displayAll: function() {
        if ( pageContentEl.innerHTML != '' ) {
            pageContentEl.innerHTML = '';
            pageTitleEl.innerHTML = '';
        }
        for ( i = 0; i < sortedPosts.length; i++ ) {
            let currentPost = sortedPosts[i],
                currentSlug = currentPost.slug,
                postTitle = document.createTextNode( currentPost.title ),
                postContent = currentPost.content,
                postHeaderEl = document.createElement( 'h3' ),
                postLinkEl = document.createElement( 'a' ),
                postEl = document.createElement( 'article' );

            postLinkEl.setAttribute('href', '#' + currentSlug);
            postLinkEl.classList.add('postLink');

            postLinkEl.appendChild( postTitle );
            postHeaderEl.appendChild( postLinkEl );
            postEl.appendChild( postHeaderEl );
            pageContentEl.appendChild( postEl );
            postEl.innerHTML += postContent;
        }
        postLinks = document.getElementsByClassName('postLink');
        for ( i = 0; i < postLinks.length; i++ ) {
            postLinks[i].addEventListener( 'click', vanillaPress.displayOne, false );
        }
    },
    displayOne: function( clicked ) {
        clicked.preventDefault();
        let clickedHref = clicked.target.href,
            clickedPost = JSON.parse( localStorage.getItem( clickedHref.slice( clickedHref.indexOf( '#' ) + 1 ) ) ),
            clickedTitle = document.createTextNode( clickedPost.title ),
            clickedContent = clickedPost.content;

        pageTitleEl.appendChild( clickedTitle );
        pageContentEl.innerHTML = clickedContent;
    },
    selectSortOption: function() {
        let sortChoice = this.value;
        console.log( sortChoice );
        switch ( sortChoice ) {
            case 'byDateAscending':
                sortedPosts.sort( vanillaPress.sortOptions.byDateAscending );
                vanillaPress.displayAll();
                break;
            case 'byIdAscending':
                sortedPosts.sort( vanillaPress.sortOptions.byIdAscending );
                vanillaPress.displayAll();
                break;
            case 'byModifiedAscending':
                sortedPosts.sort( vanillaPress.sortOptions.byModifiedAscending );
                vanillaPress.displayAll();
                break;
            case 'byTitleAscending':
                sortedPosts.sort( vanillaPress.sortOptions.byTitleAscending );
                vanillaPress.displayAll();
                break;
            case 'byDateDescending':
                sortedPosts.sort( vanillaPress.sortOptions.byDateDescending );
                vanillaPress.displayAll();
                break;
            case 'byIdDescending':
                sortedPosts.sort( vanillaPress.sortOptions.byDateDescending );
                vanillaPress.displayAll();
                break;
            case 'byModifiedDescending':
                sortedPosts.sort( vanillaPress.sortOptions.byModifiedDescending );
                vanillaPress.displayAll();
                break;
            case 'byTitleDescending':
                sortedPosts.sort( vanillaPress.sortOptions.byTitleDescending );
                vanillaPress.displayAll();
        }
    },
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
};
vanillaPress.init();
