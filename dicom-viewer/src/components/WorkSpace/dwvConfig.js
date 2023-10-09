import dwv from 'dwv';
import {decoderScripts} from "../../utility/decoders";

const toolsEventsList = ['drawcreate', 'drawchange', 'drawmove', 'drawdelete'];
const drawOptions = ['Ruler', 'Arrow', 'Protractor', 'Rectangle', 'Ellipse', 'Roi']

const tools = {
    Scroll: {},
    ZoomAndPan: {},
    WindowLevel: {},
    Floodfill: {events: toolsEventsList},
    Draw: {options: drawOptions, type: 'factory', events: toolsEventsList}
};

export const initDwvOptions = () => {
    dwv.image.decoderScripts = decoderScripts;

    dwv.tool.colourMaps = {
        plain: dwv.image.lut.plain,
        invplain: dwv.image.lut.invPlain,
        rainbow: dwv.image.lut.rainbow,
        hot: dwv.image.lut.hot,
        hotiron: dwv.image.lut.hot_iron,
        pet: dwv.image.lut.pet,
        hotmetalblue: dwv.image.lut.hot_metal_blue,
        pet20step: dwv.image.lut.pet_20step
    };
}

export const initDwvInstance = ({onLoad, onError}) => {
    let app = new dwv.App();
    app.init({
        "dataViewConfigs": {'*': [{divId: 'layerGroup0'}]},
        "tools": tools
    });

    app.addEventListener("loadstart", () => onLoad(false));
    app.addEventListener("loadend", () => onLoad(true));
    app.addEventListener('keydown', (event) => app.defaultOnKeydown(event));
    app.addEventListener('error', (error) => onError(error));

    return app;
}

export const newDwvState = () => {
    return new dwv.io.State();
}