const fs = require('fs');

const handleRequestListener = (req,res)=>{
    const url = req.url;
    const method = req.method;
    const body = [];

    if(url === '/'){
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Welcome my page!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Register</button></form>');
        res.write('<h2>Action</h2>');
        res.write('<form action="/users" method="POST"><button type="submit">List User</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }else if(method === 'POST'){
        if(url === '/users'){
            res.write('<html>');
            res.write('<body>');
            res.write('<ul><li>Tao Quang Chinh</li></ul>');
            res.write('<ul><li>Doan Van Manh</li></ul>');
            res.write('<ul><li>Nguyen Dang Vinh</li></ul>');
            res.write('<ul><li>Luu Quang Luan</li></ul>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        }else{
            req.on('data',(chunk)=>{
                body.push(chunk);
            });
            req.on('end',()=>{
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.writeFile('data.txt',message,(err)=>{
                    res.statusCode = 200;
                    res.setHeader('Location','/');
                    res.write('Done!!!');
                    return res.end();
                });
            });
        }
    }
}

module.exports = handleRequestListener;