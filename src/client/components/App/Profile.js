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
import PropTypes from 'prop-types';
import { editUser, clearErrors } from './actions';

class Profile extends Component {
    submitted = false;
    state = {
        modal: false,
        newName: '',
        newLocation: '',
        newPic: '',
        msg: null
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        editUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, user } = this.props;


        if (error !== prevProps.error) {
            // Check for register error
            if (error.type === 'EDIT_USER_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        console.log("UPDATE", this.state.modal, user, this.state.newName, this.state.newLocation);
        if (this.state.modal) {
            if (this.state.newName ===  user.name
                && this.state.newLocation ===  user.location
                &&this.state.newPic ===  user.pic
                && this.submitted === true) {
                this.submitted = false;
                this.state.newName ='';
                this.state.newLocation ='';
                this.state.newPic ='';
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const oldName = this.props.user.name;

        const { newName, newLocation, newPic } = this.state;
        console.log('editUser on submit ', { newName, newLocation, newPic }, this.state);


        this.props.editUser({oldName, name: newName, location: newLocation, pic: newPic});
        this.submitted = true;
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Profile
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Profile</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='newName'>Name</Label>
                                <Input
                                    type='text'
                                    name='newName'
                                    id='newName'
                                    placeholder={this.props.user.name}
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='newLocation'>Location</Label>
                                <Input
                                    type='text'
                                    name='newLocation'
                                    id='newLocation'
                                    placeholder={this.props.user.location}
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='newPic'>Picture</Label>
                                <Input
                                    type='text'
                                    name='newPic'
                                    id='newPic'
                                    placeholder={this.props.user.pic}
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Edit Profile
                                </Button>
                            </FormGroup>
                        </Form>
                        <Button color='dark' onClick={this.toggle} style={{ marginTop: '2rem' }} block>
                            View Reviews
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.app.get('error'),
    user: state.app.get('user')
});

export default connect(
    mapStateToProps,
    { editUser , clearErrors}
)(Profile);