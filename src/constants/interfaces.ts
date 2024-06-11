import { Request, Response } from "express";
export interface IRequest extends Request {
    user: any,
    file: any
}

export interface IResponse extends Response {

}
