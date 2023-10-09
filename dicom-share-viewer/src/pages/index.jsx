import React, {Suspense, lazy} from 'react';
import {ErrorBoundary} from "./ErrorBoundary";

const AppComponent = lazy(() => import('./AppComponent').then(({AppComponent}) => ({default: AppComponent})));

export const App = () => (
    <ErrorBoundary>
        <Suspense fallback={' '}>
            <AppComponent/>
        </Suspense>
    </ErrorBoundary>
)