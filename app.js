const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes.handler);
Stream = require('node-rtsp-stream')
const express = require('express');
const { exec } = require('child_process');
const app = express();

// stream = new Stream({
//     name: 'name',
//     streamUrl: 'rtsp://admin:12sgrossi34@0.0.0.0:8554/estadiosietedos?video=all&audio=all',
//     wsPort: 9999,
//     ffmpegOptions: { // options ffmpeg flags
//       '-stats': '', // an option with no neccessary value uses a blank string
//       '-r': 30 // options with required values specify the value after the key
//     }
//   })
app.use(express.static('/testrtsp'));
app.use('/testrtsp', express.static('/testrtsp'));
app.get('/start-ffmpeg', (req, res) => {
  const ffmpegCommand = `ffmpeg -i "rtsp://admin:12publico34@elpinarfutbol.ddns.net:555/cam/realmonitor?channel=1&subtype=0" -c:v copy -c:a aac -f hls -hls_time 10 -hls_list_size 4 -hls_flags delete_segments -reset_timestamps 1 "/testrtsp/output.m3u8"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando FFmpeg: ${error.message}`);
            return res.status(500).send('Error ejecutando FFmpeg');
        }
        if (stderr) {
            console.error(`FFmpeg stderr: ${stderr}`);
        }
        console.log(`FFmpeg stdout: ${stdout}`);
        res.send('FFmpeg comando ejecutado');
    });
});

app.listen(3000);

console.log(routes.someText);
console.log("working on port: " + 3000)