import React, {useEffect, useState} from 'react';
import {IconButton, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';

export default function ItemTableRow(props) {
    const {handleEditClicked, handleDeleteClicked}  = props;
    const [ item, setItem ] = useState({id:0,name:'',description:'',dateSubmitted:''});  

    useEffect(() => {
        if(props.item){
            setItem(props.item );
        }
    },[props])

    const handleClick = event => {
        event.preventDefault();
    }

    return (
        <TableRow>
            <TableCell onClick={handleClick}>{item.id}</TableCell>
            <TableCell onClick={handleClick}>{item.name}</TableCell>
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