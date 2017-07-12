import React from 'react';

export default class SearchInput extends React.Component {
  onInputChange(e) {
    const query = e.target.value;
    this.props.handleSearch(query);
  }

  render() {
    return(
      <input
        type='email'
        placeholder='Search'
        className='form-control'
        onChange={::this.onInputChange} />
    );
  }
}