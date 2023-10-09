import _ from 'lodash';

export const mergeMarkups = (markup1, markup2) => {
    if (!markup2) return markup1;
    const markup2Colored = JSON.parse(JSON.stringify(markup2).replace(/#ffff80/g, "#ff8000"));
    const customizer = (objValue, srcValue) => {
        if (_.isArray(objValue)) return objValue.concat(srcValue);
    }
    return _.mergeWith(markup1, markup2Colored, customizer);
}