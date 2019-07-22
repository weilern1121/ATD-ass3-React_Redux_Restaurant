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
import PropTypes from 'prop-types';

class AdvanceSearch extends Component {
    state = {
        modal: false,
        restName: null,
        restLocation: null,
        score: null,
        msg: null,
        sort: ''
    };

    static propTypes = {
        search: PropTypes.func.isRequired
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
        let userLocation = '';

        if(this.props.isConnected)
            userLocation = this.props.user.location;
        else if (this.state.sort === 'closer') {
            this.setState({msg:"Need to be logged in for 'closer' option."});
            return;
        }
        const { restName, restLocation, score, sort } = this.state;

        this.props.search({restName , restLocation, score, userLocation, sort});
        this.toggle();
        this.setState({
            modal: false,
            restName: null,
            restLocation: null,
            score: null,
            msg: null,
            sort: ''
        });
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
                                <Label for='sort'>Sort Results</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio"
                                               name="sort"
                                               value={'better'}
                                               onChange={this.onChange}/>
                                        Better - sort restaurants by rate.
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio"
                                               name="sort"
                                               value={'closer'}
                                               onChange={this.onChange}/>
                                        Closer - sort results by distance to your location.
                                    </Label>
                                </FormGroup>
                                <Button color='dark' type="button" onClick={this.onSubmit} style={{ marginTop: '2rem' }} block>
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

const mapStateToProps = state => ({
    user: state.app.get('user'),
    isConnected: state.app.get('isConnected')
});

export default connect(
    null,
    { search }
)(AdvanceSearch);