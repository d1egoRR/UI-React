import React from 'react';
import Select from 'react-select';
import CountryCodes from 'CountryCodes';
import {getRandomPicture} from 'api/RandomUsers';

export default class AddUserForm extends React.Component {
  onToggleFormVisibility() {
    this.props.handleToggleFormVisibility();
  }

  getGenderOptions() {
    var options = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    return options;
  }

  getCountrySelectOptions() {
    const options = [];
    for (const country in CountryCodes) {
      options.push({
        value: country,
        label: country
      });
    }

    return options;
  }

  onSelectedGenderChange(val) {
    var gender = val ? val.value : '';
    this.props.handleSelectedGenderChange(gender);
  }

  onSelectedCountryChange(val) {
    var country = val ? val.value : '';
    this.props.handleSelectedCountryChange(country);
  }

  onSubmitForm(e) {
    e.preventDefault();
    const age = this.refs.age.value.trim();
    const email = this.refs.email.value.trim();
    const name = this.refs.name.value.trim();
    const region = this.props.selectedCountry.trim();
    const gender = this.props.selectedGender.trim();
    const photo = getRandomPicture(gender);

    if (age && name && email && region && gender && photo) {
      const user = {age, name, email, gender, photo, region};
      this.props.handleAddUser(user);
      this.resetFields();
    } else {
      alert('please fill all inputs');
    }
  }

  resetFields(e) {
    if (e) {
      e.preventDefault();
    }

    this.onSelectedGenderChange();
    this.onSelectedCountryChange();
    this.refs.age.value = '';
    this.refs.email.value = '';
    this.refs.name.value = '';
  }

  render() {
    const isFormVisible = this.props.isFormVisible;
    const formStyle = {
      display: isFormVisible ? 'block' : 'none'
    };
    const addOrMinusSign = isFormVisible ? 'fa fa-minus fa-2x' : 'fa fa-plus fa-2x';
    const hideOrHideUserTex = isFormVisible ? 'Hide' : 'Add User';

    return(
      <div>
        <i className={addOrMinusSign} onClick={::this.onToggleFormVisibility}></i> {hideOrHideUserTex}
        <div style={formStyle} className="col-lg-12 addUserSection">
          <form onSubmit={::this.onSubmitForm}>
            <div className="form-group row">
              <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
              <div className="col-sm-10">
                <Select
                  name="form-field-gender"
                  value={this.props.selectedGender}
                  options={this.getGenderOptions()}
                  onChange={::this.onSelectedGenderChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" placeholder="Name" autoComplete = "off" ref='name'/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="email" placeholder="Email" autoComplete = "off" ref='email'/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
              <div className="col-sm-10">
                <input type="number" className="form-control" id="age" placeholder="Age" autoComplete = "off" ref='age'/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="region" className="col-sm-2 col-form-label">Region</label>
              <div className="col-sm-10">
                <Select
                  name="form-field-region"
                  value={this.props.selectedCountry}
                  options={this.getCountrySelectOptions()}
                  onChange={::this.onSelectedCountryChange}
                />
              </div>
            </div>

            <input className="btn btn-secondary mr-3" type="submit" value="Submit"/>
            <button className="btn btn-secondary" onClick={::this.resetFields}>Clear Fields</button>
          </form>
        </div>
      </div>
    );
  }
}