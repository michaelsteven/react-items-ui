import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ItemTableRow extends Component {

    state = {
        item: {}
    };

    componentDidMount() {
        this.setState({
            item: this.props.item
        });
    }

    render() {
        return (
            <tr>
                <td>{this.state.item.id}</td>
                <td>{this.state.item.name}</td>
                <td>{this.state.item.description}</td>
                <td>{this.state.item.dateSubmitted}</td>
            </tr>
        );
    }
}

export default withRouter(ItemTableRow);