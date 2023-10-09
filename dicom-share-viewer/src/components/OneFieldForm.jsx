import React, {useContext} from "react";
import {validate} from "../utility";
import {Field, Form, Formik} from "formik";
import {Box, TextField} from "@mui/material";
import {RequestButton} from "./SimpleServerRequests/RequestButton";
import {LocaleContext, SizeContext} from "providers/contexts";

export const OneFieldForm = ({fieldTitle, buttonTitle, validateOptions, request, data, onSuccess, onError}) => {
    const {t} = useContext(LocaleContext);
    const {isPortable} = useContext(SizeContext);

    return (
        <Formik initialValues={{message: ''}} onSubmit={() => {}} validateOnMount>
            {({values, resetForm, submitForm, isValid}) => (
                <Form>
                    <Box display={isPortable ? 'block' : 'flex'}>
                        <Box marginRight={isPortable ? 0 : 1} marginBottom={isPortable ? 2 : 0} width={'100%'}>
                            <Field
                                name={'message'}
                                validate={(value) => validate({t, value, options: validateOptions})}
                            >
                                {({field, meta}) => (
                                    <TextField
                                        type={'text'}
                                        inputProps={{autoComplete: 'off'}}
                                        label={fieldTitle}
                                        variant={'outlined'}
                                        fullWidth
                                        size={'small'}
                                        {...field}
                                        error={!!(meta.touched && meta.error)}
                                        helperText={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box>
                            <RequestButton
                                title={buttonTitle}
                                variant={'contained'}
                                fullWidth={isPortable}
                                color={'primary'}
                                data={{...data, message: values?.message}}
                                request={request}
                                onSuccess={(data) => {
                                    resetForm();
                                    onSuccess(data);
                                }}
                                onError={onError}
                                disableElevation
                                style={{height: 40}}
                                extraOnClick={!isValid && submitForm}
                            />
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}