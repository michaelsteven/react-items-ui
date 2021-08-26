import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getPageItems} from "./api/ItemApi";
import ItemTableRow from "./component/ItemTableRow";
import ItemPagination from "./component/ItemPagination";

class App extends Component{

    state = {
        pagedResponse: {},
        items: [],
        showLoading: false
    };

    constructor(props){
        super(props);
        this.showAlert = this.showAlert.bind(this);
        this.getFirstPageItems = this.getFirstPageItems.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount(){
        document.title = "Items";
        this.getFirstPageItems();
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

    getFirstPageItems(){
        const defaultPageable = {
            page: 0
        };
        this.setState({showLoading: true});
        getPageItems(defaultPageable).then(res => {
            this.setState({
                pagedResponse: res,
                items: res.content,
                showLoading: false
            });
        }).catch(error => {
            if(error.message && error.success === false){
                this.showAlert(error.message, "error");
            } else {
                alert(error.message)
                this.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    handleChangePage(pageable){
        this.setState({showLoading: true});
        getPageItems(pageable).then(res => {
            this.setState({
                pagedResponse: res,
                items: res.content,
                showLoading: false
            });
        }).catch(error => {
            if(error.message && error.success === false){
                this.props.showAlert(error.message, "error");
            } else {
                this.props.showAlert("An error occurred", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    render(){

        let tableLines = [];
        if(this.state.pagedResponse && this.state.items.length > 0){
            tableLines = Object.keys(this.state.items)
                .map(key => <ItemTableRow key={key} item={this.state.items[key]}/>);
        }

        return(
            <div>
                <h1>Items</h1>
                <hr/>
                {
                    this.state.showLoading
                    ?
                        <div className="align-content-center text-center">
                            <h4 className="text-muted">Loading. Please Wait...</h4>
                            <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                        </div>
                    :
                        <div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Item name</th>
                                        <th scope="col">Item Description</th>
                                        <th scope="col">Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tableLines}
                                </tbody>
                            </table>
                            <ItemPagination
                                showAlert={this.props.showAlert}
                                page={this.state.pagedResponse}
                                handleChangePage={this.handleChangePage}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(App);