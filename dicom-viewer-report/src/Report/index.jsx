import React, {useRef} from "react";
import {makePdf} from "./makePdf";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './index.css';

export const Report = ({canvases, SubmitButtonComponent}) => {
    const ref = useRef();

    return (
        <div ref={ref} style={{width: '100%'}}>
            <Editor
                editorClassName={'rdw-editor'}
                toolbarClassName={'rdw-toolbar'}
                toolbar={{
                    options: ['inline', 'fontSize', 'list', 'textAlign', 'history'],
                    inline: {inDropdown: false, options: ['bold', 'italic', 'underline']},
                    fontSize: {options: [12, 14, 16, 18, 24, 30, 36, 48]},
                    list: {options: ['unordered', 'ordered']}
                }}
            />
            <SubmitButtonComponent onClick={() => makePdf(canvases, ref.current)}/>
        </div>
    )
}