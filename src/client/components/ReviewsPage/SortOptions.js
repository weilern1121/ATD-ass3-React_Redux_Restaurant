import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button, Collapse} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getReviews, deleteReview, sortByNewest} from './actions';
import PropTypes from 'prop-types';
import Review from "../Review/Review";
import {
    Label,
    Input,
    ButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';

class SortOptions extends Component {
    static propTypes = {
        getReviews: PropTypes.func.isRequired,
        reviews: PropTypes.object.isRequired,
        // isAuthenticated: PropTypes.bool


    };

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onSortFunc () {
        console.log("QWEQWE");
        let e = document.getElementById("ddlViewBy");
        let strUser = e.options[e.selectedIndex].value;
        switch (strUser) {
            case "1":
                // this.props.sortByNewest();
                console.log(1);
                break;
        }
    };

    sortNewest(){
        console.log("sortNewest");
    }
    sortOldest(){
        console.log("sortOldest");
    }


    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                <DropdownToggle caret>
                    Sort
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.sortNewest}>newest</DropdownItem>
                    <DropdownItem onClick={this.sortOldest}>oldest</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>

        );
    }

}


const mapStateToProps = state => ({
    reviews: state.reviewsPage.get('reviews'),
    // isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {getReviews, deleteReview})(SortOptions);
