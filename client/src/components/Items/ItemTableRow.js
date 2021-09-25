import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {IconButton, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';

class ItemTableRow extends Component {
    handleEditClicked = this.props.handleEditClicked;
    handleDeleteClicked = this.props.handleDeleteClicked;

    state = {
        item: {
            id: 0,
            name: "",
            description: "",
            dateSubmitted: ""
        }
    };    

    componentDidMount() {
        this.setState({
            item: this.props.item
        });
    }

    handleClick = event => {
        alert("Hello world");
    }

    render() {
        return (
            <TableRow>
                <TableCell onClick={this.handleClick}>{this.state.item.id}</TableCell>
                <TableCell onClick={this.handleClick}>{this.state.item.name}</TableCell>
                <TableCell onClick={this.handleClick}>{this.state.item.description}</TableCell>
                <TableCell onClick={this.handleClick}>{this.state.item.dateSubmitted}</TableCell>
                <TableCell align='center'>
                    <IconButton onClick={this.handleEditClicked(this.state.item)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={this.handleDeleteClicked(this.state.item)}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

export default withRouter(ItemTableRow);