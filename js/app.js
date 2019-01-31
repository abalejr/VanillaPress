
/**
 * Main app file. Initializes app components.
 */
const pageContentEl = document.getElementById('pageContent');
/**
 * The main app object.
 *
 */
var vanillaPress = {

    init: function() {

        // Add any functions here you want
        // to run to start the application
        console.log( jsonData );
        for (i = 0; i < JSON.parse(jsonData).length; i++) {
            let postData = JSON.parse(jsonData)[i];
            localStorage.setItem(postData['slug'], JSON.stringify(postData));
        }
    },
    displayAll: function() {
        for (i = 0; i < localStorage.length; i++) {
            var currentPost = JSON.parse(localStorage.getItem(localStorage.key(i))),
                currentSlug = currentPost.slug,
                postTitle = document.createTextNode(currentPost.title),
                postContent = currentPost.content,
                postHeaderEl = document.createElement('h3'),
                postLinkEl = document.createElement('a'),
                postEl = document.createElement('article');

            postLinkEl.appendChild(postTitle);
            postHeaderEl.appendChild(postLinkEl);
            postEl.appendChild(postHeaderEl);
            pageContentEl.appendChild(postEl);
            postEl.innerHTML += postContent;

            postLinkEl.setAttribute('href', '#' + currentSlug);
        }
    }
};

vanillaPress.init();

// Add your custom code starting here:

vanillaPress.displayAll();