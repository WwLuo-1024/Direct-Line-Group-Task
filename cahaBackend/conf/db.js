/**
 * @description Store Configuration
 * @author Luo Wang
 */

const isProd = false

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'caha_address_db'
}

if (isProd) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'caha_address_db'
    }
}



module.exports = {
    MYSQL_CONF
}