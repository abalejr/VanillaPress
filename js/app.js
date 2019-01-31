
/**
 * Main app file. Initializes app components.
 */
const pageContentEl = document.getElementById( 'pageContent' ),
      pageTitleEl = document.getElementById( 'pageTitle' )
      logoLink = document.querySelector('#siteName a');
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
        if (!localStorage.getItem('initialized')) {
            for (i = 0; i < JSON.parse( jsonData ).length; i++) {
                let postData = JSON.parse( jsonData )[i];
                localStorage.setItem( postData['slug'], JSON.stringify( postData ) );
                localStorage.setItem('initialized', 'true');
            }
        }
        for (i = 0; i < localStorage.length; i++) {
            let storedItem = JSON.parse( localStorage.getItem( localStorage.key( i ) ) );
            if (storedItem.type === 'posts') {
                sortedPosts.push(storedItem);
            }
        }
        sortedPosts.sort(function(a, b) {
            const dateA = Date.parse(a.date),
                  dateB = Date.parse(b.date);
            let comparison = 0;
            if (dateA > dateB) {
                comparison = 1;
            } else if (dateA < dateB) {
                comparison = -1;
            }
            return comparison;
        });
    },
    displayAll: function() {
        if (pageContentEl.innerHTML != '') {
            pageContentEl.innerHTML = '';
            pageTitleEl.innerHTML = '';
        }
        for (i = 0; i < sortedPosts.length; i++) {
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
        for (i = 0; i < postLinks.length; i++) {
            postLinks[i].addEventListener( 'click', vanillaPress.displayOne, false );
        }
    },
    displayOne: function(clicked) {
        clicked.preventDefault();
        let clickedHref = clicked.target.href,
            clickedPost = JSON.parse( localStorage.getItem( clickedHref.slice( clickedHref.indexOf( '#' ) + 1 ) ) ),
            clickedTitle = document.createTextNode( clickedPost.title ),
            clickedContent = clickedPost.content;

        pageTitleEl.appendChild( clickedTitle );
        pageContentEl.innerHTML = clickedContent;
    }
};
vanillaPress.init();
vanillaPress.displayAll();

logoLink.addEventListener( 'click', vanillaPress.displayAll, false );
