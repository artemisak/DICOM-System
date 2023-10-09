import React, {useContext} from "react";
import {AuthContext, LocaleContext, SizeContext} from "providers/contexts";
import {ViewerComponent} from "./ViewerComponent";

export const Viewer = ({fileId, withResearches, discussionId}) => {
    const {t, lang} = useContext(LocaleContext);
    const {isPortable} = useContext(SizeContext);
    const {auth} = useContext(AuthContext);

    return (
        <ViewerComponent
            fileId={fileId}
            discussionId={discussionId}
            withResearches={withResearches}
            lang={lang}
            t={t}
            auth={auth}
            isPortable={isPortable}
        />
    );
}