import { isInCache, getProcessedImage} from "../../utils/fileUtil";
import path = require("path");

it ('isInCache (fjord, 500, 500) should be true', async () => {
    const result = await isInCache('fjord', 500, 500);
    expect(result).toBeTrue;
});

it ('getProcessedImage (fjord, 500, 500) should return Absolute path', async () => {
    const result = await getProcessedImage('fjord', 500, 500);    
    expect(path.isAbsolute(result)).toBeTrue;
});

