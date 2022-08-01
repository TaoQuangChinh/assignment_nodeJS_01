const fs = require('fs');

const handleRequestListener = (req,res)=>{
    const body = [];
    res.setHeader('Conten-type','form');

    switch(req.url){
        case '/': 
            readFiles('./html/app.html',res);
            break;
        case '/users':
            readFiles('./html/list_user.html',res);
            break;
        case '/create-user':
            readFiles('./html/input_form.html',res);
            if(req.method === 'POST'){
                req.on('data',(chunk)=>{
                    body.push(chunk);
                });
                req.on('end',()=>{
                    const parsedBody = Buffer.concat(body).toString();
                    const message = parsedBody.split('=')[1];
                    fs.writeFile('data_register.txt',`${message}`,(err)=>{
                        if(err) throw err;
                    });
                });
            }
            break;
    }
}

const readFiles = (path,res) => fs.readFile(path,(err,data)=>{
    if(err) throw err;
    res.write(data);
    res.end();
});

module.exports = handleRequestListener;