import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Register from './Register';
import Search from './Search';
import AdvanceSearch from './AdvanceSearch';
import Login from './Login';
import Profile from './Profile';
// import LoginModal from './auth/LoginModal';
// import Logout from './auth/Logout';

class AppMenu extends Component {
    state = {
        isOpen: false
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

    render() {
        // const { isConnected, user } = this.props.session;
        const userLinks = (
            <Fragment>
                <NavItem>
          <span className='navbar-text mr-3'>
              {this.props.user ? ` Hello ${this.props.user.name}` : ''}
          </span>
                </NavItem>
                <NavItem>
                    <Profile />
                </NavItem>
                <NavItem>
                    {/*<Logout />*/}
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
                                <NavItem>
                                    <AdvanceSearch/>
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
    null
)(AppMenu);
