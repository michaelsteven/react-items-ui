import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container, IconButton, Table, TableHead, TableBody, TableRow, TableCell, TablePagination} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from '../FormDialog';
import ConfirmDialog from '../ConfirmDialog';
import ItemForm from './ItemForm';
import ItemTableRow from "./ItemTableRow";
import {addItem, editItem, deleteItem, getPageItems} from "../../api/ItemApi";


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
            onCancel: ""
        },        
        itemUnderEdit:{}
    };


    constructor(props){
        super(props);
        this.showAlert = this.showAlert.bind(this);
        this.setPage = this.setPage.bind(this);
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
        this.setState({pageSize: event.target.value}, () => {
            this.setPage(0);
        });
    }


    handleNewClicked = (event) => {
        event.preventDefault();
        const formDialogValue = {
            isOpen: true,
            title: 'New Item',
            action: "new"
        }
        this.setState({itemUnderEdit:{}}, () => {
            this.setState({
                formDialog: formDialogValue
            });
        });
    }

    handleEditClicked = item => event => {
        event.preventDefault();
        const formDialogValue = {
            isOpen: true,
            title: 'Edit Item',
            action: "edit"
        }
        this.setState({itemUnderEdit: item}, () => {
            this.setState({
                formDialog: formDialogValue
            });
        });
    };


    handleDeleteClicked = item => event => {
        event.preventDefault();
        const confirmDialogValue = {
            isOpen: true,
            title: 'Are you sure you want to delete?',
            subTitle: "You can't undo this operation",
            onConfirm: this.onDelete( item ),
            onCancel: this.handleConfirmDialogCancel
        }
        this.setState({confirmDialog: confirmDialogValue});
    }


    onDelete = item => event => {
        event.preventDefault();
        deleteItem(item.id).then(res => {
            console.log(res);
            this.setState({confirmDialog:{isOpen:false}}, () => {
               this.setPage(0); 
            });
        }).catch(error => {
            this.showAlert(error.message, "error");
            console.log(error);
        });
    }


    handleFormDialogCancel = (event) => {
        event.preventDefault();
        this.setState({formDialog: {isOpen: false}});
    }

    handleConfirmDialogCancel = (event) => {
        event.preventDefault();
        this.setState({confirmDialog: {isOpen: false}});
    }

    setPage(pageNumberValue){
        this.setState({showLoading: true});
        this.setState({activePage: pageNumberValue});
        const defaultPageable = {
            pageNumber: pageNumberValue,
            pageSize: this.state.pageSize
        };
        getPageItems(defaultPageable).then(res => {
            this.setState({
                data: res,
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
                this.setState({formDialog: {isOpen: false}}, () => {
                    this.setPage(0); 
                });
            }).catch(error => {
                this.displayError(error);
            });
        }
        else{
            addItem(item).then(res => {
                console.log( res );
                this.setState({formDialog: {isOpen: false}}, () => {
                    this.setPage(0); 
                });
            }).catch(error => {
                this.displayError(error);
            });
        }
    }


    showAlert = (message, type) => {
        alert(JSON.stringify(message));
        console.log(message, type);
    };


    displayError(error){
        if(error.message && error.success === false){
            this.showAlert(error.message, "error");
        } else {
            this.showAlert(error.message, "error");
        }
        console.log(error);
    }


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
                <FormDialog
                    formDialog = {this.state.formDialog}
                    onCancel={this.handleFormDialogCancel}>
                    <ItemForm item={this.state.itemUnderEdit} 
                        onSubmit={this.handleAddOrEdit} 
                        onCancel={this.handleFormDialogCancel}
                />
                </FormDialog>
                <ConfirmDialog
                    confirmDialog = {this.state.confirmDialog}
                />
            </Container>
        );
    }
}

export default withRouter(Items);