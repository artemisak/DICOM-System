import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

const MAX_WIDTH = 180;
const MAX_HEIGHT = 240;

const getAdaptedSize = (width, height) => {
    if (width / height >= MAX_WIDTH / MAX_HEIGHT) {
        return {width: MAX_WIDTH, height: MAX_WIDTH * height / width}
    } else {
        return {width: MAX_HEIGHT * width / height, height: MAX_HEIGHT}
    }
}

export const makePdf = (canvases, text) => {
    const {width: imageWidth, height: imageHeight} = canvases[0];
    const virtualCanvas = document.createElement('canvas');
    virtualCanvas.width = imageWidth;
    virtualCanvas.height = imageHeight;
    const virtualCanvasContext = virtualCanvas.getContext('2d');

    canvases.forEach(canvas => {
        virtualCanvasContext?.drawImage(canvas, 0, 0, imageWidth, imageHeight);
    });

    const pdf = new jsPDF();

    const textContent = text ? text.getElementsByClassName('rdw-editor')?.[0]?.firstChild : null;

    html2canvas(textContent, {windowWidth: 700, width: 720}).then(canvas => {
        const textContentSizes = getAdaptedSize(canvas.width, canvas.height);
        const imageContentSizes = getAdaptedSize(imageWidth, imageHeight);

        pdf.addImage(
            canvas.toDataURL("image/jpeg", 1.0),
            'JPEG',
            15,
            15,
            textContentSizes.width,
            textContentSizes.height
        );

        let imageOffset = 0;
        if (textContentSizes.height + imageContentSizes.height + 20 >= MAX_HEIGHT) {
            pdf.addPage('a4');
        } else {
            imageOffset += textContentSizes.height + 5;
        }

        pdf.addImage(
            virtualCanvas.toDataURL("image/jpeg", 1.0),
            'JPEG',
            15,
            imageOffset + 15,
            imageContentSizes.width,
            imageContentSizes.height
        );

        pdf.save("conclusion.pdf");
    });
}