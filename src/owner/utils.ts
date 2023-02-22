import { parse } from 'querystring';
import { customAlphabet } from 'nanoid';
import moment from 'moment';
import { request } from '@umijs/max';
import { message } from 'antd';
declare let API: any;

export function download(stream: any, fileName: any) {
    const blob = new Blob([stream])
    if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}


export function valueEnumList(code: any) {
    let brDataType = {};
    for (const item of code) {
        brDataType[item.value] = { text: item.label, status: '' };
    }
    return brDataType;
}

export const getPageQuery = () => {
    const { href } = window.location;
    const qsIndex = href.indexOf('?');
    const sharpIndex = href.indexOf('#');

    if (qsIndex !== -1) {
        if (qsIndex > sharpIndex) {
            return parse(href.split('?')[1]);
        }

        return parse(href.slice(qsIndex + 1, sharpIndex));
    }

    return {};
};



export const toMoneyUpper = (n) => {
    let fraction = ['角', '分'];
    let digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}


export const generateNo = () => {
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, 3);
    return `${moment().format("YYMMDDHHmmssSS")}${nanoid()}`
}


export async function down(url: string, params: any) {
    const res = await request(url, {
        params: {
            ...params,
            current: undefined,
            pageNo: params.current
        },
        responseType: "blob"
    });
    if (res.type == 'application/json') {

        const fileReader = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(res, 'utf-8');
            reader.onload = () => {
                const r = JSON.parse(reader?.result);
                resolve(r)
            };

        })
        const msg = await fileReader;
        throw msg;
    } else {
        return res;
    }
}



// /判断浏览器/
export const browser = () => {
    const agent = window.navigator.userAgent.toLowerCase();
    const edge = /(edg)\/(\d+)/g.exec(agent);
    const chrome = /(chrome)\/(\d+)/g.exec(agent);
    const safari = /(safari)\/(\d+)/g.exec(agent);
    const firefox = /(firefox)\/(\d+)/g.exec(agent);

    if ((window.ActiveXObject || "ActiveXObject" in window)) {
        return document.write("浏览器太旧不支持访问，请使用最新版的edge,chrome,safari 等主流浏览器")
    }
    if (edge?.[1] === "edge" && edge?.[2] < 100) {
        return document.write("浏览器太旧不支持访问，请使用最新版的edge,chrome,safari 等主流浏览器")
    }
    if (chrome?.[1] === "chrome" && chrome?.[2] < 100) {
        return document.write("浏览器太旧不支持访问，请使用最新版的chrome,chrome,safari 等主流浏览器")
    }
    if (firefox?.[1] === "firefox" && firefox?.[2] < 100) {
        return document.write("浏览器太旧不支持访问，请使用最新版的chrome,chrome,safari 等主流浏览器")
    }
}