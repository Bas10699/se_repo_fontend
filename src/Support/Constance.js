
export const user_token = localStorage.getItem('user_token')

var jwt_decode = require('jwt-decode');

const decode_token = (user_token_decoded_func) => {
    let decoded
    if (user_token_decoded_func) {
        decoded = jwt_decode(user_token_decoded_func);
    } else {
        decoded = { id: null, type: null }
    }
    return decoded;
}

export const user_token_decoded = decode_token(user_token)

export const addComma = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export const sortData = (data, property, proviso) => {
    
    if (proviso === true) {
        function compare(a, b) {
            const data_idA = a[property]
            const data_idB = b[property]

            let comparison = 0;
            if (data_idA < data_idB) {
                comparison = 1;
            } else if (data_idA > data_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_data = data.sort(compare)
        return sort_data
    }
    else {
        function compare(a, b) {
            const data_idA = a[property]
            const data_idB = b[property]

            let comparison = 0;
            if (data_idA > data_idB) {
                comparison = 1;
            } else if (data_idA < data_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_data = data.sort(compare)
        return sort_data
    }

}