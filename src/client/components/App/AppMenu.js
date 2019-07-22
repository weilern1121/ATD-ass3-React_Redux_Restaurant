import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Image,
    Container,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Register from './Register';
import Search from './Search';
import Login from './Login';
import Profile from './Profile';
import {logOut} from "./actions";


class AppMenu extends Component {
    state = {
        isOpen: false,
        dropdownOpen: false
    };

    static propTypes = {
        isConnected: PropTypes.bool.isRequired,
        user: PropTypes.object
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });

    };

    logOut = () =>{
        this.props.logOut();
    };


    render() {
        const avatarStyle = {
            display: 'inline',
            width: "40px",
            height: "40px",
        };

        // const { isConnected, user } = this.props.session;
        const userLinks = (
            <Fragment>

              {this.props.user !== null &&
                  (<NavItem>
                      <img
                          alt="Preview"
                          src={this.props.user.pic}
                          style={avatarStyle}
                      />
                  </NavItem>)}
                  <NavItem>
                      <span className='navbar-text mr-3'>
                          {this.props.user ? ` Hello ${this.props.user.name}` : ''}
                      </span>
                  </NavItem>
                <NavItem>
                    <Profile />
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.logOut} href='#'>
                        Logout
                    </NavLink>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Register/>
                </NavItem>
                {/*<span className='navbar-text mr-3'>*/}
                    {/*<strong>|</strong>*/}
                {/*</span>*/}
                <NavItem>
                    <Login/>
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color='dark' dark expand='sm' className='mb-5'>
                    <Container>
                        <NavbarBrand href='/'>W&K Restaurants Reviews </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Search/>
                                </NavItem>
                                <span className='navbar-text mr-3'>
                                <strong>|</strong>
                                </span>
                                {this.props.isConnected ? userLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.app.get('isConnected'),
    user: state.app.get('user')
});

export default connect(
    mapStateToProps,
    {logOut}
)(AppMenu);
