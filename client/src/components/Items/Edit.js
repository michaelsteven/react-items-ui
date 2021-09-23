import Container from '@mui/material/Container';
import ItemForm from './ItemForm'

export default function Edit(props){
    return (
        <Container maxWidth="sm">
            <h3>Edit Item</h3>
            <ItemForm data={props.location.state}/>
        </Container>
    );
};