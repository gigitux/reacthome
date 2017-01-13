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
import { Router, Route, browserHistory } from 'react-router';

/*import Header stuff */
import NavBar from './components/navbar'
/*import Body stuff */
import ListHouse from './components/listhouse';
import AddButton from './components/addbutton';
import Error404 from './components/error404';

const reducers = {
  list_house: list_house
}
const reducer = combineReducers(reducers)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(apiMiddleware),);

const Routes = (props) => (
  console.log("ci sto dentro"),
  <MuiThemeProvider>
  <Router { ...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={AddButton} />
    <Route path="*" component={Error404} />
  </Router>
  </MuiThemeProvider>
);

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
  <div>
    <ListHouse />
    <AddButton />
  </div>
);


ReactDOM.render(
  <Provider store={store}>
  <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
