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
import { writeReview, clearErrors } from './actions';
import ReactDropzone from "react-dropzone";

class WriteReview extends Component {
    submitted = false;
    state = {
        modal: false,
        restName: null,
        restLocation: null,
        restPic: null,
        bathroomRate: '1',
        cleanRate: '1',
        staffRate: '1',
        driveRate: '0',
        deliveryRate: '0',
        foodRate: '1',
        msg: null
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        writeReview: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, user } = this.props;


        if (error !== prevProps.error) {
            // Check for register error
            if (error.type === 'WRITE_REVIEW_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        if (this.state.modal) {
            if ((this.submitted === true) &&(prevProps.rests !== this.props.rests))
                this.toggle();
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
        let current_datetime = new Date();
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
        const new_review = {
            name: this.state.restName,
            location: this.state.restLocation,
            review: {
                userName: this.props.user.name,
                bathroomRate: parseInt(this.state.bathroomRate),
                cleanRate: parseInt(this.state.cleanRate),
                staffRate: parseInt(this.state.staffRate),
                driveRate: parseInt(this.state.driveRate),
                deliveryRate: parseInt(this.state.deliveryRate),
                foodRate: parseInt(this.state.foodRate),
                pic: this.state.restPic,
                date: formatted_date
            }

        };
        this.props.writeReview(new_review);
        this.submitted = true;
    };


    onPreviewDrop = (files) => {
        let reader = new FileReader();
        let file = files[0];

        reader.onloadend = () => {
            this.setState({
                restPic: reader.result
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
                restPic: reader.result
            });
        };
        reader.readAsDataURL(file)
    };

    render() {
        const previewStyle = {
            display: 'inline',
            width: '95%',
            height: '340px',
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
                <Button color='info' onClick={this.toggle}>
                    Add Review
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Write review</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='restName'> Name</Label>
                                <Input
                                    type='text'
                                    name='restName'
                                    id='restName'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='restLocation'>Location</Label>
                                <Input
                                    type='text'
                                    name='restLocation'
                                    id='restLocation'
                                    placeholder='Location'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='pic'>Picture</Label>
                                {this.state.restPic !== null &&
                                <div>
                                    <Fragment>
                                        <img
                                            alt="Preview"
                                            src={this.state.restPic}
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
                                <Label for="bathroomRate">Bathroom Quality</Label>
                                <Input type="select" name="bathroomRate" id="bathroomRate" onChange={this.onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                <Label for="cleanRate">Cleanliness</Label>
                                <Input type="select" name="cleanRate" id="cleanRate" onChange={this.onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                <Label for="staffRate">Staff Kindness</Label>
                                <Input type="select" name="staffRate" id="staffRate" onChange={this.onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                <Label for="driveRate">Drive-thru quality</Label>
                                <Input type="select" name="driveRate" id="driveRate" onChange={this.onChange}>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                <Label for="deliveryRate">Delivery Speed</Label>
                                <Input type="select" name="deliveryRate" id="deliveryRate" onChange={this.onChange}>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                <Label for="foodRate">Food Quality</Label>
                                <Input type="select" name="foodRate" id="foodRate" onChange={this.onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>

                                <Button color='info' style={{ marginTop: '2rem' }} block>
                                    Submit
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
    error: state.app.get('error'),
    user: state.app.get('user'),
    rests: state.rests

});

export default connect(
    mapStateToProps,
    { writeReview , clearErrors}
)(WriteReview);