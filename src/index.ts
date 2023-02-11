import express from 'express';
import imgRouter from './routers/imageRouter';

const Image_Processing_App = express();
const server_port = 1983;

Image_Processing_App.use('/api', imgRouter);

Image_Processing_App.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Image Processing API</h2>
    <h3>Usage</h3>
    <div>
        to use the system you have to use this end point: /api/img </br></br>
        also you have to pass 3 quary params in url</br>
        <ul>
            <li>imgName : image name without ext</li>
            <li>imgWidth : the resized image width, must be a number</li>
            <li>imgHight : the resized image hight, must be a number</li>        
        </ul>
    </div>

    <h3>Available Images</h3>
    </div>
        <ul>
            <li>encenadaport</li>
            <li>fjord</li>
            <li>icelandwaterfall</li>
            <li>palmtunnel</li>
            <li>santamonica</li>
        </ul>
    </div>
    <h3>call example</h3>
    <div><a href="http://localhost:1983/api/img?imgName=palmtunnel&imgWidth=400&imgHight=400">palmtunnel</a></div>
    `);
});

Image_Processing_App.listen(server_port, () => {
  // console.log(
  //   `Image Processing Application Server has been started at localhost:${server_port}`
  // );
});

export default Image_Processing_App;
