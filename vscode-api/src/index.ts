import express from 'express';
import {createConnection} from 'typeorm';
import {join} from "path";
import { __prod__ } from './constants';

const main = async () => {
    await createConnection({
        type: "postgres",
        database: "todo",
        entities: [join(__dirname, "./entities/*.*")],
        logging: !__prod__,
        synchronize: !__prod__
    })
    const app = express();
    app.get("/", (_,res) => {
        res.send("hello");
    })
    
    app.listen(3002, ()=> {
        console.log('listening 3002');
    })   
}

main();