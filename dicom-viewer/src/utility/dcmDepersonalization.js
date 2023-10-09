import dicomParser from 'dicom-parser';

const personalAttributes = [
    'x00100010', 'x00100020', 'x00100030', 'x00081030', 'x00181030', 'x00080050', 'x00200010', 'x00080020',
    'x00080030', 'x0008103e', 'x00080021', 'x00080031', 'x00080022', 'x00080032', 'x00080023', 'x00080033',
    'x00080012', 'x00080013', 'x00080080', 'x00080081', 'x00081010', 'x00100040', 'x00101010', 'x00101030',
]

export const dcmDepersonalization = (arrBuffer) => {
    try {
        const byteArray = new Uint8Array(arrBuffer);
        const dataSet = dicomParser.parseDicom(byteArray);
        personalAttributes.forEach(attr => {
            const currentValue = dataSet.string(attr);
            const currentElement = dataSet.elements[attr];
            if (currentValue && currentElement) {
                const {length, dataOffset} = currentElement;
                const newValue = new Array(currentValue.length + 1).join('*');
                for (let i = 0; i < length; i++) {
                    dataSet.byteArray[dataOffset + i] = (newValue.length > i) ? newValue.charCodeAt(i) : 32;
                }
            }
        })
        return dataSet.byteArray.buffer;
    } catch(e) {
        return null;
    }

}