export const importJSON = (onFileReady) => {
    const hiddenInputElement = document.createElement("input");
    hiddenInputElement.type = 'file';
    hiddenInputElement.accept = '.json';
    hiddenInputElement.multiple = false;
    hiddenInputElement.onchange = (event) => {
        const file = event?.target?.files[0];
        if (!file) return;
        try {
            const reader = new FileReader()
            reader.onload = () => reader?.result && onFileReady(JSON.parse(new TextDecoder().decode(reader.result)));
            reader.readAsArrayBuffer(file);
        } catch (e) {console.error('An error occurred while reading markup file')}
    };
    hiddenInputElement.click();
}