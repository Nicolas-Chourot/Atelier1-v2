// Mon premier server Http
const http = require('http');
const queryString = require('query-string');
const server = http.createServer((req, res) => {
    console.log(req.url);
    let reqInfo = { url: req.url, method: req.method, contentType: req.headers['content-type'] };
    res.writeHead(200, { "Content-Type": "application/json" });
    if (req.method == 'GET') {
        let strignifyJSONObj = JSON.stringify(reqInfo); // contenu de bosy est souvent référé avec payload
        res.end(strignifyJSONObj);
    } else {
        if (req.method == 'POST') {
            let body = [];
            req.on('data', chunk => {
                body.push(chunk);
            }).on('end', () => {
                try {
                    if (req.headers['content-type'] === "application/json")
                        reqInfo.body = JSON.parse(body);
                    else
                        if (req.headers['content-type'] === "application/x-www-form-urlencoded")
                            reqInfo.body = queryString.parse(body.toString());
                        else
                            reqInfo.body = body.toString();
                    res.end(JSON.stringify(reqInfo));
                } catch (error) {
                    console.log(error);
                }
            });
        }
    }

});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

