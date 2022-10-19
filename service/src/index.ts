import Express from 'express';

const PORT = 5000;

const app = Express();

app.get('/', (req, res) => {
    res.send("HELLO WORLD N SHIT");
})

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});