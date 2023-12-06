import Koa, {Context, Next} from 'koa';
import bodyParser from 'koa-bodyparser';
import routes from './routes/routes';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());

app.use(async (ctx: Context, next: Next) =>{
    if(ctx.path === '/' && ctx.method === "GET"){
        ctx.body = `Hi from Koa api`;
    }else{
        await next();
    }
});

app.use(routes.routes());

app.listen(PORT, ()=>{
    console.log(`Koa api is running on port: ${PORT}`);
});