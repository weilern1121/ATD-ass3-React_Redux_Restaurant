import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Button,
    CardBody,
    Card,
    Table,
    Alert, Form, FormGroup, Label, Input,

} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReactDropzone from "react-dropzone";
import {editReview, deleteReview} from "./actions";
import ErrorBoundary from "../App/ErrorBoundary";

class Review extends Component {
    constructor(props) {
        super(props);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state = {
            collapse1: false,
            collapse2: false,
            modal: false,
            //fields of the review
            userName: this.props.userName,
            bathroomRate: this.props.bathroomRate,
            cleanRate: this.props.cleanRate,
            staffRate: this.props.staffRate,
            driveRate: this.props.driveRate,
            deliveryRate: this.props.deliveryRate,
            foodRate: this.props.foodRate,
            pic: this.props.pic,
            date: this.props.date,
            _id: this.props._id,
            newBathroomRate: 1,
            newCleanRate: 1,
            newStaffRate: 1,
            newDriveRate: 0,
            newDeliveryRate: 0,
            newFoodRate: 1,
            newPic: this.props.pic

        };
    }

    static propTypes = {
        isConnected: PropTypes.bool.isRequired,
        user: PropTypes.object
    };

    toggle1() {
        this.setState(state => ({
            collapse1: !state.collapse1,
            collapse2: false
        }));
    }

    toggle2() {
        this.setState(state => ({
            collapse1: false,
            collapse2: !state.collapse2
        }));
    }

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

    onSubmit = e => {
        e.preventDefault();
        let current_datetime = new Date();
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
        const new_review = {
            name: this.props.restName,
            location: this.props.restLocation,
            review: {
                _id: this.state._id,
                userName: this.props.user.name,
                bathroomRate: parseInt(this.state.newBathroomRate),
                cleanRate: parseInt(this.state.newCleanRate),
                staffRate: parseInt(this.state.newStaffRate),
                driveRate: parseInt(this.state.newDriveRate),
                deliveryRate: parseInt(this.state.newDeliveryRate),
                foodRate: parseInt(this.state.newFoodRate),
                pic: this.state.newPic,
                date: formatted_date
            }

        };
        this.props.editReview(new_review);
        this.submitted = true;
        this.toggle1();
    };


    roundUpFrac(num) {
        num = num * 10;
        num = Math.trunc(num);
        return num / 10;
    }

    getAvg() {
        const a = this.props.bathroomRate;
        const b = this.props.staffRate;
        const c = this.props.cleanRate;
        const d = this.props.foodRate;
        const e = this.props.driveRate;
        const f = this.props.deliveryRate;
        if (f !== 0 && e !== 0)
            return this.roundUpFrac((a + b + c + d + e + f) / 6);
        if (e !== 0)
            return this.roundUpFrac((a + b + c + d + e) / 5);
        if (f !== 0)
            return this.roundUpFrac((a + b + c + d + f) / 5);
        return this.roundUpFrac((a + b + c + d) / 4);
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onClickDelete = e => {
        const del_review = {
            name: this.props.restName,
            location: this.props.restLocation,
            _id: this.state._id

        };
        this.props.deleteReview(del_review);
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

    componentDidUpdate(prevProps) {
        const {error, user} = this.props;


        if (error !== prevProps.error) {
            // Check for register error
            if (error.type === 'WRITE_REVIEW_FAIL') {
                this.setState({msg: error.msg});
            } else {
                this.setState({msg: null});
            }
        }
        if (this.state.modal) {
            if (this.state.newName === user.name
                && this.state.newLocation === user.location
                && this.state.newPic === user.pic
                && this.submitted === true) {
                this.submitted = false;
                this.state.newName = '';
                this.state.newLocation = '';
                this.state.newPic = '';
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

    dateFormatted() {
        const tmp = new Date(this.props.date);
        const a=tmp.getFullYear();
        const b=tmp.getMonth();
        const c=tmp.getDate();
        return c+'-'+b+'-'+a;
    }


    render() {

        const editButton = (
            <Button className="float-right" color="dark" onClick={this.toggle2} style={{marginBottom: '1rem'}}
                    size="sm">
                Edit</Button>
        );

        const deleteButton = (
            <Button className="float-right" color="dark" onClick={this.onClickDelete} style={{marginBottom: '1rem'}}
                    size="sm">
                Delete</Button>
        );

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
            marginTop: '0.6rem'

        };

        // let avg = this.getAvg();
        let newDate = this.dateFormatted();

        return (
            <ErrorBoundary>
            <div>
                {this.props.userName} : {this.getAvg()}
                <Button className="float-right" color="dark" onClick={this.toggle1} style={{marginBottom: '1rem'}}
                        size="sm">
                    details</Button>
                {(this.props.user && this.props.user.name === this.props.userName) ? editButton : ''}
                {(this.props.user && this.props.user.name === this.props.userName) ? deleteButton : ''}
                <Collapse isOpen={this.state.collapse1}>
                    <Card>
                        <CardBody>
                            <Table hover tag="a">
                                <tbody >
                                <tr >
                                    <td>User Name</td>
                                    <td>{this.props.userName}</td>
                                </tr>
                                <tr>
                                    <td>Food Rate</td>
                                    <td>{this.props.foodRate}</td>
                                </tr>
                                <tr>
                                    <td>Bathroom Rate</td>
                                    <td>{this.props.bathroomRate}</td>
                                </tr>
                                <tr>
                                    <td>Clean Rate</td>
                                    <td>{this.props.cleanRate}</td>
                                </tr>
                                <tr>
                                    <td>Staff Rate</td>
                                    <td>{this.props.staffRate}</td>
                                </tr>
                                <tr>
                                    <td>Drive Rate</td>
                                    <td>{this.props.driveRate}</td>
                                </tr>
                                <tr>
                                    <td>Delivery Rate</td>
                                    <td>{this.props.deliveryRate}</td>
                                </tr>
                                <tr>
                                    <td>Review Date</td>
                                    <td>{newDate}</td>
                                </tr>
                                <tr>
                                    <td>Pic</td>
                                    <div>
                                        <Fragment>
                                            {this.state.newPic ?
                                                <img
                                                    alt="Preview"
                                                    src={this.state.newPic}
                                                    style={previewStyle}
                                                />
                                                :
                                                null
                                            }
                                        </Fragment>
                                    </div>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Collapse>


                <Collapse isOpen={this.props.user && this.state.collapse2}>
                    <Card>
                        <CardBody>

                            {this.state.msg ? (
                                <Alert color='danger'>{this.state.msg}</Alert>
                            ) : null}
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="name" className="mr-sm-2">User name</Label>
                                    <Input type="userName" label={this.props.user ? this.props.user : null}
                                           id="name" disabled/>
                                    <Label for="newBathroomRate">Bathroom Quality</Label>
                                    <Input type="select" name="newBathroomRate" id="newBathroomRate"
                                           onChange={this.onChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>

                                    <Label for="newCleanRate">Cleanliness</Label>
                                    <Input type="select" name="newCleanRate" id="newCleanRate"
                                           onChange={this.onChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                    <Label for="newStaffRate">Staff Kindness</Label>
                                    <Input type="select" name="newStaffRate" id="newStaffRate"
                                           onChange={this.onChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                    <Label for="newDriveRate">Drive-thru quality</Label>
                                    <Input type="select" name="newDriveRate" id="newDriveRate"
                                           onChange={this.onChange}>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                    <Label for="newDeliveryRate">Delivery Speed</Label>
                                    <Input type="select" name="newDeliveryRate" id="newDeliveryRate"
                                           onChange={this.onChange}>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                    <Label for="newFoodRate">Food Quality</Label>
                                    <Input type="select" name="newFoodRate" id="newFoodRate"
                                           onChange={this.onChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>

                                    <Label for='pic'>Picture</Label>
                                    <div>
                                        <Fragment>
                                            {this.state.newPic ?
                                                <img
                                                    alt="Preview"
                                                    src={this.state.newPic}
                                                    style={previewStyle}
                                                />
                                                :
                                                null}
                                        </Fragment>
                                    </div>
                                    <ReactDropzone accept="image/*" style={{borderStyle: 'dashed'}}
                                                   onDrop={this.onPreviewDrop}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="container">
                                                <div
                                                    style={dropStyle} {...getRootProps({className: 'dropzone'})}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop picture</p>
                                                </div>
                                            </section>
                                        )}
                                    </ReactDropzone>
                                    <Input style={{marginTop: '1rem'}}
                                           type='file'
                                           name='pic'
                                           id='pic'
                                           placeholder='Picture'
                                           className='mb-3'
                                           onChange={this.onChangePicture}
                                    />
                                </FormGroup>

                                <Button color='info' style={{marginTop: '2rem'}} block>Submit</Button>
                            </Form>

                        </CardBody>
                    </Card>
                </Collapse>

            </div>
            </ErrorBoundary>
        );
    }
}


const mapStateToProps = state => ({
    isConnected: state.app.get('isConnected'),
    user: state.app.get('user')
});

// export default connect(mapStateToProps)(Review);

export default connect(
    mapStateToProps,
    {editReview, deleteReview}
)(Review);
// export default Review;
