import React from 'react';
import ReactDOM from 'react-dom';

import {Report} from './Report';

const Button = (props) => (
    <button {...props}>Print</button>
)

const ReportModalContainer = () => {
    const canvases = document.getElementById('content').getElementsByTagName('canvas');

    return (
        <Report canvases={Array.from(canvases || [])} SubmitButtonComponent={Button}/>
    )
}

ReactDOM.render(<ReportModalContainer/>, document.getElementById('root'));