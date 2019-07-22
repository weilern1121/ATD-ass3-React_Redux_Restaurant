import React from 'react';
import './App.scss';
import AppMenu from './AppMenu';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantsPool from "../Restaurants/RestaurantsPool";
import UserModal from "./UserModal";
import WriteReview from "./WriteReview";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {

    componentDidUpdate(prevProps) {
        const {user_search_result} = this.props;
        if (user_search_result !== prevProps.user_search_result) {
            this.setState({user_search_result: user_search_result})
        }
    }

  render() {
      const {user_search_result} = this.props;
      const previewStyle = {
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline',
          width: '80%',
          height: '80%',
          position: 'relative',
          textAlign: 'center',
          borderWidth: '2px',
          borderRadius: '5px',
          marginTop: '0.6rem'
      };
      return (
              <div className='App'>
                  <AppMenu />

                      <Container>
                          {this.props.isConnected === true && <WriteReview/>}
                          {(this.props.isConnected === true || user_search_result != null || this.props.restsSearch.length !==0) ? null :<img src={require(`../../../../public/pictures/homePhoto.JPG`)} alt="homepic" style={previewStyle}/>}
                          <RestaurantsPool />
                          {user_search_result != null && <UserModal/>}
                      </Container>
              </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {
      user_search_result: state['app'].get('user_search_result'),
      user: state.app.get('user'),
      isConnected: state.app.get('isConnected'),
      restsSearch: state['rests'].get('restaurants')
  }
};

export default connect(mapStateToProps, null)(App);
