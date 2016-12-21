import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
/* Import reducers and redux stuff */
import list_house from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
/*import Header stuff */
import NavBar from './components/navbar'
/*import Body stuff */
import ListHouse from './components/listhouse';


const reducers = {
  list_house: list_house
}
const reducer = combineReducers(reducers)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/*Header */
const Header = () => (
  <MuiThemeProvider>
    <NavBar />
  </MuiThemeProvider>
)

ReactDOM.render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById('header')
)

/* Body */
const App = () => (
  <MuiThemeProvider>
    <ListHouse />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>,
  document.getElementById('root')
);
