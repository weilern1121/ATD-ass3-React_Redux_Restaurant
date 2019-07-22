import React, { Component , Fragment} from 'react';
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
import UserReviews from "./UserReviews";
import ReactDropzone from "react-dropzone";

class Profile extends Component {
    submitted = false;
    state = {
        modal: false,
        newName: '',
        newLocation: '',
        newPic: this.props.user.pic,
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
            modal: !this.state.modal,
            newPic: this.props.user.pic
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const oldName = this.props.user.name;

        const { newName, newLocation, newPic } = this.state;

        this.props.editUser({oldName, name: newName, location: newLocation, pic: newPic});
        this.submitted = true;
    };


    onPreviewDrop = (files) => {
        let reader = new FileReader();
        let file = files[0];

        reader.onloadend = () => {
            this.setState({
                newPic: reader.result
            });
        };

        reader.readAsDataURL(file);
    };


    onChangePicture = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                newPic: reader.result
            });
        };
        reader.readAsDataURL(file)
    };

    render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
        };
        const dropStyle = {
            position: 'relative',
            width: '95%',
            height: '100px',
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderRadius: '5px',
            marginTop:'0.6rem'

        };

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
                                <Label for='pic'>Picture</Label>
                                <div>
                                    <Fragment>
                                        <img
                                            alt="Preview"
                                            src={this.state.newPic? this.state.newPic : this.props.user.pic}
                                            style={previewStyle}
                                        />
                                    </Fragment>
                                </div>
                                <ReactDropzone accept="image/*" style={{borderStyle: 'dashed'}} onDrop={this.onPreviewDrop}>
                                    {({getRootProps, getInputProps}) => (
                                        <section className="container">
                                            <div style={dropStyle} {...getRootProps({className: 'dropzone'})}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop picture</p>
                                            </div>
                                        </section>
                                    )}
                                </ReactDropzone>
                                <Input style={{marginTop:'1rem'}}
                                       type='file'
                                       name='newPic'
                                       id='newPic'
                                       placeholder='Picture'
                                       className='mb-3'
                                       onChange={this.onChangePicture}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Edit Profile
                                </Button>
                            </FormGroup>
                        </Form>
                        <UserReviews name={this.props.user.name}/>
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