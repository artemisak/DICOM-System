import React, {useState} from "react";
import {Box, Link, Typography, TextField} from "@mui/material";
import {Formik, Form, Field} from 'formik';
import {validate} from "utility/index";
import {RequestButton} from "../SimpleServerRequests/RequestButton";
import {api} from "api/index";

import {TypographyPointer} from "../StyledComponents";

export const Login = ({onSubmit, hasAccount, setHasAccount, t}) => (
    <Formik
        initialValues={{username: '', password: '', confirm_password: ''}}
        onSubmit={() => {}}
        validateOnMount
    >
        {({handleSubmit, values, isValid}) => (
            <Form>
                <Box marginBottom={4}>
                    <Box marginBottom={2}>
                        <Field
                            name={'username'}
                            validate={(value) => validate({
                                t,
                                value,
                                options: {
                                    require: true, min: 5, max: 16, format: '(?=.*[a-zA-Z])(^[a-zA-Z0-9]+$)'
                                }
                            })}
                        >
                            {({field, meta}) => (
                                <TextField
                                    type={'text'}
                                    label={t('username')}
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
                        <Field
                            name={'password'}
                            validate={(value) => validate({
                                t,
                                value,
                                options: {
                                    require: true, min: 5, max: 16, format: '^[a-zA-Z0-9\.\_\$\!\?\#\@\%]+$'
                                }
                            })}
                        >
                            {({field, meta}) => (
                                <TextField
                                    type={'password'}
                                    label={t('password')}
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
                    {!hasAccount ? (
                        <Box marginTop={2}>
                            <Field
                                name={'confirm_password'}
                                validate={(value) => value !== values.password && t('password_mismatch')}
                            >
                                {({field, meta}) => (
                                    <TextField
                                        type={'password'}
                                        label={t('confirm_password')}
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
                    ) : null}
                </Box>
                <Box marginBottom={2}>
                    <RequestButton
                        title={t(hasAccount ? 'login' : 'register')}
                        variant={'contained'}
                        fullWidth
                        color={'primary'}
                        data={{username: values?.username, password: values?.password}}
                        request={hasAccount ? api.post.login : api.post.register}
                        onSuccess={onSubmit}
                        extraOnClick={!isValid && handleSubmit}
                    />
                </Box>
                <Box style={{textAlign: 'center'}}>
                    <Typography variant={'body2'} component={'span'}>
                        {t(hasAccount ? 'no_account' : 'has_account')}
                    </Typography>
                    <TypographyPointer
                        onClick={() => setHasAccount(!hasAccount)}
                        variant={'body2'}
                        component={Link}
                    >
                        {t(hasAccount ? 'create_one' : 'login')}
                    </TypographyPointer>
                </Box>
            </Form>
        )}
    </Formik>
);