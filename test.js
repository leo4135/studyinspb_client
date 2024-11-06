import url from 'url'
import http from 'http'
import { PNG } from 'pngjs'

const port = 9999;

http.createServer( async (req, res) => {
    if (req.url === '/login') {
        res.end('leo4135')
    } else if (req.url.split('?').find(i => '/makeimage')) {
        const parsedUrl = url.parse(req.url, true);
        const width = parseInt(parsedUrl.query.width, 10), height = parseInt(parsedUrl.query.height, 10);
        const imageArray = new Uint8ClampedArray(parsedUrl.query.width * parsedUrl.query.height * 4);
        for(let i = 0; i < imageArray.length; i++) {
            imageArray[i] = Math.floor(Math.random() * 254);
        }
        const img = await generatePNGref(imageArray, width, height);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img)
    }
}).listen(port, () => {
    console.log('Сервер успешно запущен');
})


function generatePNGref(array, width, height) {
    return new Promise((resolve, reject) => {
        let imagePng = new PNG( { width, height } );
        imagePng.data.set(array);
        const chunks = [];
        imagePng.pack()
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))

    })
}