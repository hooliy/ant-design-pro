import { request } from '@umijs/max';
declare let API: any;

export async function getSysCode(parentid: string) {
    return request(`/admin-api/syscodeController/getCode.do`, {
        params: { parentid: parentid },
        method: 'get'
    })
}

export async function updatePassword(oldpw, newpw) {
    return request(`/admin-api/index/updatePassword.do`, {
        method: 'POST',
        data: {
            password: oldpw,
            newPwd: newpw
        },
    });
}


export async function uploadXhr(param: any) {
    const token = localStorage.getItem('token');
    const serverURL = `/admin-api/upload/uploadImg`;
    const xhr = new XMLHttpRequest;
    const fd = new FormData()

    const successFn = (response) => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        const { value: data } = JSON.parse(xhr.responseText);
        param.success({
            url: `https://img.qiyedajie.com` +  data.data.link,
            // meta: {
            //     id: 'xxx',
            //     title: 'xxx',
            //     alt: 'xxx',
            //     loop: true, // 指定音视频是否循环播放
            //     autoPlay: true, // 指定音视频是否自动播放
            //     controls: true, // 指定音视频是否显示控制栏
            //     poster: 'http://xxx/xx.png', // 指定视频播放器的封面
            // }
        })
    }

    const progressFn = (event) => {
        // 上传进度发生变化时调用param.progress
        param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
        // 上传发生错误时调用param.error
        param.error({
            msg: 'unable to upload.'
        })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.setRequestHeader('Authorization', token);
    xhr.send(fd)
}

/**
 * 
 * @param params file
 * @param brDataType 资料类型 码表
 * @param brDataId 企业 id
 */
export async function upload(params: any, brDataType?: any, brDataId?: any) {
    let data = new FormData();
    data.append("file", params);
    data.append("brDataType", brDataType);
    // brDataId && data.append("brDataId", brDataId);

    const res = await request(`/admin-api/upload/uploadImg`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data;'
        },
        data: data,
    });
    // const { value } = res;
    // params.success({
    //     url: value.data.link,
    //     // meta: {
    //     //     id: 'xxx',
    //     //     title: 'xxx',
    //     //     alt: 'xxx',
    //     //     loop: true, // 指定音视频是否循环播放
    //     //     autoPlay: true, // 指定音视频是否自动播放
    //     //     controls: true, // 指定音视频是否显示控制栏
    //     //     poster: 'http://xxx/xx.png', // 指定视频播放器的封面
    //     // }
    // })
    return res;
}

export async function routers() {
    return request(`/admin-api/index/getInfo.do`, {});
}

export async function queryCurrent() {
    const token = localStorage.getItem('token');
    const { value } = await routers();
    console.log(value)
    const user = {
        Authorization: token,
        ...value.userInfo,
        access: value.uids.filter(i => i)
    };
    console.log(23455)
    return new Promise((resolve, reject) => {
        resolve(user);
    });
}
export async function outLogin() {
    return request(`/admin-api/api/login/outLogin`,{
        method: 'get',
    });
}
export async function fakeAccountLogin(params: any) {
    return request(`/admin-api/login/login.do`, {
        method: 'get',
        params: params,
    });
}