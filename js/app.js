
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
};

vanillaPress.init();

// Add your custom code starting here: