import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextField, Button, ButtonGroup } from '@mui/material';
import {addItem, editItem} from "../../api/ItemApi";

class ItemForm extends Component { 

    state = {
            name: '',
            id: 0,
            description: '',
            dateSubmitted: ''
    }


    constructor(props){
        super(props);
        this.showAlert = this.showAlert.bind(this);
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
        if(this.props.data){
            this.setState({
                name: this.props.data.name,
                id: this.props.data.id,
                description: this.props.data.description,
                dateSubmitted: this.props.data.dateSubmitted
            });
        }
    }


    handleSubmit = event => {
        event.preventDefault();        
        if(this.props.data){
            editItem(this.state).then(res => {
                console.log( res );
                this.props.history.push("/items");
            }).catch(error => {
                if(error.message && error.success === false){
                    this.showAlert(error.message, "error");
                } else {
                    this.showAlert(error.message, "error");
                }
                console.log(error);
            });
        }
        else{
            addItem(this.state).then(res => {
                console.log( res );
                this.props.history.push("/items");
            }).catch(error => {
                if(error.message && error.success === false){
                    this.showAlert(error.message, "error");
                } else {
                    this.showAlert(error.message, "error");
                }
                console.log(error);
            });
        }
    }


    handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        this.setState({[name]: newValue});
    };


    render(){
        return(
            <form method="post" onSubmit={this.handleSubmit}>
                <TextField
                    fullWidth
                    required
                    label="Name"
                    id="name"
                    name="name"
                    variant="outlined"
                    defaultValue={this.props.data ? this.props.data.name : ''}
                    helperText="Enter the name of the item"
                    onChange={this.handleChange}
                />
                <br/>
                <TextField
                    fullWidth
                    required
                    label="Description"
                    id="description"
                    name="description"
                    variant="outlined"
                    defaultValue = {this.props.data ? this.props.data.description : ''}
                    helperText = "Enter a description of the item"
                    multiline = {true}
                    rows = "3"
                    rowsMax = "3"
                    onChange = {this.handleChange}
                /><br/>
                <ButtonGroup variant="contained">
                    <Button 
                        component={Link} 
                        to="/items"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        className="btn btn-default"
                    >
                        Submit
                    </Button>
                </ButtonGroup>
            </form>
        );
    }
}

export default withRouter(ItemForm);