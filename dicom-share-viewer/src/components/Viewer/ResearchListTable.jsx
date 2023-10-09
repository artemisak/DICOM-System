import React, {useState} from "react";
import {Box, Button, styled, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {PlaceholderImage} from "components/PlaceholderImage";
import {TitleWithDescription} from "components/TitleWithDescription";
import {concatNameAndDate} from "utility/concatNameAndDate";
import {DeleteButton} from "components/DeleteButton";
import {api} from "api";

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end'
})

const ButtonStyled = styled(Button)({
    minWidth: 160
})

export const ResearchListTable = ({data, isPortable, onSelect, reload, t}) => {
    const [selected, setSelected] = useState([]);

    const buttonNames = {
        0: t('create'),
        1: t('view'),
        2: t('compare')
    }

    const handleRowClick = (id) => {
        if (selected.includes(id)) {
            const newSelected = selected.filter(item => item !== id);
            setSelected(newSelected)
        } else {
            setSelected([...selected, id])
        }
    }

    return (
        <Box>
            {data && data?.length ? (
                <Table size={'small'}>
                    <TableBody>
                        {data.map(({id, title, date, userName, userId}) => (
                            <TableRow role={"checkbox"} selected={selected.includes(id)} key={id}>
                                <TableCell
                                    align={"justify"}
                                    onClick={() => handleRowClick(id)}
                                    sx={{cursor: 'pointer'}}
                                    padding={'none'}
                                >
                                    <Box padding={1}>
                                        <TitleWithDescription
                                            title={title}
                                            description={concatNameAndDate(userName, date)}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="right" width={50} padding={'none'}>
                                    <DeleteButton
                                        isVisibleFor={userId}
                                        request={api.delete.research}
                                        requestParams={{researchId: id}}
                                        onSuccess={() => reload()}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <PlaceholderImage type={'empty'}/>
            )}
            {selected.length < 3 ? (
                <ButtonContainer marginTop={2}>
                    <ButtonStyled
                        onClick={() => onSelect(selected)}
                        variant={'contained'}
                        fullWidth={isPortable}
                        color={'primary'}
                        width={120}
                    >
                        {buttonNames?.[selected.length]}
                    </ButtonStyled>
                </ButtonContainer>
            ) : null}
        </Box>
    )
}