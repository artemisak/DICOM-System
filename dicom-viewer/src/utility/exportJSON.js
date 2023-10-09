export const exportJSON = (data, fileName = 'file.json') => {
    const downloadLink = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], {type: 'text/plain;charset=utf-8'});
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = fileName;
    downloadLink.click();
}