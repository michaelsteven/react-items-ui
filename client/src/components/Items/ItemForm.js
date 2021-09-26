import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, Button, ButtonGroup } from '@mui/material';

class ItemForm extends Component { 

    onSubmit = this.props.onSubmit;

    onCancel = this.props.onCancel;
    
    state = {
        item: {
            name: '',
            id: 0,
            description: '',
            dateSubmitted: ''
        }
    }


    componentDidMount() {
        if(this.props.item){
            this.setState({
                item: this.props.item
            });
        }
    }


    handleSubmit = event => {
        event.preventDefault();
        this.onSubmit( this.state.item );
    }


    handleChange = evt => {
        const {name} = evt.target;
        const newValue = evt.target.value;
        this.setState(prevState => ({item: { ...prevState.item, [name]: newValue } }));
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
                    defaultValue={this.props.item ? this.props.item.name : ''}
                    helperText="Enter the name of the item"
                    onChange={this.handleChange}/>
                <br/>
                <TextField
                    fullWidth
                    required
                    label="Description"
                    id="description"
                    name="description"
                    variant="outlined"
                    defaultValue = {this.props.item ? this.props.item.description : ''}
                    helperText = "Enter a description of the item"
                    multiline = {true}
                    rows = "3"
                    rowsmax = "3"
                    onChange = {this.handleChange}/>
                <br/>
                <ButtonGroup variant="contained">
                    <Button 
                        onClick={this.onCancel}
                        variant="contained">Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        className="btn btn-default">Submit</Button>
                </ButtonGroup>
            </form>
        );
    }
}

export default withRouter(ItemForm);