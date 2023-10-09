import React from 'react';
import ReactDOM from 'react-dom';

import {DicomViewer} from './components/DicomViewer';

const ExampleDicomViewer = () => (
    <div style={{maxWidth: 800, margin: '8px auto'}}>
        <DicomViewer locale={'en'} />
    </div>
)

ReactDOM.render(<ExampleDicomViewer/>, document.getElementById('root'));