import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import RestPage from "./RestPage";

class RestaurantsPool extends Component {

    state = {
        restaurants: this.props.restaurants
    };

    static propTypes = {
        restaurants: PropTypes.array.isRequired,
        // isAuthenticated: PropTypes.bool
    };

    componentDidUpdate(prevProps) {
        if (this.props.restaurants != prevProps.restaurants) {
            // Check for register error
            this.setState({ restaurants: this.props.restaurants });
        }
    }


    render() {
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className='restaurants-list'>
                        {this.props.restaurants.map(({ _id , name , location, average, reviews}) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <RestPage
                                        name={name}
                                        location={location}
                                        average = {average}
                                        reviews={reviews}/>
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
    restaurants: state.rests.get('restaurants')
});

export default connect(mapStateToProps, null)(RestaurantsPool);
