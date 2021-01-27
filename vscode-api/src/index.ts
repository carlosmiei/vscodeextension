import express from 'express';


const main = async () => {
    const app = express();
    app.get("/", (_,res) => {
        res.send("hello");
    })
    
    app.listen(3002, ()=> {
        console.log('listening 3002');
    })   
}

main();