class NotFoundError extends Error {
    constructor(obj) {
        super();
        this.status = 404;
        this.message = `${obj} not found`;
    }
}

class InputError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class DuplicateError extends Error {
    constructor(obj) {
        super();
        this.status = 409;
        this.message = `The ${obj} already exists.`;
    }
}

module.exports = {
    NotFoundError,
    InputError,
    DuplicateError,
};
