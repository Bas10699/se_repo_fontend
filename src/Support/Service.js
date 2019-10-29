// export const ip = "http://192.168.1.30:3003/api/v1/"//หอ
// export const ip = "http://192.168.1.9:3003/api/v1/"
// export const ip = "http://192.168.43.74:3003/api/v1/"
// export const ip = "http://127.0.0.1:3003/api/v1/"
// export const ip = "http://103.253.72.69:3043/api/v1/" //พี่ต้น
export const ip = "http://192.168.1.7:3003/api/v1/"//สนง
// export const ip = "http://10.94.4.28:3003/api/v1/"

export const get = (path,token) => new Promise((resolve,reject) => {
    fetch (ip + path, {
        method : 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        resolve(json);
    }).catch((err) => reject(err))
})

export const post = (object,path,token) => new Promise((resolve,reject) => {
    fetch (ip + path, {
        method : 'POST',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        resolve(json);
    }).catch((err) => reject(err))
})
