/**
 * @description address data model
 * @author Luo Wang
 */

const seq = require('../seq')
const { STRING } = require('../types')

const Address = seq.define('address', {
    title: {
        type: STRING,
        comment: 'title'
    },
    description: {
        type: STRING,
        comment: 'description'
    },
    latitude: {
        type: STRING,
        comment: 'latitude'
    },
    longitude: {
        type: STRING,
        comment: 'longitude'
    },
    markerColor: {
        type: STRING,
        comment: 'markerColor'
    }
})

module.exports = Address