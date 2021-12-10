//  Sefa Baah - Acheamphour student#: 015381130
// ################################################################################
import React from 'react';
// import logo from "./logo.svg";
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import VehicleList from './vehicles_GetAll';
import VehicleDetails from './vehicles_GetOne';
import VehicleEdit from './vehicles_Edit';
import VehicleAddNew from './vehicles_AddNew';
import VehicleDelete from './vehicles_Delete';
function App() {
  return (
    <div className='App'>
      <Header />
      {/* <header className="App-header"></header> */}
      <Navbar className='navbar navbar-default' />
      <hr />
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/vehicles' render={() => <VehicleList />} />
        <Route exact path='/addNew' render={() => <VehicleAddNew />} />
        <Route
          exact
          path='/vehicle/details/:id'
          render={(props) => <VehicleDetails id={props.match.params.id} />}
        />
        <Route
          exact
          path='/vehicle/edit/:id'
          render={(props) => <VehicleEdit id={props.match.params.id} />}
        />
        <Route
          exact
          path='/vehicle/delete/:id'
          render={(props) => <VehicleDelete id={props.match.params.id} />}
        />
        <Route render={() => <NotFound />} />
      </Switch>
      <p>&nbsp;</p>
      <hr />
      <footer>
        <p>&copy; 2020, Sefa Baah - Acheamphour BTI 425 Seneca College </p>
      </footer>
    </div>
  );
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className='header'>
      <div className='row'>
        <h2>Assignment 1</h2>
        <p>Create a simple Vehicle product sheet</p>
      </div>
    </div>
  );
};

// Function component for the navigation bar
const Navbar = () => {
  return (
    <div className='container-fluid navbar-outline'>
      <div className='navbar-header'>
        <Link to='/' className='navbar-brand'>
          Home page
        </Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/vehicles'>VehicleList</Link>
          </li>
          <li>
            <Link to='/addNew'> Add a Vehicle</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Function component for a content area
const Home = () => {
  return (
    <div>
      <p>This is the home page of the app.</p>
      <p>Click or tap an item on the nav menu.</p>
      <p>
        {' '}
        The Basic Premiss is to create a Vehicle production sheet Which Allow
        for CRUD Applications/Functionalities.{' '}
      </p>
      <p>&nbsp;</p>
    </div>
  );
};

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
};
