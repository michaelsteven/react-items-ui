import Container from '@mui/material/Container';
import ItemForm from './ItemForm'

export default function New(){
    return (
        <Container maxWidth="sm">
            <h3>Add Item</h3>
            <ItemForm/>
        </Container>
    );
};