import React, {Suspense, lazy} from 'react';
import {ViewerSkeletonLoader} from "components/Viewer/ViewerSkeletonLoader";

const ViewerComponent = lazy(() => import('dicom-viewer').then(({DicomViewer}) => ({default: DicomViewer})));
const ReportModalComponent = lazy(() => import('dicom-viewer-report').then(({Report}) => ({default: Report})));

export const ViewerLoader = (props) => (
    <Suspense fallback={<ViewerSkeletonLoader/>}>
        <ViewerComponent {...props}/>
    </Suspense>
)

export const ReportModalLoader = (props) => (
    <Suspense fallback={<ViewerSkeletonLoader/>}>
        <ReportModalComponent {...props}/>
    </Suspense>
)