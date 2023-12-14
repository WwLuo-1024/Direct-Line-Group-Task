/**
 * @description service of address
 * @author Luo Wang
 */

const { Address } = require('../db/model/index')
const { formatAddress } = require('./_format')

async function createAddress({ title,
    description,
    latitude,
    longitude,
    markerColor }) {
    const result = await Address.create({
        title,
        description,
        latitude,
        longitude,
        markerColor
    })
    return result.dataValues
}

/**
 * Obtain all the address data
 * 
 */
async function getAddressList() {
    const result = await Address.findAndCountAll()

    //format data
    let addressList = result.rows.map(row => row.dataValues) //1.map此时是简写不需要return
    addressList = formatAddress(addressList)

    return {
        count: result.count,
        addressList
    }
}

/**
 * Delete address
 * @param {number} id 
 */
async function deleteAddress(id) {
    const result = await Address.destroy({
        where: {
            id
        }
    })

    return result > 0
}

/**
 * Update address
 * @param {Object} param0 Content  * {title, description, latitude, longitude, markerColor }
 */
async function updateAddress(
    { id, title, description, latitude, longitude, markerColor}
){
    //contents
    const updateData = {}
    if (title) {
        updateData.title = title
    }
    if (description) {
        updateData.description = description
    }
    if (latitude) {
        updateData.latitude = latitude
    }
    if (longitude) {
        updateData.longitude = longitude
    }
    if (markerColor) {
        updateData.markerColor = markerColor
    }
    //query conditions
    const whereData = {
        id
    }
    //excute
    const result = await Address.update(updateData, {
        where: whereData
    })

    return result[0] > 0 
}

module.exports = {
    createAddress,
    getAddressList,
    deleteAddress,
    updateAddress
}