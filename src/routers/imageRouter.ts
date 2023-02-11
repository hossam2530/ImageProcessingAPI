import express from 'express';
import { resize, va1lidate} from '../processor/imageProccessor';
import {isInCache} from '../utils/fileUtil';
import path from 'path';

const processedImgRootPath = './processed images/';
const imgRouter = express.Router();

imgRouter.get(
  '/img',
  async (req: express.Request, res: express.Response): Promise<void> => {
    let imgWidth: number;
    let imgHight: number;
    let imgName: string;
    try {
      if (Object.keys(req.query).length !== 0) {
        imgName = req.query.imgName as unknown as string;
        imgWidth = parseInt(req.query.imgWidth as unknown as string);
        imgHight = parseInt(req.query.imgHight as unknown as string);

        const errMsg = await va1lidate(imgName, imgWidth, imgHight);

        if (errMsg.length > 0) {
          // send the error details to the client
          res.send(errMsg);
        } else {
          // here we should have valid request for an exist image in the server
          // console.log(
          //   `valid request for an exist image ${imgName} in the server`
          // );

          // we first check image in cashe we use the cashed image
          if (!(await isInCache(imgName, imgWidth, imgHight))) {
            // console.log('image not in cache --> start resize');
            await resize(imgName, imgWidth, imgHight);
          }

          // send the processed image to the client
          res
            .setHeader('Content-Type', 'image/jpeg')
            .sendFile(
              path.resolve(
                `${processedImgRootPath}${imgName}_thump_${imgWidth}_${imgHight}.jpg`
              )
            );
        }
      } else {
        res.send(`<div>
        <h2>Bad request </h2>
        <h3>you forget to pass the required (3) params<h3> 
        go to <a href="http://localhost:1983">home</a> for more details
    </div>`);
      }
    } catch (e) {
      // console.log('Error in the system');
      res.statusMessage = `Internal Server Error during processing of the image`;
      res.sendStatus(500);
    }
  }
);

export default imgRouter;
