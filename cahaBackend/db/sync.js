/**
 * @description sequelize sync database
 * @author Luo Wang
 */
const seq = require('./seq')

require('./model/index')

//Connection Testing
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

//Sync Execution
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})