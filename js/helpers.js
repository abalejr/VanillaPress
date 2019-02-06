/**
 * Main helper object
 *
 */
const helpers = {};

/**
 * Get the Title element of the current page
 *
 * @return pageTitleEl {object} The element with id pageTitle
 */
helpers.getPageTitleEl = function() {

    return document.getElementById( 'pageTitle' );

};

/**
 * Get the main content element of the current page
 *
 * @return pageContentEl {object} The element with id pageContent
 */
helpers.getPageContentEl = function() {

    return document.getElementById( 'pageContent' );

};

/**
 * Get the sidebar element of the current page
 *
 * @return sidebarEl {object} The element with id pageContent
 */
helpers.getSidebarEl = function() {

    return document.getElementsByClassName( 'sidebar' )[0];

};

/**
 * Get the main content element of the current page
 *
 * @return sortOptionsEl {object} The select element with id sortOptions
 */
helpers.getSortSelectEl = function() {

    return document.getElementById( 'sortOptions' );

};

/**
 * Get the main content element of the current page
 *
 * @return sortOptionsEl {object} The select element with id sortOptions
 */
helpers.getNavListEl = function() {

    return document.querySelector( '#mainNav ul' );

};