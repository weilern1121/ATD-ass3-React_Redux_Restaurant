import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getReviews, deleteReview} from './actions';
import PropTypes from 'prop-types';
import Review from "../Review/Review";
import SortOptions from "./SortOptions";

class ReviewsPage extends Component {
    static propTypes = {
        getReviews: PropTypes.func.isRequired,
        reviews: PropTypes.object.isRequired,
        // isAuthenticated: PropTypes.bool


    };


    componentDidMount() {
        console.log('getReviewsByRest', this.props.restName);
        this.props.getReviews({restName:this.props.restName});
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.reviews !== this.props.reviews)
    //         this.props.getReviews();
    // }


    onDeleteClick = id => {
        this.props.deleteReview(id);
    };


    render() {
        // const { rests } = this.props.reviews;
        // console.log('-----------------');
        // console.log(this.props.reviews.reviews, rests);
        return (
            <Container>
                <SortOptions />
                <ListGroup>
                    <TransitionGroup className='restaurants-list'>
                        {this.props.reviews.map((
                            {
                                userName, restName, restLocation, bathroomRate, cleanRate,
                                staffRate, driveRate, deliveryRate, foodRate, pic, date
                            }) => (
                            <CSSTransition key={date} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <Review
                                        userName={userName}
                                        restName={restName}
                                        restLocation={restLocation}
                                        bathroomRate={bathroomRate}
                                        cleanRate={cleanRate}
                                        staffRate={staffRate}
                                        driveRate={driveRate}
                                        deliveryRate={deliveryRate}
                                        foodRate={foodRate}
                                        pic={pic}
                                        date={date}

                                    />
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }

}

const mapStateToProps = state => ({
    reviews: state.reviewsPage.get('reviews'),

    // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getReviews, deleteReview})(ReviewsPage);
