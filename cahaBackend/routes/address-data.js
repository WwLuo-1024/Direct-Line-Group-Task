/**
 * @description address data router
 * @author Luo Wang
 */

const router = require('koa-router')()
const { create, loadAddressDataList, deleteCurAddress, changeCurAddress } = require('../controller/address-data')

router.prefix('/api/address')

//Save Address
router.post('/create', async (ctx, next) => {
    const { title, description, latitude, longitude, markerColor } = ctx.request.body
    
    //controller
    ctx.body = await create({ title,
                description,
                latitude,
                longitude,
                markerColor })
})

//Get address data
router.get('/load', async (ctx, next) => {
    const result = await loadAddressDataList()
    ctx.body = result
})

//Delete address data
router.post('/delete', async (ctx, next) => {
    const { id } = ctx.request.query
    //invoke controller
    ctx.body = await deleteCurAddress(id)
 
})

//update address Info
router.patch('/update', async (ctx, next) => {
    const { id, title, description, latitude, longitude, markerColor } = ctx.request.body
    //controller
    ctx.body = await changeCurAddress({ 
        id, 
        title,
        description,
        latitude,
        longitude,
        markerColor })
})

module.exports = router