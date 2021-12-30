import React, { useEffect, useState, ReactElement, FC}  from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';

interface IProps {
    initialItem:{
        name: string,
        description: string,
    },
    onSubmit: any,
    onCancel: any
}

const ItemForm: FC<IProps> = (props): ReactElement<typeof HTMLFormElement> => {
    const [ item, setItem ] = useState({name:'',description:''});
    const {onSubmit, onCancel, initialItem} = props;

    useEffect(() => {
        if(initialItem){
            setItem(initialItem );
        }
    },[initialItem])

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSubmit( item );
    }

    const handleChange = (event: { target: { value?: any; name?: any; }; }) => {
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


export default ItemForm;