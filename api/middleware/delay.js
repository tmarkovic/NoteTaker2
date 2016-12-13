'use strict';

var settings = require('../config.json');

/**
 * middleware to add a delay to requests, giving the students a change
 * to display a loading icon on the page.
 *
 * @param  {Object}   req  request
 * @param  {Object}   res  response
 * @param  {Function} next next action
 */
module.exports = function (req, res, next) {
    var delay = Math.floor(Math.random() * settings.delay);

    console.log('Delaying ' + delay + ' milliseconds.')

    setTimeout(next, delay);
}
