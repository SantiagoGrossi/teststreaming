const fs = require('fs');


const requestHandler = (req,res) =>{

    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head></html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');  
        res.write('</html>');
        return res.end();
    }
    if(url ==='/message' && method === 'POST'){
        const body = [];
    
        req.on('data', (chunk) =>{
            body.push(chunk);
        });
         return req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, error =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
        res.write('<html>');
        res.write('<head><title>My first page node </title></html>');
        res.write('<body><h2>My first page node</h2></body>');
        res.write('</html>');
        return res.end();

};

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};