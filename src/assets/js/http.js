import store from '@/store';
import axios from 'axios';

axios.defaults.isRetryRequest = false

let methods = {get: 'get', post: 'post', put: 'put', delete: 'delete', upload: 'upload'};


// get请求
export function get({url, params}) {
    return request({url, method: methods.get, params: paramFilter(params)});
}

// post请求
export function post({url, data, params}) {
    return request({url, method: methods.post, data, params});
}

// put
export function put({url, data, params}) {
    return request({url, method: methods.put, data, params});
}


// delete是个关键字所以用remove
export function remove({url, params}) {
    return request({url, method: methods.delete, params});
}

// post请求
export function upload({url, data, params}) {
    return request({url, method: methods.upload, data, params});
}

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        return Promise.reject(err)
    }
);

// 发起请求
function request({url, method, data, params}) {

    let headers = {
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'x-requested-with': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    };

    if (method == methods.upload) {
        headers['Content-type'] = 'multipart/form-data';
        method = methods.post;
    }

    if (store.state.debug) {
        console.log(`请求url: ${url}\n请求方式: ${method} \n请求数据: ${data}\n请求query参数: ${JSON.stringify(params||'')}`);
    }

    return new Promise((resolve, reject) => {

        axios.request({
            method: method,
            baseURL: store.state.domain,
            url: url,
            headers: headers,
            params: params,
            timeout: 60000,
            data: data
        }).then(result => {
            if (store.state.debug) {
                console.log('请求结果', result);
            }

            if (result.status === 200) {
                resolve(result.data);
            } else {
                console.error('request result error', result);
                reject('request result error', result);
            }
        }).catch(err => {
            reject(err);
        })
    });

}

//请求参数过滤undefined对象
export const paramFilter = (param) => {
    if (param == undefined || Object.keys(param).length === 0) {
        return {};
    }
    let newParam = {};
    for (let index in param) {
        let value = param[index];
        if (value !== undefined && value !== '' && value !== null) {
            newParam[index] = value;
        }
    }

    return newParam;
}