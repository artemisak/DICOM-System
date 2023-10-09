import React, {Fragment} from "react";
import {Box, Skeleton} from "@mui/material";

export const ViewerSkeletonLoader = () => (
    <Fragment>
        <Box marginBottom={2}>
            <Skeleton variant={'rectangular'} height={55} animation={'pulse'}/>
        </Box>
        <Box marginBottom={2}>
            <Skeleton variant={'rectangular'} height={400} animation={'pulse'}/>
        </Box>
    </Fragment>
)