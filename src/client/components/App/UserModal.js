import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ListGroup,
    Container,
    ListGroupItem,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchUserClear } from './actions';
import CSSTransition from "react-transition-group/esm/CSSTransition";
import TransitionGroup from "react-transition-group/esm/TransitionGroup";
import UserReviews from "./UserReviews";

class UserModal extends Component {
    state = {
        modal: true,
        name: null,
        location: null,
        submitted: false,
        msg: null
    };

    static propTypes = {
        searchUserClear: PropTypes.func.isRequired,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.props.searchUserClear();
    };

    render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
        };
        if(this.props.users.length === 0)
            this.state.msg = "User Not Found";
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>User Search Results</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}

                        <Container>
                            <ListGroup>
                                <TransitionGroup className='users-list'>
                                    {this.props.users.map((user) => (
                                        <CSSTransition key={user._id} timeout={500} classNames='fade'>
                                            <ListGroupItem>
                                                <div>
                                                <img
                                                    alt="Preview"
                                                    src={user.pic}
                                                    style={previewStyle}
                                                />
                                                </div>
                                                <h5>{user.name}</h5>
                                                <h6>location: {user.location}</h6>
                                                <UserReviews name={user.name}/>
                                            </ListGroupItem>
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                            </ListGroup>
                        </Container>

                    </ModalBody>

                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        users: state['app'].get('user_search_result')
    }
};


export default connect(
    mapStateToProps,
    { searchUserClear }
)(UserModal);