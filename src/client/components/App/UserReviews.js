import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ListGroupItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getReviewsByUser} from "../ReviewsPage/actions";
import ReviewsPage from "./../ReviewsPage/ReviewsPage";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class UserReviews extends Component {
    state = {
        modal: false,
        user_reviews: []
    };

    componentDidMount() {
        this.props.getReviewsByUser({name: this.props.name});
        const my_reviews = this.props.user_reviews.get(this.props.name);
        if(my_reviews)
            this.setState({user_reviews: my_reviews});
    }

    componentDidUpdate(prevProps) {
        const {user_reviews} = this.props;
        const my_reviews = this.props.user_reviews.get(this.props.name);
        if (my_reviews && (this.state.user_reviews !== my_reviews))  {

            this.setState({user_reviews: my_reviews});
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {

        //remove a familiar not-relevant warnings
        const realError = console.error;
        console.error = (...x) => {
            const tmp = x[0].split(" ");
            if (tmp[0] === "Warning:" && tmp[1] === "Each" && tmp[2] === "child" && tmp[5] === "list"&& tmp[9] === "unique") {
                return;
            }
            realError(...x);
        };


        return (
            <div>
                <Button onClick={this.toggle} style={{ marginTop: '2rem' }} block>
                    View Reviews
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.name}'s Reviews</ModalHeader>
                    <ModalBody>

                        {this.state.user_reviews.map(({_id, name, location, reviews}) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <h5>{name}: </h5>
                                    <ReviewsPage
                                        reviews={reviews}
                                        restName={name}
                                        restLocation={location}
                                    />
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user_reviews: state.app.get('user_reviews')
});

export default connect(
    mapStateToProps,
    {getReviewsByUser})(UserReviews);
