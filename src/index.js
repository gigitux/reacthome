/* Import react stuff */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
/* Import reducers and redux stuff */
import list_house from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
/*import Header stuff */
import NavBar from './components/navbar'
/*import Body stuff */
import ListHouse from './components/listhouse';
import AddButton from './components/addbutton';

const reducers = {
  list_house: list_house
}
const reducer = combineReducers(reducers)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(apiMiddleware),);

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
  <div>
    <ListHouse />
    <AddButton />
  </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>,
  document.getElementById('root')
);
