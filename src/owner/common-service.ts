import { request } from "@umijs/max";
import { PROJECT_API_NAME } from "../../config/defaultSettings";

export async function getList(module: string, params: any) {
    return request(`/v1/api/${module}`, { params: { ...params, dataFlag: 1 } });
}

export async function findOne(module: string, { id, ...params }: any) {
    return request(`/v1/api/${module}/${id}`, {
        method: "GET",
        params
    });
}

export async function findList(module: string, params: any) {
    return request(`/v1/api/${module}/list`, {
        method: "GET",
        params
    });
}

export async function save(module: string, params: any) {
    return request(`/v1/api/${module}`, {
        method: "post",
        data: {
            ...params,
        }
    });
}

export async function update(module: string, params: any) {
    return request(`/v1/api/${module}`, {
        method: "put",
        data: {
            ...params,
        }
    });
}

export async function del(module: string, ids: any) {
    return request(`/v1/api/${module}`, {
        method: "delete",
        data: ids
    });
}

export async function delById(module: string, id: string | number) {
    return request(`/v1/api/${module}/${id}`, { method: "delete" });
}

export async function importExcel(module: string, params: any, baseURL = "") {
    const formData = new FormData();
    formData.append('file', params);
    return request(`${baseURL}/v1/api/${module}/excel/import`, {
        data: formData,
        method: 'POST',
        headers: {
            'Content-Type': "multipart/form-data",
        },
    });
}

export async function posttemplate(module: string, params: any, baseURL = "") {
    return request(`${baseURL}/v1/api/${module}/excel/template`, {
        method: "post",
        data: {
            ...params,
        }
    });
}


export async function exportExcel(module: string, params: any, baseURL = "") {
    return request(`${baseURL}/v1/api/${module}/excel/export`, {
        method: "post",
        data: {
            ...params,
        }
    });
}
