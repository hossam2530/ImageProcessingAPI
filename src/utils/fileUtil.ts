import path from 'path';
import fs from 'fs';

const processedImgRootPath = './processed images/';

const isFileExist = async (filePath: string): Promise<boolean> => {
    //console.log('isFileExist: ' + path.resolve(filePath));
    if (fs.existsSync(filePath)) {
      return true;
    }
    return false;
  };

  const isInCache = async (
    imgName: string,
    imgWidth: number,
    imgHight: number
  ): Promise<boolean> => {
    return await isFileExist(
      `${processedImgRootPath}${imgName}_thump_${imgWidth}_${imgHight}.jpg`
    );
  };

  const getProcessedImage = async (imgName:string, imgWidth:number, imgHight:number):Promise<string>=>{
    return path.resolve(
        `${processedImgRootPath}${imgName}_thump_${imgWidth}_${imgHight}.jpg`
      );
  }

export {isFileExist, isInCache, getProcessedImage}