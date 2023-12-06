import { Product } from '../models/product';
import db from '../database/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

class ProductService{

    async getAllProducts(): Promise<Product[]>{
        const products = await db.query<RowDataPacket[]>(`SELECT * FROM Products`);
        return products as Product[];
    }

    async getProductById(id: number): Promise<Product | null>{
        const products = await db.query<RowDataPacket[]>(`SELECT * FROM Products WHERE id = ?`, id);
        if(products.length > 0){
            return products[0] as Product;
        }
        return null;
    }

    async postProduct(product: Product): Promise<Product | null>{
        const result = await db.query<ResultSetHeader>(`INSERT INTO Products SET ?`, product);
        if(result.insertId){
            return await this.getProductById(result.insertId);
        }
        return null;
    }

    async putProduct(product: Product, id: number): Promise<Product | null>{
        const result = await db.query<ResultSetHeader>(`UPDATE Products SET ? WHERE id = ?`, [product, id]);
        if(result.affectedRows){
            return await this.getProductById(id);
        }
        return null;
    }

    async deleteProduct(id: number): Promise<boolean>{
        const result = await db.query<ResultSetHeader>(`DELETE FROM Products WHERE id = ?`, id);
        return result.affectedRows > 0;
    }

}

export default new ProductService();