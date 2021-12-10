//  Sefa Baah - Acheamphour student#: 015381130
// ################################################################################
import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import './App.css';

class vehicleDelete extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { vehicle: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://web-app-vehicle.herokuapp.com/api/vehicle/${this.props.id}`;

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
        this.setState({ vehicle: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  handleSubmit(e) {
    // Delete
    fetch(this.url, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // Redirect
        //this.props.history.push('/persons');
        this.props.history.push('/vehicles');
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `Vehicle ID: "${this.props.id}" details`;

    // For coding convenience, create a shortcut object
    const u = this.state.vehicle;
    console.log(this.state);
    return (
      <div>
        <h4>
          Delete "{u.car_Make}, {u.car_Model}, {u.car_Year}" from the deployed
          web service?
        </h4>

        {this.state.httpStatusOk ? (
          <div className='row'>
            <div className='col-md-3'>
              <dl className='dl-horizontal'>
                <dt>Car Make</dt>
                <dd>{u.car_Make}</dd>
                <dt>Car Model</dt>
                <dd>{u.car_Model}</dd>
                <dt>Car Year</dt>
                <dd>{u.car_Year}</dd>
                <dt>Car Vin</dt>
                <dd>{u.car_Vin}</dd>
                <dt>Car Msrp</dt>
                <dd>{u.car_Msrp}</dd>
                <dt>Car Photo</dt>
                <dd>
                  {' '}
                  <a href={u.car_Photo}> Image</a>{' '}
                </dd>
                <dt>Purchase Date</dt>
                <dd>
                  {' '}
                  <Moment format='YYYY-MM-DD'>{u.purchase_Date} </Moment>
                </dd>
                <dt>Purchaser's Name</dt>
                <dd>{u.purchasers_Name}</dd>
                <dt>Purchaser's Email</dt>
                <dd>{u.purchasers_Email}</dd>
                <dt>Price Paid</dt>
                <dd>
                  <td> ${u.price_Paid} </td>
                </dd>
              </dl>
            </div>
          </div>
        ) : (
          <p>Requested person was not found</p>
        )}
        <hr />
        <p>
          Confirm that this person should be deleted, or cancel to return to the
          list of persons
        </p>
        <p>
          <button onClick={this.handleSubmit} className='btn btn-danger'>
            Confirm delete
          </button>
          &nbsp;&nbsp;
          <Link className='btn btn-default' to='/vehicles'>
            Cancel
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(vehicleDelete);
