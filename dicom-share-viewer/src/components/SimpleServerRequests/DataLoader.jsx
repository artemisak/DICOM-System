import React, {Fragment, useMemo} from "react";
import {PlaceholderImage} from "components/PlaceholderImage";
import {SkeletonItemListLoader} from "components/SkeletonItemListLoader";
import {requestStatus} from "utility/constants";
import {useRequest} from "utility/hooks";

const DataLoaderSpinner = () => <SkeletonItemListLoader height={60} amount={1}/>;
const DataLoaderError = () => <PlaceholderImage type={'error'}/>
const ComponentBuilder = ({Component, props, data, reload}) => <Component {...props} data={data} reload={reload}/>

export const DataLoader = (
    {
        RenderComponent,
        baseProps,
        LoaderComponent,
        request,
        preprocessor,
        requestParams,
        showContentDuringLoading
    }
) => {
    const {data, status, reload} = useRequest({request, requestParams});

    const processedData = useMemo(() => preprocessor ? preprocessor(data) : data, [JSON.stringify(data)])

    return (
        <Fragment>
            {RenderComponent ? (
                <Fragment>
                    {processedData && (status === requestStatus.READY || (status === requestStatus.LOADING && showContentDuringLoading)) ? (
                        <ComponentBuilder
                            Component={RenderComponent}
                            props={baseProps}
                            data={processedData}
                            reload={reload}
                        />
                    ) : null}
                    {status === requestStatus.LOADING && (!showContentDuringLoading || !processedData) ? (
                        <Fragment>
                            {LoaderComponent ? <LoaderComponent/> : <DataLoaderSpinner/>}
                        </Fragment>
                    ) : null}
                    {status === requestStatus.ERROR ? <DataLoaderError/> : null}
                </Fragment>
            ) : null}
        </Fragment>
    );
}