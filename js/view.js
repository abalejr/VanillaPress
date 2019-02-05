
/**
 * View file for displaying content
 */

/**
 * Main view object
 *
 */
const view = {};

/**
 * Gets blog posts and appends them to the page
 *
 */
view.loadBlogPosts = function() {

    let posts = model.getPosts(),
        postMarkup = document.createDocumentFragment();
    const primaryContentEl = helpers.getPageContentEl();

    for ( var i = 0, max = posts.length; i < max; i++ ) {

        postMarkup.appendChild( view.createPostMarkup( posts[ i ] ) );

    }

    primaryContentEl.appendChild( postMarkup );

};

/**
 * Loads a single blog post
 *
 * @param slug {string} Slug of post to load
 */
view.loadBlogPost = function( slug ) {

    let post = model.getPost( slug );
    const titleEl = helpers.getPageTitleEl(),
          contentEl = helpers.getPageContentEl();

    titleEl.innerHTML = post.title;
    contentEl.innerHTML = post.content;

};

/**
 * Loads a dropdown with sort options
 *
 */
view.loadSortSelect = function () {

    let possibleSettings = model.generatePossibleSortSettings(),
        optionsMarkup = document.createDocumentFragment(),
        selectEl = document.createElement( 'select' );

    const sidebarEl = helpers.getSidebarEl();

    for ( var i = 0, max = possibleSettings.length; i < max; i++ ) {
        
        optionsMarkup.appendChild( view.createOptionsMarkup( possibleSettings[ i ] ) );

    }
    selectEl.setAttribute( 'id', 'sortOptions' );
    selectEl.appendChild( optionsMarkup );

    sidebarEl.appendChild( selectEl );
}

/**
 * Creates markup for the sort order dropdown options
 *
 * @param setting {object} sortSetting possibility
 * @return optionEl {object} Option element to be added to sort order dropdown
 */
view.createOptionsMarkup = function( setting ) {

    let optionEl = document.createElement( 'option' ),
        sortOption = setting.sortOption,
        sortDirection = setting.sortDirection,
        settingLabel = document.createTextNode( sortOption.charAt(0).toUpperCase() + sortOption.substr(1) + ' - ' + sortDirection.charAt(0).toUpperCase() + sortDirection.substr(1) );

    optionEl.setAttribute( 'data-sort-option', sortOption );
    optionEl.setAttribute( 'data-sort-direction', sortDirection );

    optionEl.appendChild( settingLabel );

    return optionEl;

};

/**
 * Creates Markup for Blog Posts
 *
 * @param post {object} Post to create markup for
 * @return articleEl {object} Final post markup
 */
view.createPostMarkup = function( post ) {

    let articleEl = document.createElement( 'article' ),
        titleEl = document.createElement( 'h3' ),
        titleLink = document.createElement( 'a' ),
        titleText = document.createTextNode( post.title ),
        contentEl = document.createElement( 'div' );

    titleLink.appendChild( titleText );
    titleLink.href = '#' + post.slug;
    titleEl.appendChild( titleLink );

    contentEl.innerHTML = post.content;

    articleEl.appendChild( titleEl );
    articleEl.appendChild( contentEl );

    return articleEl;

};

/**
 * Clears title and main content from page
 *
 */
view.clearContent = function() {

    let titleEl = helpers.getPageTitleEl(),
        contentEl = helpers.getPageContentEl(),
        sortSelectEl = helpers.getSortSelectEl();

    titleEl.innerHTML = '';
    contentEl.innerHTML = '';

    if ( sortSelectEl ) {

        if ( sortSelectEl.style.display != 'none' ) {

            sortSelectEl.style.display = 'none';

        }

    }

};