import React, {useContext} from 'react'
import {useDropzone} from 'react-dropzone'

import {Typography, Box} from "@mui/material";
import {UploadIcon} from "../../assets/icons";

import {LocaleContext} from '../../contexts';

import styles from './index.module.css';
import {dcmDepersonalization} from "../../utility";

const dropZoneConfig = {
    accept: '*/dicom,.dcm, image/dcm, */dcm, .dicom',
    maxFiles: 1,
    multiple: false,
    maxSize: 16 * 1024 * 1024 //16MB
};

export const FileDropZone = ({onChange, onError, colorScheme}) => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone(dropZoneConfig);

    const {translate} = useContext(LocaleContext);

    let file = acceptedFiles[0];

    if (file) {
        const reader = new FileReader()
        reader.onabort = () => onError && onError('File reading was aborted');
        reader.onerror = () => onError && onError('File reading has failed');
        reader.onload = () => {
            const data = dcmDepersonalization(reader.result);
            const buffer = Buffer.from(data);
            const b64String = buffer.toString('base64');
            onChange(`data:application/octet-stream;base64,${b64String}`);
        };

        reader.readAsArrayBuffer(file);
    }

    const {background, color} = colorScheme;
    return (
        <Box {...getRootProps({className: styles.dropZone})} style={{background, color}}
        >
            <input {...getInputProps()} />
            <Box margin={1} width={48} height={48}>
                <UploadIcon/>
            </Box>
            <Typography variant={'h6'} className={styles.titleText}>
                {translate('dragOrClick')}
            </Typography>
            <Typography variant={'caption'} className={styles.titleText}>
                {translate('maxFileSize')}:<b>{` 16 MB. `}</b>
                {translate('acceptFiles')}:<b>{` dcm, dicom. `}</b>
            </Typography>
        </Box>
    );
}