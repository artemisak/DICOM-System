import React from 'react'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {AuthProvider, LocaleProvider, SizeProvider, SnackbarProvider, InstallProvider} from "providers";

import {AppRoutes} from "./AppRoutes";
import {indigo, grey} from "@mui/material/colors";

import {unstable_ClassNameGenerator as ClassNameGenerator} from "@mui/material/utils";

ClassNameGenerator.configure((componentName) => `dsv-${componentName}`)

const theme = createTheme({
    palette: {
        type: 'light',
        background: { default: '#eff2f7' },
        primary: { main: indigo[500] },
        secondary: {  main: grey[500] },
    }
});

export const AppComponent = () => (
    <LocaleProvider>
        <SnackbarProvider>
            <SizeProvider>
                <AuthProvider>
                    <InstallProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <AppRoutes />
                        </ThemeProvider>
                    </InstallProvider>
                </AuthProvider>
            </SizeProvider>
        </SnackbarProvider>
    </LocaleProvider>
)