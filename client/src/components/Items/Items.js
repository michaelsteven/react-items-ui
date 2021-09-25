import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getPageItems} from "../../api/ItemApi";
import ItemTableRow from "../Items/ItemTableRow";
import {Container, IconButton, Table, TableHead, TableBody, TableRow, TableCell, TablePagination} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from '../FormDialog';
import ConfirmDialog from '../ConfirmDialog';
import ItemForm from './ItemForm';
import {addItem, editItem, deleteItem} from "../../api/ItemApi";

class Items extends Component{
    state = {
        activePage: 0,
        pageSize: 5,
        data:{
            totalElements: 0,
            content: [],
              "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
              }
        },
        showLoading: false,
        formDialog: {
            isOpen: false,
            title: ""
        },
        confirmDialog: {
            isOpen: false,
            title: "",
            onConfirm: "",
        },        
        itemUnderEdit:{}
    };


    constructor(props){
        super(props);
        this.showAlert = this.showAlert.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setFormDialog = this.setFormDialog.bind(this);
        this.setConfirmDialog = this.setConfirmDialog.bind(this);
    }


    componentDidMount(){
        document.title = "Items";
        this.setPage(0)
    }


    handlePageChange = (event, newPage) => {
        event.preventDefault();
        this.setPage(newPage);
    }


    handleRowsPerPageChange = (event) => {
        event.preventDefault();
        this.setState({pageSize: event.target.value}, function () {
            this.setPage(0);
        });
    }


    handleNewClicked = (event) => {
        event.preventDefault();
        const formDialog = {
            isOpen: true,
            title: 'New Item',
            action: "new"
        }
        this.setState({itemUnderEdit:{}});
        this.setFormDialog(formDialog);
    }


    handleEditClicked = item => event => {
        event.preventDefault();
        const formDialog = {
            isOpen: true,
            title: 'Edit Item',
            action: "edit"
        }
        this.setState({itemUnderEdit: item});
        this.setFormDialog(formDialog);
    };


    handleDeleteClicked = item => event => {
        const confirmDialog = {
            isOpen: true,
            title: 'Are you sure you want to delete?',
            subTitle: "You can't undo this operation",
            onConfirm: this.onDelete( item ),
        }
        this.setConfirmDialog(confirmDialog);  
    }


    onDelete = item => event => {
        deleteItem(item.id).then(res => {
            window.location.reload(false);
        }).catch(error => {
            this.showAlert(error.message, "error");
            console.log(error);
        });
    }


    handleFormDialogCancel = (event) => {
        event.preventDefault();
        const formDialog = {
            isOpen: false
        }
        this.setFormDialog(formDialog);
    }


    setFormDialog( formDialogValue ) {
        this.setState({
            formDialog: formDialogValue
        });
    }


    setConfirmDialog( confirmDialogValue ) {
        this.setState({
            confirmDialog: confirmDialogValue
        });
    }


    setPage(pageNumber){
        this.setState({showLoading: true});
        this.setState({activePage: pageNumber});
        const defaultPageable = {
            pageNumber: pageNumber,
            pageSize: this.state.pageSize
        };
        getPageItems(defaultPageable).then(res => {
            this.setState({
                data: res,
                items: res.content,
                showLoading: false
            });
        }).catch(error => {
            this.displayError(error);
            this.setState({showLoading: false});
        });
    }


    handleAddOrEdit = (item) => {
        if(item.id > 0 ){
            editItem(item).then(res => {
                console.log( res );
                const formDialog = {
                    isOpen: false
                }
                this.setFormDialog(formDialog);
                window.location.reload(false);
            }).catch(error => {
                this.displayError(error);
            });
        }
        else{
            addItem(item).then(res => {
                console.log( res );
                const formDialog = {
                    isOpen: false
                }
                this.setFormDialog(formDialog);
            }).catch(error => {
                this.displayError(error);
            });
        }
    }


    displayError(error){
        if(error.message && error.success === false){
            this.showAlert(error.message, "error");
        } else {
            this.showAlert(error.message, "error");
        }
        console.log(error);
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


    render(){
        let tableLines = [];
        if(this.state.data && this.state.data.content && this.state.data.totalElements > 0){
            tableLines = Object.keys(this.state.data.content)
                .map(key => <ItemTableRow 
                                key={key} 
                                handleEditClicked={this.handleEditClicked} 
                                handleDeleteClicked={this.handleDeleteClicked} 
                                item={this.state.data.content[key]}/>);
        }

        return(
            <Container maxWidth="md">
                <FormDialog
                    formDialog = {this.state.formDialog}
                    setFormDialog = {this.setFormDialog}>
                    <ItemForm item={this.state.itemUnderEdit} 
                        onSubmit={this.handleAddOrEdit} 
                        onCancel={this.handleFormDialogCancel}
                />
                </FormDialog>
                <ConfirmDialog
                    confirmDialog = {this.state.confirmDialog}
                    setConfirmDialog = {this.setConfirmDialog}
                />
                <h3>Items</h3>
                {
                    this.state.showLoading
                    ?
                        <div className="align-content-center text-center">
                            <h4 className="text-muted">Loading. Please Wait...</h4>
                            <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                        </div>
                    :
                        <div>
                            <Table className="table table-hover">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell>Item name</TableCell>
                                        <TableCell>Item Description</TableCell>
                                        <TableCell>Date Created</TableCell>
                                        <TableCell colSpan={2} align='center'>                
                                            <IconButton 
                                                onClick={this.handleNewClicked}
                                                variant="contained"
                                            >
                                                <AddIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {tableLines}
                                </TableBody>
                            </Table>
                            <div className="d-flex justify-content-center">
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 100]}
                                    component="div"
                                    count={this.state.data.totalElements}
                                    rowsPerPage={this.state.pageSize}
                                    page={this.state.activePage}
                                    onPageChange={this.handlePageChange}
                                    onRowsPerPageChange={this.handleRowsPerPageChange}
                                />
                            </div>
                        </div>
                }
            </Container>
        );
    }
}

export default withRouter(Items);