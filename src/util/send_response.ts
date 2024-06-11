import {IResponse} from "../constants/interfaces";

export const sendResponse = (res: IResponse, statusCode: number, body: any) => {
    let tempBody = null;
    if (statusCode == 200 || statusCode == 201) {
        tempBody = {
            success: 0,
            statusCode: statusCode,
            message: null,
            results: body,
            errors: [],
        };
    } else {
        tempBody = {
            success: 0,
            statusCode: statusCode,
            message: null,
            results: [],
            errors: body,
        };
    }
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    });
    return res.status(statusCode).send(tempBody);
};
