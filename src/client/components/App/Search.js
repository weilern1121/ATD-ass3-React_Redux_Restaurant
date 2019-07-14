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
    InputGroup,
    InputGroupAddon,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from './actions';
// import { clearErrors } from '../../actions/errorActions';

class Search extends Component {
    state = {
        modal: false,
        name: '',
        location: '',
        pic: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        // error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        // clearErrors: PropTypes.func.isRequired
    };

    // componentDidUpdate(prevProps) {
    //     // const { error, isConnected } = this.props;
    //     const { isConnected , error} = this.props;
    //     if (error !== prevProps.error) {
    //         // Check for register error
    //         if (error.id === 'REGISTER_FAIL') {
    //             this.setState({ msg: error.msg.msg });
    //         } else {
    //             this.setState({ msg: null });
    //         }
    //     }
    //
    //     // If authenticated, close modal
    //     if (this.state.modal) {
    //         if (isConnected) {
    //             this.toggle();
    //         }
    //     }
    // }

    toggle = () => {
        // Clear errors
        // this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, location, pic } = this.state;

        // Create user object
        const newUser = {
            name,
            location,
            pic
        };

        // Attempt to register
        this.props.register(newUser);
    };

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="Search" />
                </InputGroup>
                <NavLink onClick={this.toggle} href='#'>
                    advance search
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='location'>Location</Label>
                                <Input
                                    type='location'
                                    name='location'
                                    id='location'
                                    placeholder='Location'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='pic'>Picture</Label>
                                <Input
                                    type='text'
                                    name='pic'
                                    id='pic'
                                    placeholder='Picture'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.app.isConnected,
    error: state.error
});

export default connect(
    mapStateToProps,
    { register }
    // { register, clearErrors }
)(Search);
