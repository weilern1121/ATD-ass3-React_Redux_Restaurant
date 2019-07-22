import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { searchUser } from './actions';
import PropTypes from 'prop-types';

class AdvanceUserSearch extends Component {
    state = {
        modal: false,
        name: null,
        location: null,
        msg: null
    };

    static propTypes = {
        searchUser: PropTypes.func.isRequired,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, location } = this.state;

        this.props.searchUser({name , location });
        this.toggle();
        this.setState({ name: null, location: null, msg:null });
        return false;
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    advance search
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Advance User Search</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        {/*<Form onSubmit={this.onSubmit}>*/}
                            {/*<FormGroup>*/}
                                <Label for='name'>User Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='(*optional*)'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='location'>Location</Label>
                                <Input
                                    type='text'
                                    name='location'
                                    id='location'
                                    placeholder='(*optional*)'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' type="button" onClick={this.onSubmit} style={{ marginTop: '2rem' }} block>
                                    Search
                                </Button>
                            {/*</FormGroup>*/}
                        {/*</Form>*/}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}



export default connect(
    null,
    { searchUser }
)(AdvanceUserSearch);