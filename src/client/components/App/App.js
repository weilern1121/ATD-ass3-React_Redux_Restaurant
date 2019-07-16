import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import AppMenu from './AppMenu';
import { connect } from 'react-redux';
import AppActions from './actions';
import GalleryActions from '../Gallery/actions';
import { Container } from 'reactstrap';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestPage from "../Restaurants/RestPage";

class App extends React.Component {
    componentDidMount() {
        this.props.loadTagsEventHandler();
    }

  render() {
        // console.log('tags=', this.props.tags);
      return (
              <div className='App'>
                  <AppMenu />
                  <Container>
                      <RestPage />
                      {/*<ItemModal />*/}
                      {/*<ShoppingList />*/}
                  </Container>
              </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {
      // tag: state['app'].get('tag'),
      // tags: state['app'].get('tags').toArray()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      loadTagsEventHandler: () => {
          dispatch(AppActions.loadTagsAction());
      },
    updateTagEventHandler: (e) => {
      dispatch(AppActions.updateTagAction(e.value));
    },
    loadImagesEventHandler: (tag) => {
      dispatch(GalleryActions.loadImagesAction(tag))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
