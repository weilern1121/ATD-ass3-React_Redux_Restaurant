import React, { Component , Fragment } from 'react';
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
    Alert,

} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {register} from './actions';
import ReactDropzone from "react-dropzone";
import Autosuggest from 'react-autosuggest';

const locations = [ 'Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'LA' ];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? locations : locations.filter(lang =>
        lang.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);



class Register extends Component {
    state = {
        modal: false,
        name: '',
        value: '',
        msg: null,
        pic: null,
        imagePreviewUrl: '',
        suggestions: locations,
        alwaysRenderSuggestions: true
    };

    static propTypes = {
        isConnected: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        // clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { isConnected , error} = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (this.props.error.type === 'REGISTER_FAIL') {
                this.setState({ msg: this.props.error.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If connected, close modal
        if (this.state.modal) {
            if (isConnected) {
                this.toggle();
            }
        }
    }

    onPreviewDrop = (files) => {
        let reader = new FileReader();
        let file = files[0];

        reader.onloadend = () => {
            this.setState({
                pic: reader.result
            });
        };

        reader.readAsDataURL(file);
    };

    toggle = () => {
        // Clear errors
        // this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
            name: '',
            value: '',
            msg: null,
            pic: null,
            imagePreviewUrl: '',
            alwaysRenderSuggestions: true,
            suggestions: locations

        });
    };

    onChange = e => {
        if((e.target.name === 'name') && this.props.users.includes(e.target.value))
            this.state.msg = "Username already taken!";
        else
            this.state.msg = null;
        this.setState({ [e.target.name]: e.target.value });
    };
    onChangePicture = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                pic: reader.result
            });
        };
        reader.readAsDataURL(file)
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, value, pic } = this.state;

        // Create user object
        const newUser = {
            name,
            location: value,
            pic
        };

        // Attempt to register
        this.props.register(newUser);
    };

// Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onChange2 = (event, { newValue }) => {
        this.setState({
            value: newValue,
            alwaysRenderSuggestions: true
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.setState({
            alwaysRenderSuggestions: false
        });
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

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'location',
            value,
            onChange: this.onChange2
        };

        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
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
                                    style={{width: '240px'}}
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='location'>Location</Label>
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    alwaysRenderSuggestions={this.state.alwaysRenderSuggestions}
                                    inputProps={inputProps}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                />

                                <Label for='pic'>Picture</Label>
                                {this.state.pic !== null &&
                                    <div>
                                    <Fragment>
                                            <img
                                                alt="Preview"
                                                src={this.state.pic}
                                                style={previewStyle}
                                            />
                                    </Fragment>
                                    </div>
                                }
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
                                    name='pic'
                                    id='pic'
                                    placeholder='Picture'
                                    className='mb-3'
                                    onChange={this.onChangePicture}
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

const mapStateToProps = (state) => {
    return {
    isConnected: state.app.get('isConnected'),
    error: state.app.get('error'),
    users: state.app.get('search').users
    }
};

export default connect(
    mapStateToProps,
    { register}
)(Register);
