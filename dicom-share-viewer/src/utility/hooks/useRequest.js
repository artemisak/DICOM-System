import React, {useContext, useEffect, useState} from "react";
import {requestStatus} from "utility/constants";
import {AuthContext} from "providers/contexts";

export const useRequest = ({request, requestParams, delayedStart}) => {
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null);

    const {logout} = useContext(AuthContext);

    useEffect(() => {
        !delayedStart && loadData()
    }, []);

    const loadData = () => {
        if (request) {
            setStatus(requestStatus.LOADING);
            request(requestParams)
                .then(({data}) => {
                    setData(data);
                    setStatus(requestStatus.READY);
                })
                .catch((e) => {
                    setStatus(requestStatus.ERROR);
                    if (e?.response?.status === 401) logout();
                })
        }
    }

    return {data, status, reload: loadData}
}