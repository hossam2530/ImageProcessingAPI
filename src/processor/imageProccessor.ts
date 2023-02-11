// import {promises as fsPromises} from 'fs';
import {isFileExist} from '../utils/fileUtil';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

const imgRootPath = './images/';
const processedImgRootPath = './processed images/';

const resize = async (
  imgName: string,
  imgWidth: number,
  imgHight: number
): Promise<void> => {
  // console.log('in resize');
  // console.log(imgName);
  // console.log(path.resolve(imgRootPath + imgName + '.jpg'));
  // do resizing and save to processed images dir
  await sharp(imgRootPath + imgName + '.jpg')
    .resize(imgWidth, imgHight, {
      kernel: sharp.kernel.nearest,
      fit: 'contain',
      position: 'center',
    })
    .toFile(
      `${processedImgRootPath}${imgName}_thump_${imgWidth}_${imgHight}.jpg`
    )
    .then(() => {
      //console.log('done resizing');
    });
};


function checkExtension(imgName: string): boolean {
  return imgName.indexOf('.') > 0;
}

// check that all params are found and valid
const validateParams = async (
  imgName: string,
  imgWidth: number,
  imgHight: number
): Promise<boolean> => {
  if (
    Number.isNaN(imgWidth) ||
    Number.isNaN(imgHight) ||
    imgName === undefined
  ) {
    return false;
  }
  return true;
};

// used to check if imgName is exist in server
const validateImage = async (imgName: string): Promise<boolean> => {
  return await isFileExist(`${imgRootPath}${imgName}.jpg`);
};
// validate all request details and return the error msg if exist or empty string if valid
const va1lidate = async (
  imgName: string,
  imgWidth: number,
  imgHight: number
): Promise<string> => {
  let errMsg = '';
  if (!(await validateParams(imgName, imgWidth, imgHight))) {
    errMsg = `<div>
                    <h2>Bad request </h2>
                    <h3>you may forget a query parm <h3> 
                    go to <a href="http://localhost:1983">home</a> for more details
                </div>`;
  }

  if (await checkExtension(imgName)) {
    errMsg = `<div>
                    <h2>Bad request</h2>
                    <h3>ImgName should not contain extension<h3> 
                    go to <a href="http://localhost:1983">home</a> for more details
                </div>`;
  }

  if (!(await validateImage(imgName))) {
    errMsg = `<div>
                    <h2>Bad request</h2>
                    <h3>ImgName not found in our system<h3> 
                    go to <a href="http://localhost:1983">home</a> for more details
                </div>`;
  }

  return errMsg;
};

export { resize, va1lidate };
