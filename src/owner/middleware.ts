import { Context } from "umi-request";

export const middleware: any = async (ctx: Context, next: any) => {
    await next();
    const { code } = ctx.res;
    if (code === -888)
        window.location.href = '/user/login';
    if (code === -999) {
        ctx.res.statusText = "没有权限进行此操作";
        throw ctx.res;
    }
    if (code == -1)
        throw ctx.res;
}

export const requestInterceptor: any = async (url: any, options: any) => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: token,
    };
    return {
        url: url,
        options: { ...options, headers: headers },
    };
};