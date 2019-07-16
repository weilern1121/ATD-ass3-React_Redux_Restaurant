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
import { search } from './actions';

class AdvanceSearch extends Component {
    state = {
        modal: false,
        restName: null,
        restLocation: null,
        score: null,
        msg: null
    };

    static propTypes = {
        // user: PropTypes.object.isRequired,
        // error: PropTypes.object.isRequired,
        // editUser: PropTypes.func.isRequired,
        // clearErrors: PropTypes.func.isRequired
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

        const { restName, restLocation, score } = this.state;
        console.log('SEARCH on submit ', { restName, restLocation, score }, this.state);

        this.props.search({restName , restLocation, score});
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    advance search
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Advance Search</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='restName'>Restaurant Name</Label>
                                <Input
                                    type='text'
                                    name='restName'
                                    id='restName'
                                    placeholder='(*optional*)'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='restLocation'>Restaurant Location</Label>
                                <Input
                                    type='text'
                                    name='restLocation'
                                    id='restLocation'
                                    placeholder='(*optional*)'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for="score">Score</Label>
                                <Input type="select" name="score" id="score" onChange={this.onChange}>
                                    <option>>1</option>
                                    <option>>2</option>
                                    <option>>3</option>
                                    <option>>4</option>
                                </Input>
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Search
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     error: state.app.get('error'),
//     user: state.app.get('user')
// });

export default connect(
    null,
    { search }
)(AdvanceSearch);