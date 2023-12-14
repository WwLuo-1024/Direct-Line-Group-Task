/**
 * @description Time-Dependent Tool Functions
 * @author Luo Wang
 */

const { format } = require('date-fns')

/**
 * format date and time, e.g. 09.05 23:02
 * @param {string} str 
 * @returns 
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat
}