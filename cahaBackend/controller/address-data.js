/**
 * @description address controller
 * @author Luo Wang
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const xss = require('xss')
const { createAddressFailInfo, deleteAddressFailInfo, updateAddressFailInfo } = require('../model/ErrorInfo')
const { createAddress, getAddressList, deleteAddress, updateAddress } = require('../services/address')

/**
 * Create address
 * @param {string} param0.title 
 * @param {string} param0.description 
 * @param {string} param0.latitude 
 * @param {string} param0.longitude
 * @param {string} param0.markerColor 
 */
async function create({ title,
    description,
    latitude,
    longitude,
    markerColor }) {
    //service
    try {
        const address = await createAddress({
            title,
            description: xss(description),
            latitude,
            longitude,
            markerColor
        })
        return new SuccessModel(address)
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(createAddressFailInfo)
    }
}

async function loadAddressDataList() {
    // service
    const result = await getAddressList()
    const { count, addressList } = result
    return new SuccessModel({count, addressList})
}

async function deleteCurAddress(id) {
    console.log('id', id)
    const result = await deleteAddress(id)
    if (result) {
        return new SuccessModel()
    }

    return new ErrorModel(deleteAddressFailInfo)
}

/**
 * Update address
 * @param {string} param0.title 
 * @param {string} param0.description 
 * @param {string} param0.latitude 
 * @param {string} param0.longitude
 * @param {string} param0.markerColor 
 */
async function changeCurAddress({ 
    id, 
    title,
    description,
    latitude,
    longitude,
    markerColor }) {
    const result = await updateAddress({ 
            id, 
            title,
            description,
            latitude,
            longitude,
            markerColor}
    )
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(updateAddressFailInfo)
}

module.exports = {
    create,
    loadAddressDataList,
    deleteCurAddress,
    changeCurAddress
}