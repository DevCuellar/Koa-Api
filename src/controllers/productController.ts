import { Context } from "koa";
import productService from "../services/productService";
import { sendError, sendSuccess } from "../utils/responseHandler";
import { Product } from "models/product";

class ProductController{

    async getAllProducts(ctx: Context){
        try{
            const products = await productService.getAllProducts();
            sendSuccess(ctx, products);
        }catch(error: any){
            sendError(ctx, error.message, 500);
        }
    }

    async getProductById(ctx: Context){
        try{
            const id = Number(ctx.params.id);
            const product = await productService.getProductById(id);
            if(product){
                sendSuccess(ctx, product);
            }else{
                sendError(ctx,`Product not found`, 404);
            }
        }catch(error: any){
            sendError(ctx, error.message, 500);
        }
    }

    async postProduct(ctx: Context){
        try{
            const data = ctx.request.body as Product;
            const product = await productService.postProduct(data);
            if(product){
                sendSuccess(ctx, product);
            }else{
                sendError(ctx,`Product not created`, 500);
            }
        }catch(error: any){
            sendError(ctx, error.message, 500);
        }
    }

    async putProduct(ctx: Context){
        try{
            const data = ctx.request.body as Product;
            const id = Number(ctx.params.id);
            const product = await productService.putProduct(data, id);
            if(product){
                sendSuccess(ctx, product);
            }else{
                sendError(ctx,`Product not found`, 404);
            }
        }catch(error: any){
            sendError(ctx, error.message, 500);
        }
    }

    async deleteProduct(ctx: Context){
        try{
            const id = Number(ctx.params.id);
            const deleted = await productService.deleteProduct(id);
            if(deleted){
                sendSuccess(ctx, {});
            }else{
                sendError(ctx,`Product not found`, 404);
            }
        }catch(error: any){
            sendError(ctx, error.message, 500);
        }
    }

}

export default new ProductController();