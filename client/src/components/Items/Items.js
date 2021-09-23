import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {getPageItems} from "../../api/ItemApi";
import ItemTableRow from "../Items/ItemTableRow";
import {Container, IconButton, Table, TableHead, TableBody, TableRow, TablePagination} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

class Items extends Component{

    state = {
        activePage: 15,
        pageSize: 5,
        data:{
            content: [],
              "totalElements": 0,
              "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
              }
        },
        showLoading: false
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

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({pageSize: event.target.value}, function () {
            this.setPage(0);
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
            if(error.message && error.success === false){
                this.showAlert(error.message, "error");
            } else {
                alert(error.message)
                this.showAlert("An error occurred", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    render(){

        let tableLines = [];
        if(this.state.data && this.state.data.content && this.state.data.totalElements > 0){
            tableLines = Object.keys(this.state.data.content)
                .map(key => <ItemTableRow key={key} item={this.state.data.content[key]}/>);
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
                                        <th scope="col">id</th>
                                        <th scope="col">Item name</th>
                                        <th scope="col">Item Description</th>
                                        <th scope="col">Date Created</th>
                                        <th>                
                                            <IconButton 
                                                    component={Link} 
                                                    to="/items/new"
                                                    variant="contained"
                                                >
                                                <AddIcon/>
                                            </IconButton>
                                        </th>
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
                                    onPageChange={this.handleChangePage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                }
            </Container>
        );
    }
}

export default withRouter(Items);