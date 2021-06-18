enum ResponseStatus {
    ok
}

export interface ResponseMeta {
    count: number;
    total: number;
}

export interface BaseResponse {
    status: ResponseStatus;
    meta: ResponseMeta;
}
