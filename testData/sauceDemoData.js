export const users = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    invalidUser: {
        username: 'invalid_user',
        password: 'wrong_password'
    }
};

export const expectedValues = {
    baseUrl: 'https://www.saucedemo.com',
    inventoryUrl: 'https://www.saucedemo.com/inventory.html',
    pageTitle: 'Products',
    errorInvalidCredentials: 'Username and password do not match any user in this service',
    errorLockedUser: 'Sorry, this user has been locked out.',
    errorEmptyUsername: 'Username is required',
    errorEmptyPassword: 'Password is required'
};
