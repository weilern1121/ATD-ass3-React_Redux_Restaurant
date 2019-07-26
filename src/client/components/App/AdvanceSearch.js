import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import {search} from './actions';
import PropTypes from 'prop-types';


class AdvanceSearch extends Component {
    state = {
        modal: false,
        restName: null,
        restLocation: null,
        score: null,
        msg: null,
        sort: '',
        currentValue: 0,
        betterCloserFlag: false,
        betterCloserScore: 1
    };

    static propTypes = {
        search: PropTypes.func.isRequired
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        //reset the error message when closing the search modal
        if (!this.state.modal) {
            this.setState({
                msg: null,
                betterCloserFlag: false
            });
        }
    };

    onSubmit = e => {
        e.preventDefault();
        let userLocation = '';
        //validation checks
        if (this.props.isConnected)
            userLocation = this.props.user.location;
        if (!this.props.isConnected && this.state.betterCloserFlag === true) {
            this.setState({msg: "Need to be logged in for 'closer-better' option."});
            return;
        }
        if (this.state.currentValue === 0) {
            this.setState({msg: "Need to insert value to 'closer-better' option."});
            return;
        }
        if (this.state.betterCloserFlag){ //if true - search by the better-closer
            if(userLocation!=="Tel-Aviv" &&userLocation!=='Jerusalem' &&userLocation!=='Beer Sheva' &&
                userLocation!=='Haifa' && userLocation!=='Herzliya'){ //city check
                this.setState({msg: "current location is not recognized."});
                return;
            }
            const {currentValue, betterCloserFlag, betterCloserScore} = this.state;
            this.props.search({userLocation, currentValue, betterCloserFlag ,betterCloserScore});
        }

        else{//else- regular search
            const {restName, restLocation, score, sort, betterCloserFlag} = this.state;
            this.props.search({restName, restLocation, score, userLocation, sort, betterCloserFlag});

        }
        //clear search
        this.toggle();
        this.setState({
            modal: false,
            restName: null,
            restLocation: null,
            score: null,
            msg: null,
            sort: '',
            betterCloserFlag: false,
            betterCloserScore: 1
        });
    };

    toggle2 = () => {
        this.setState({
            betterCloserFlag: !this.state.betterCloserFlag
        });
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    changeRange = e => {
        this.setState({currentValue: e.target.value});
    };


    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Advance Search
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

                                <FormGroup check>
                                    <Label>
                                        <Input type="checkbox"
                                               value={'betterCloserFlag'}
                                               onChange={this.toggle2}/>
                                        Better/Closer

                                        <input type="range"
                                               className="custom-range"
                                               id="customRange1"
                                               disabled={!this.state.betterCloserFlag}
                                               value={this.state.currentValue}
                                               step={10}
                                               min={-100}
                                               max={100}
                                               onChange={this.changeRange}
                                        />
                                        {this.state.currentValue > 0 ? `Closer: ${100 - this.state.currentValue}% , Better: ${this.state.currentValue}%` : null}
                                        {this.state.currentValue < 0 ? `Closer: ${-1 * this.state.currentValue}% , Better: ${(100 - ((-1) * this.state.currentValue))}%` : null}
                                        {this.state.currentValue === 0 ? `Closer: 0% , Better: 0%` : null}
                                    </Label>

                                    <Label> Calculated better-closer Score
                                        <Input type="select" name="betterCloserScore" id="betterCloserScore"
                                               onChange={this.onChange}
                                               disabled={!this.state.betterCloserFlag}>
                                            <option>>1</option>
                                            <option>>2</option>
                                            <option>>3</option>
                                            <option>>4</option>
                                        </Input>
                                    </Label>
                                </FormGroup>

                                <Button color='dark' type="button" onClick={this.onSubmit} style={{marginTop: '2rem'}}
                                        block>
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
    mapStateToProps,
    {search}
)(AdvanceSearch);
