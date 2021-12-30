import React, {useEffect, useState, ReactElement, FC} from 'react';
import {IconButton, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';

interface IProps {
    item: {
        id: number,
        name: string,
        description: string,
        dateSubmitted: string
    },
    handleEditClicked: any,
    handleDeleteClicked: any
}

const ItemTableRow: FC<IProps> = (props): ReactElement<typeof TableRow> => {
    const {handleEditClicked, handleDeleteClicked}  = props;
    const [ item, setItem ] = useState({id:0,name:'',description:'',dateSubmitted:''});  

    useEffect(() => {
        if(props.item){
            setItem(props.item );
        }
    },[props])

    const handleClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    }

    return (
        <TableRow data-test='component-itemtablerow'>
            <TableCell data-test='component-itemtablerow-idcell' onClick={handleClick}>{item.id}</TableCell>
            <TableCell data-test='component-itemtablerow-namecell' onClick={handleClick}>{item.name}</TableCell>
            <TableCell onClick={handleClick}>{item.description}</TableCell>
            <TableCell onClick={handleClick}>{item.dateSubmitted}</TableCell>
            <TableCell align='center'>
                <IconButton onClick={handleEditClicked(item)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClicked(item)}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default ItemTableRow;