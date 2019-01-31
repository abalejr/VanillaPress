
/**
 * Main app file. Initializes app components.
 */
const pageContentEl = document.getElementById( 'pageContent' ),
      pageTitleEl = document.getElementById( 'pageTitle' );
let postLinks;
/**
 * The main app object.
 *
 */
const vanillaPress = {

    init: function() {

        // Add any functions here you want
        // to run to start the application
        console.log( jsonData );
        for (i = 0; i < JSON.parse( jsonData ).length; i++) {
            let postData = JSON.parse( jsonData )[i];
            localStorage.setItem( postData['slug'], JSON.stringify( postData ) );
        }
    },
    displayAll: function() {
        for (i = 0; i < localStorage.length; i++) {
            let currentPost = JSON.parse( localStorage.getItem( localStorage.key( i ) ) ),
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
    },
    displayOne: function(clicked) {
        clicked.preventDefault();
        let clickedHref = clicked.target.href,
            clickedPost = JSON.parse( localStorage.getItem( clickedHref.slice( clickedHref.indexOf( '#' ) + 1 ) ) ),
            clickedTitle = document.createTextNode( clickedPost.title ),
            clickedContent = clickedPost.content;

        pageTitleEl.appendChild(clickedTitle);
        pageContentEl.innerHTML = clickedContent;
    }
};

vanillaPress.init();

// Add your custom code starting here:

vanillaPress.displayAll();

for (i = 0; i < postLinks.length; i++) {
    postLinks[i].addEventListener('click', vanillaPress.displayOne, false);
}
