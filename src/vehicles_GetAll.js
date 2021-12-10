//  Sefa Baah - Acheamphour student#: 015381130
// ################################################################################
import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './App.css';

class vehicleList extends Component {
  state = { vehicles: [] };
  url = 'https://web-app-vehicle.herokuapp.com/api/vehicles';

  componentDidMount() {
    // Get one
    fetch(this.url)
      .then((response) => {
        // Optional...
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok,
        });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found
          throw Error('HTTP 404, Not found');
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState({ vehicles: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }
  render() {
    document.title = 'Vehicles list';

    return (
      <div>
        <h4>List of Vehicles, from the deployed web service</h4>
        <p>
          <Link className='btn btn-default' to='/addNew'>
            Add a new vehicle information
          </Link>
        </p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody vehicles={this.state.vehicles} />
        </table>
      </div>
    );
  }
}
export default vehicleList;

// Function component, table header
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Car Make</th>
        <th>Car Model</th>
        <th>Car Year</th>
        <th>Car Vin</th>
        <th>Car Msrp</th>
        {/* <th>Car Photo</th> */}
        <th>Purchase Date</th>
        <th>Purchaser's Name</th>
        {/* <th>Purchaser's Email</th> */}
        {/* <th>Price Paid</th> */}
        <th></th>
      </tr>
    </thead>
  );
};
const TableBody = (props) => {
  // Using the array of objects, create a new array of React elements
  let rows = props.vehicles.map((vehicle, index) => {
    return <TableRow vehicle={vehicle} key={index} />;
  });
  return <tbody>{rows}</tbody>;
};
const TableRow = (props) => {
  const u = props.vehicle;
  // Render the row
  return (
    <tr>
      <td> {u.car_Make} </td>
      <td> {u.car_Model} </td>
      <td> {u.car_Year} </td>
      <td> {u.car_Vin} </td>
      <td> {u.car_Msrp} </td>
      {/* <td>{u.car_Photo}</td> */}
      <td>
        {' '}
        <Moment format='YYYY-MM-DD'>{u.purchase_Date} </Moment>
      </td>
      <td> {u.purchasers_Name} </td>
      {/* <td>{u.purchasers_Email}</td> */}
      {/* <td> $ {u.price_Paid} </td> */}

      <td>
        <Link className='btn btn-default' to={`/vehicle/details/${u._id}`}>
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className='btn btn-warning' to={`/vehicle/edit/${u._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className='btn btn-danger' to={`/vehicle/delete/${u._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
};
