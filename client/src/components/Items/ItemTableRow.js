import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {IconButton, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import {deleteItem} from "../../api/ItemApi";
import ConfirmDialog from '../ConfirmDialog';

class ItemTableRow extends Component {
    state = {
        item: {
            id: 0,
            name: "",
            description: "",
            dateSubmitted: ""
        },
        confirmDialog: {
            isOpen: false,
            title: "",
            subTitle: ""
        }
    };

    constructor(props) {
        super(props);
        this.setConfirmDialog = this.setConfirmDialog.bind(this);
       // this.showAlert = this.showAlert.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    showAlert = (message, type) => {
        const Noty = require('noty');
        new Noty({
            text: message,
            timeout: 5000,
            type: type,
            theme: 'metroui',
            layout: 'topLeft',
            closeWith: ['button'],
        }).show();
    };    

    componentDidMount() {
        this.setState({
            item: this.props.item
        });
    }

    setConfirmDialog( confirmDialogValue ) {
        this.setState({
            confirmDialog: confirmDialogValue
        });
    }

    handleClick(e){
        alert("Hello world")
        //const {id} = e.currentTarget.dataset;
        //alert(id);
       // e.preventDefault();
    }

    editItem = event => {
        event.preventDefault();
        this.props.history.push( {
                pathname: "/items/edit",
                state: this.state.item
        });
    }

    deleteItem = event => {
        event.preventDefault();
        const confirmDialog = {
            isOpen: true,
            title: 'Are you sure you want to delete?',
            subTitle: "You can't undo this operation",
            onConfirm: () => {this.onDelete()}
        }
        this.setConfirmDialog(confirmDialog);
    }

    onDelete(){
        deleteItem(this.state.item.id).then(res => {
            this.setState({confirmDialog: {isOpen:false}}, () => {
                this.props.history.push("/items");
            });
        }).catch(error => {
            if(error.message && error.success === false){
                this.showAlert(error.message, "error");
            } else {
                this.showAlert(error.message, "error");
            }
            console.log(error);
        });
    }

    render() {
        return (
            <TableRow onclick={this.handleClick}>
                <TableCell>{this.state.item.id}</TableCell>
                <TableCell>{this.state.item.name}</TableCell>
                <TableCell>{this.state.item.description}</TableCell>
                <TableCell>{this.state.item.dateSubmitted}</TableCell>
                <TableCell>
                    <IconButton onClick={this.editItem}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={this.deleteItem}>
                        <DeleteIcon/>
                    </IconButton>
                    <ConfirmDialog
                        confirmDialog = {this.state.confirmDialog}
                        setConfirmDialog = {this.setConfirmDialog}
                    />
                </TableCell>
            </TableRow>
        );
    }
}

export default withRouter(ItemTableRow);