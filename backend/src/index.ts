import { Hono } from 'hono'
import user from './routes/userRoute';
import blog from './routes/blogRoute';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors());

app.route('/api/v1/user', user);
app.route('/api/v1/blog', blog);

app.use(async (c)=>{
  c.status(404);
  return c.text("This is 404");
})

export default app
