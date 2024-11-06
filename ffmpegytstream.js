const ffmpeg = require('fluent-ffmpeg');

/**
        '-f', 'gdigrab',
        '-framerate', '30',
        '-video_size', '1920x1080',
        '-i', 'desktop',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-f', 'flv', 
 */

const streamKey = 'xxxx-xxxx-xxxx-xxxx-xxxx';
const input = 'testv.mp4';

ffmpeg(input)
  .inputOptions('-re')
  .videoCodec('libx264')
  .videoBitrate('5000k') 
  .addOption('-preset', 'medium') 
  .addOption('-maxrate', '5000k') 
  .addOption('-bufsize', '10000k') 
  .addOption('-pix_fmt', 'yuv420p')
  .addOption('-g', '50')
  .addOption('-profile:v', 'high') 
  .audioCodec('aac')
  .audioBitrate('192k')
  .audioFrequency(44100)
  .format('flv')
  .output(`rtmp://a.rtmp.youtube.com/live2/${streamKey}`)
  .on('start', (commandLine) => {
    console.log('FFmpeg command: ' + commandLine);
  })
  .on('stderr', (stderrLine) => {
    console.error('stderr output: ' + stderrLine);
  })
  .on('end', () => {
    console.log('Streaming finished');
  })
  .on('error', (err) => {
    console.error('Error: ' + err.message);
  })
  .run();
