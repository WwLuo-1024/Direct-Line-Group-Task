/**
 * @description Error Info Set, including errno and message
 * @author Luo Wang
 */

module.exports = {
    // Failed to save address data
    createAddressFailInfo: {
        errno: 11001,
        message: 'Save address data error, please try again'
    },
    // Failed to delete address data
    deleteAddressFailInfo: {
        errno: 11002,
        message: 'Delete address data error, please try again'
    },
    updateAddressFailInfo: {
        errno: 11003,
        message: 'Update address data error, please try again'
    }
}