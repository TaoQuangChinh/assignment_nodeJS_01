const fs = require('fs');

const handleRequestListener = (req,res)=>{
    const body = [];
    res.setHeader('Conten-type','form');
    res.write('<html>');
    res.write('<body>');

    switch(req.url){
        case '/': 
            res.write('<h1>Welcome my page!</h1>');
            res.write('<form action="/create-user" method="POST"><button type="submit">Register</button></form>');
            res.write('<form action="/users" method="POST"><button type="submit">List User</button></form>');
            break;
        case '/users':
            res.write('<ul><li>Tao Quang Chinh</li></ul>');
            res.write('<ul><li>Doan Van Manh</li></ul>');
            res.write('<ul><li>Nguyen Dang Vinh</li></ul>');
            res.write('<ul><li>Luu Quang Luan</li></ul>');
            break;
        case '/create-user':
            res.write('<form action="/create-user" method="POST">');
            res.write('<input type="text" name="message">');
            res.write('<button type="submit">Register</button>');
            res.write('</form>');
            if(req.method === 'POST'){
                req.on('data',(chunk)=>{
                    body.push(chunk);
                });
                req.on('end',()=>{
                    const parsedBody = Buffer.concat(body).toString();
                    const message = parsedBody.split('=')[1];
                    fs.writeFileSync('data_register.txt',`${message}`);
                });
            }
            break;
    }
    res.write('</body>');
    res.write('</html>');
    return res.end();
}

module.exports = handleRequestListener;