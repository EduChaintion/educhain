import Express from 'express';
import path from 'path';
const app = Express();
const port = 3000;

app.use(Express.static(path.join(process.cwd(), 'static')));

app.get('/', (req, res) => {
    res.sendFile('html/index.html', { root: path.join(process.cwd(), '') });
})

app.listen(port, () => {
    console.log(`web3 app listening at http://localhost:${port}`)
})