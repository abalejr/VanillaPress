
/**
 * Router file for managing url changes
 */

/**
 * The main router object.
 *
 */

const router = {};

/**
 * Initializes the router
 *
 */
router.init = function() {

    router.loadContent();
    router.listenPageChange();
    router.listenSortChange();

};

/**
 * Gets the slug from the URL
 *
 * @return slug {string} Slug of the visited content
 */
router.getSlug = function() {

    let slug = window.location.hash;

    if ( slug === '' ) {

        return null;

    }

    return slug.substring( 1 );

};

/**
 * Listener function for sort order changes
 *
 */
router.listenSortChange = function() {

    const sortSettingsEl = helpers.getSortSelectEl();
    sortSettingsEl.onchange = function() {
        model.setSortSettings( this );
        router.loadContent();
    };

};

/**
 * Listener function for URL changes
 *
 */
router.listenPageChange = function() {

    window.addEventListener( 'hashchange', router.loadContent, false );

};

/**
 * Determines what to load based on the URL
 *
 */
router.loadContent = function() {

    let slug = router.getSlug()
        sortSelectEl = helpers.getSortSelectEl();

    view.clearContent();

    if ( slug === null ) {

        view.loadPage( 'home' );

    } else if ( slug === 'blog' ) {

        view.loadPage( slug );
        view.loadBlogPosts();

        if ( sortSelectEl.style.display === 'none' ) {
            sortSelectEl.style.display = 'block';
        }

    } else if ( slug != 'blog' && slug.includes( 'blog' ) ) {

        view.loadBlogPost( slug );

    } else {

        view.loadPage( slug );

    }

}; 
