import React, { useEffect, useState } from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';

const ItemForm = (props) => {
    const [ item, setItem ] = useState({name:'',description:''});
    const {onSubmit, onCancel, initialItem} = props;

    useEffect(() => {
        if(initialItem){
            setItem(initialItem );
        }
    },[initialItem])

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit( item );
    }

    const handleChange = event => {
        const {name} = event.target;
        const newValue = event.target.value;
        setItem(prevState => ({ ...prevState, [name]: newValue }));
    };

    return(
        <form method="post"
              onSubmit={handleSubmit}
              data-test='component-itemform'
        >
            <TextField
                data-test='component-itemform-name'
                fullWidth
                required
                label="Name"
                id="name"
                name="name"
                variant="outlined"
                defaultValue={initialItem ? initialItem.name : ''}
                helperText="Enter the name of the item"
                onChange={handleChange}/>
            <br/>
            <TextField
                data-test='component-itemform-description'
                fullWidth
                required
                label="Description"
                id="description"
                name="description"
                variant="outlined"
                defaultValue = {initialItem ? initialItem.description : ''}
                helperText = "Enter a description of the item"
                multiline = {true}
                rows = "3"
                rowsmax = "3"
                onChange = {handleChange}/>
            <br/>
            <ButtonGroup variant="contained">
                <Button 
                    onClick={onCancel}
                    variant="contained">Cancel</Button>
                <Button
                    type="submit"
                    variant="contained"
                    className="btn btn-default">Submit</Button>
            </ButtonGroup>
        </form>
    );
}

ItemForm.propTypes = {
    onSubmit: PropTypes.object.isRequired, 
    onCancel: PropTypes.object.isRequired, 
    initialItem: PropTypes.object.isRequired
};

export default ItemForm;