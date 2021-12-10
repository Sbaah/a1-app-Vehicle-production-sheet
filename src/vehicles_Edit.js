//  Sefa Baah - Acheamphour student#: 015381130
// ################################################################################
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css';

class vehicleEdit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties

  state = {
    vehicle: {},
    car_Make: '',
    car_Model: '',
    car_Year: '',
    car_Vin: '',
    car_Msrp: 0,
    car_Photo: '',
    purchase_Date: '',
    purchasers_Name: '',
    purchasers_Email: '',
    price_Paid: 0,
    httpStatusCode: 0,
    httpStatusOk: false,
  };

  url = `https://web-app-vehicle.herokuapp.com/api/vehicle/${this.props.id}`;

  handleChange(e) {
    // Same as the "add one" use case
    this.setState({ [e.target.name]: e.target.value });

    // Can also do data validation in here
  }

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
        // console.log(responseData.data);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  handleSubmit(e) {
    // For coding convenience
    const newVehicle = {
      // `_id`: this.state.person._id,
      car_Make: this.state.car_Make,
      car_Model: this.state.car_Model,
      car_Year: this.state.car_Year,
      car_Vin: this.state.car_Vin,
      car_Msrp: this.state.car_Msrp,
      car_Photo: this.state.car_Photo,
      purchase_Date: this.state.purchase_Date,
      purchasers_Name: this.state.purchasers_Name,
      purchasers_Email: this.state.purchasers_Email,
      price_Paid: this.state.price_Paid,
    };

    // Edit existing
    fetch(this.url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVehicle),
    })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an object
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/vehicle/details/${this.props.id}`);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `Vehicle ID:  ${this.props.id} edit`;

    // Determine the button state
    const isDisabled =
      this.state.purchase_Date.length === 0 ||
      this.state.purchasers_Name.length === 0 ||
      this.state.purchasers_Email.length === 0 ||
      this.state.price_Paid.length === 0;

    // For coding convenience, create a shortcut object
    const u = this.state.vehicle;
    console.log(this.state);

    // If "this.input" exists (it will only get rendered if a form exists), set its focus
    if (
      this.input &&
      this.state.purchasers_Name.length === 0 &&
      this.state.purchase_Date.length === 0
    ) {
      this.input.focus();
    }

    return (
      <div>
        <h4>
          Edit Vehicle " {u.car_Make}, {u.car_Model}, {u.car_Year} " from the
          Web service
        </h4>

        {this.state.httpStatusOk ? (
          <div className='form-horizontal'>
            <p>Edit person data, and click/tap the "Save" button</p>
            <hr />
            <div className='form-group'>
              <label htmlFor='car_Make' className='control-label col-md-2'>
                Car Make
              </label>
              <div className='col-md-6'>
                <input
                  name='car_Make'
                  required
                  defaultValue={u.car_Make}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='car_Model' className='control-label col-md-2'>
                Car Model
              </label>
              <div className='col-md-6'>
                <input
                  name='car_Model'
                  required
                  defaultValue={u.car_Model}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='car_Year' className='control-label col-md-2'>
                Car Year
              </label>
              <div className='col-md-6'>
                <input
                  name='car_Year'
                  required
                  defaultValue={u.car_Year}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='car_Vin' className='control-label col-md-2'>
                Car Vin
              </label>
              <div className='col-md-6'>
                <input
                  name='car_Vin'
                  required
                  defaultValue={u.car_Vin}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='car_Msrp' className='control-label col-md-2'>
                Car Msrp
              </label>
              <div className='col-md-6'>
                <input
                  name='car_Msrp'
                  required
                  defaultValue={u.car_Msrp}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='car_Photo' className='control-label col-md-2'>
                Car Photo
              </label>
              <div className='col-md-6'>
                <input
                  name='car_Photo'
                  required
                  defaultValue={u.car_Photo}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='purchase_Date' className='control-label col-md-2'>
                Purchase Date
              </label>
              <div className='col-md-6'>
                <input
                  name='purchase_Date'
                  required
                  defaultValue={u.purchase_Date}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label
                htmlFor='purchasers_Name'
                className='control-label col-md-2'
              >
                Purchaser's Name
              </label>
              <div className='col-md-6'>
                <input
                  name='purchasers_Name'
                  required
                  defaultValue={u.purchasers_Name}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label
                htmlFor='purchasers_Email'
                className='control-label col-md-2'
              >
                Purchaser's Email
              </label>
              <div className='col-md-6'>
                <input
                  name='purchasers_Email'
                  required
                  defaultValue={u.purchasers_Email}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='price_Paid' className='control-label col-md-2'>
                Price Paid
              </label>
              <div className='col-md-6'>
                <input
                  name='price_Paid'
                  required
                  defaultValue={u.price_Paid}
                  className='form-control'
                  onChange={this.handleChange}
                />
              </div>

              <div className='form-group'>
                <div className='col-md-offset-2 col-md-6'>
                  <button
                    disabled={isDisabled}
                    onClick={this.handleSubmit}
                    className='btn btn-primary'
                  >
                    Save
                  </button>
                  &nbsp;&nbsp;
                  <Link className='btn btn-default' to='/vehicles'>
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              Requested vehicle with identifier {this.props.id} was not found
            </p>
            <hr />
            <p>
              <Link className='btn btn-default' to='/vehicles'>
                Show list of vehicles
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(vehicleEdit);
