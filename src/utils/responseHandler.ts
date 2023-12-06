import { Context } from "koa";

export function sendSuccess(ctx: Context, data: any){
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: data,
        error: null
    }
}

export function sendError(ctx: Context, message: string, statusCode: number = 500){
    ctx.status = statusCode;
    ctx.body = {
        success: false,
        data: null,
        error: {
            message: message
        }
    }
}