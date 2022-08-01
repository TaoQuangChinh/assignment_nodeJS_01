const fs = require('fs');
const url = require('url');
var body = [];

const handleRequestListener = (req,res)=>{
    const urlParse = url.parse(req.url,true);
    const paths = req.url === '/' ? './html/app.html' : `./html${urlParse.pathname}`;
    res.setHeader('Conten-type','form');

    fs.readFile(paths,(err,data)=>{
        if(err) handleEventError(res);
        res.write(data);
        handleWriteFile(req);
        return res.end();
    });
}

const handleWriteFile = req =>{
    if(req.url === '/create-user.html' && req.method === 'POST'){
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('data_register.txt',`${message}`,(err)=>{
                if(err) handleEventError(res);
            });
            body = [];
        });
    }
};

const handleEventError = res => {
    res.writeHead(404,{'Location':'/'});
    res.write('404 Not Found');
    return res.end();
}

module.exports = handleRequestListener;