const jpeg2000 = require('raw-loader!./jpeg2000.js');
const jpegloss = require('raw-loader!./jpegloss.js');
const jpegbaseline = require('raw-loader!./jpegbaseline.js');
const rle = require('raw-loader!./rle.js');

const createUrlBlobScript = (strScript) => URL.createObjectURL(
    new Blob([strScript], {type: 'application/javascript'})
)

export const decoderScripts = {
    "jpeg2000": createUrlBlobScript(jpeg2000.default),
    "jpeg-lossless": createUrlBlobScript(jpegloss.default),
    "jpeg-baseline": createUrlBlobScript(jpegbaseline.default),
    "rle": createUrlBlobScript(rle.default),
}