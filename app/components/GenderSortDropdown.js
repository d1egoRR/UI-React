import React from 'react';

export default class GenderSortDropdown extends React.Component {
  onGenderSortDropdownValueChange(e) {
    const selectedValue = e.target.id;
    this.props.handleGenderSortDropdownValueChange(selectedValue);
  }

  render() {
    return(
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
            Show {this.props.filterBy}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" id="all" onClick={::this.onGenderSortDropdownValueChange}>All</a>
          <a className="dropdown-item" id="female" onClick={::this.onGenderSortDropdownValueChange}>Female</a>
          <a className="dropdown-item" id="male" onClick={::this.onGenderSortDropdownValueChange}>Male</a>
        </div>
      </div>
    );
  }
}