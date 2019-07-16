import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getRests, deleteRest} from './actions';
import PropTypes from 'prop-types';

class RestaurantsPool extends Component {
    static propTypes = {
        getRests: PropTypes.func.isRequired,
        restaurants: PropTypes.object.isRequired,
        // isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getRests();
    }

    onDeleteClick = id => {
        this.props.deleteRest(id);
    };

    render() {
        const { rests } = this.props.restaurants;
        console.log('-----------------');
        console.log('this.props.restaurants');
        console.log(this.props.restaurants);
        console.log(this.props.restaurants.restaurants, rests);
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className='restaurants-list'>
                        {this.props.restaurants.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    {name}
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
    restaurants: state.rests.get('restaurants'),
    // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getRests, deleteRest})(RestaurantsPool);
