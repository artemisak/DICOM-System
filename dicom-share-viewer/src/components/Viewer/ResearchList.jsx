import React, {Fragment, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Skeleton} from "@mui/material";
import {ExpandMoreIcon} from "assets/icons";
import {TypographyBold} from "components/StyledComponents";
import {ResearchListTable} from "components/Viewer/ResearchListTable";
import {requestStatus} from "utility/constants";

export const ResearchList = ({isPortable, onSelect, data, status, reload, t}) => {
    const researches = data || [];

    const [isOpen, setIsOpen] = useState(false);

    const onSelectHandler = (selected) => {
        setIsOpen(false);
        onSelect(selected);
    }

    return (
        <Accordion expanded={isOpen} onChange={() => setIsOpen(!isOpen)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <TypographyBold>{t('researches')}</TypographyBold>
            </AccordionSummary>
            <AccordionDetails>
                {isOpen ? (
                    <Fragment>
                        {status === requestStatus.READY ? (
                            <ResearchListTable
                                data={researches}
                                isPortable={isPortable}
                                onSelect={onSelectHandler}
                                reload={reload}
                                t={t}
                            />
                        ) : null}
                        {status === requestStatus.LOADING ? (
                            <Skeleton variant={'rectangular'} height={60} animation={'pulse'}/>
                        ) : null}
                    </Fragment>
                ) : null}
            </AccordionDetails>
        </Accordion>
    )
}