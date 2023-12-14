/**
 * @description data model of result
 * @author Luo Wang
 */

/**
 * Base Model
 */
class BaseModel {
    constructor({errno, data, message}) {
        this.errno = errno
        if (data) {
            this.data = data
        }

        if (message) {
            this.message = message
        }
    }
}

/**
 * Success Model
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

/**
 * Error Model
 */
class ErrorModel extends BaseModel {
    constructor ({errno, message}) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel, 
    ErrorModel
}