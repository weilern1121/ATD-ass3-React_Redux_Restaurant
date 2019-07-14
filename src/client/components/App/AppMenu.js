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
// import LoginModal from './auth/LoginModal';
// import Logout from './auth/Logout';

class AppMenu extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        session: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isConnected, user } = this.props.session;

        const userLinks = (
            <Fragment>
                <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Hello ${user.name}` : ''}</strong>
          </span>
                </NavItem>
                <NavItem>
                    {/*<Logout />*/}
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Search/>
                </NavItem>
                <NavItem>
                    <Register />
                </NavItem>
                <span className='navbar-text mr-3'>
                    <strong>|</strong>
                </span>
                <NavItem>
                    {/*<LoginModal />*/}
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
                                {isConnected ? userLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    session: state.app
});

export default connect(
    mapStateToProps,
    null
)(AppMenu);
