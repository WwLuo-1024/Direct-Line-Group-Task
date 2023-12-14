const { timeFormat } = require('../utils/dt')

/**
 * format data
 * @param {Array|Object} list
 */
function formatAddress(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        //array
        return list.map(_formatDBTime)
    }
    //object
    return _formatUserPicture(list)
}

/**
 * format time
 * @param {Object} obj data
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

module.exports = {
    formatAddress
}