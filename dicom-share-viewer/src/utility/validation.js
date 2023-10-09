export function SimpleFieldValidator(value = '') {
    this.fieldValue = String(value);
    this.fieldError = '';

    this.require = (errorText) => {
        if (this.fieldError) return this;
        if (!this.fieldValue) this.fieldError = errorText;
        return this;
    }

    this.minLength = (limit, errorText) => {
        if (this.fieldError) return this;
        if (this.fieldValue.length < limit) this.fieldError = errorText;
        return this;
    }

    this.maxLength = (limit, errorText) => {
        if (this.fieldError) return this;
        if (this.fieldValue.length > limit) this.fieldError = errorText;
        return this;
    }

    this.format = (reg, errorText) => {
        if (this.fieldError) return this;
        if (!this.fieldValue.match(reg)) this.fieldError = errorText;
        return this;
    }

    this.validate = () => {
        return this.fieldError;
    }
}

export const validate = ({options = {}, value, t}) => {
    const {require, min, max, format} = options;
    return new SimpleFieldValidator(value)
        .require(require && t('required'))
        .minLength(min || 0, min && t('short'))
        .maxLength(max || 0, max && t('long'))
        .format(format || '', format && t('wrong_format'))
        .validate();
}