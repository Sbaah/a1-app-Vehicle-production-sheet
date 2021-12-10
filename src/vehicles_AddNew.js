//  Sefa Baah - Acheamphour student#: 015381130
// ################################################################################
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css';

class vehicleAddNew extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties

  state = {
    // vehicle: {},
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

  url = 'https://web-app-vehicle.herokuapp.com/api/vehicle';

  handleChange(e) {
    // Same as the "add one" use case
    this.setState({ [e.target.name]: e.target.value });

    // Can also do data validation in here
  }

  componentDidMount() {
    //  this.input.focus();
  }

  handleSubmit(e) {
    // For coding convenience
    const newVehicle = {
      //   _id: this.state.person._id,
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
    console.log(newVehicle);
    // Edit existing
    fetch(this.url, {
      method: 'POST',
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
        // this.props.history.push(`/vehicle/details/${responseData._id}`);
        this.props.history.push(`/vehicle/details/${responseData._id}`);
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }
  render() {
    document.title = 'Add Vehicle';

    // Determine the button state
    const is_Disabled =
      this.state.car_Make.length === 0 ||
      this.state.car_Model.length === 0 ||
      this.state.car_Year.length === 0 ||
      this.state.car_Vin.length === 0 ||
      this.state.car_Msrp.length === 0 ||
      this.state.purchase_Date.length === 0 ||
      this.state.purchasers_Name.length === 0 ||
      this.state.purchasers_Email.length === 0 ||
      this.state.price_Paid.length === 0;

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
        <h4>Add a new person to the deployed web service</h4>
        <div className='form-horizontal'>
          <p>Enter new person data, and click/tap the "Add Person" button</p>
          <hr />
          <div className='form-group'>
            <label htmlFor='car_Make' className='control-label col-md-2'>
              Car Make
            </label>
            <div className='col-md-6'>
              <input
                name='car_Make'
                required
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
                className='form-control'
                onChange={this.handleChange}
                placeholder='Number Value Required'
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
                className='form-control'
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='purchasers_Name' className='control-label col-md-2'>
              Purchaser's Name
            </label>
            <div className='col-md-6'>
              <input
                name='purchasers_Name'
                required
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
                type='email'
                required
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
                className='form-control'
                onChange={this.handleChange}
              />
            </div>

            <div className='form-group'>
              <div className='col-md-offset-2 col-md-6'>
                <button
                  disabled={is_Disabled}
                  onClick={this.handleSubmit}
                  className='btn btn-primary'
                >
                  Add Vehicle
                </button>
                &nbsp;&nbsp;
                <Link className='btn btn-default' to='/vehicles'>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(vehicleAddNew);
