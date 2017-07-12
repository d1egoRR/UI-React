import React from 'react';
import {getUsers} from 'api/RandomUsers';
import UserCardList from './UserCardList';
import AddUserForm from './AddUserForm';
import GenderSortDropdown from './GenderSortDropdown';
import SearchInput from './SearchInput';
import {without, filter} from 'lodash';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'React Event',
      users: [],
      isFormVisible: false,
      selectedGender: '',
      selectedCountry: '',
      filterBy: 'all',
      query: ''
    }
  }

  componentDidMount() {
    getUsers(6, users => {
      this.setState({users: users});
    });
  }

  removeUser(user) {
    const users = without(this.state.users, user);
    this.setState({users: users});
  }

  toogleFormVisibility() {
    this.setState({isFormVisible: !this.state.isFormVisible});
  }

  changeSelectedGender(selectedGender) {
    this.setState({selectedGender});
  }

  changeSelectedCountry(selectedCountry) {
    this.setState({selectedCountry});
  }

  addUser(user) {
    const users = this.state.users;
    users.push(user);
    this.setState({users});
  }

  changeGenderSortDropdown(filterBy) {
    this.setState({filterBy});
  }

  search(query) {
    this.setState({query});
  }

  searchByQuery(users, query) {
    const newUsers = [];
    users.forEach(user=>{
      if (user.name.toLowerCase().includes(query) ||
          user.region.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.gender.toLowerCase().includes(query) ||
          user.age == query)
      {
        newUsers.push(user);
      }
    });

    return newUsers;
  }

  render() {

    let currentUsers = this.state.users;
    const query = this.state.query.toLowerCase();
    const filterBy = this.state.filterBy;

    currentUsers = this.searchByQuery(currentUsers, query);

    if (filterBy !== 'all') {
      currentUsers = filter(currentUsers, user=>user.gender === filterBy);
    }

    return(
      <div>
        <div className='row mb-3'>
          <div className='col-lg-12'>
            <AddUserForm
              handleToggleFormVisibility={::this.toogleFormVisibility}
              isFormVisible={this.state.isFormVisible}
              selectedGender={this.state.selectedGender}
              handleSelectedGenderChange={::this.changeSelectedGender}
              selectedCountry={this.state.selectedCountry}
              handleSelectedCountryChange={::this.changeSelectedCountry}
              handleAddUser={::this.addUser} />
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-lg-6'>
            <div className='form-inline'>
              <div className='mr-3'>
                <GenderSortDropdown
                  handleGenderSortDropdownValueChange={::this.changeGenderSortDropdown}
                  filterBy={this.state.filterBy} />
              </div>
              <SearchInput handleSearch={::this.search} />
            </div>
          </div>
          <div className='col-lg-6'>
            <div>
              <h3 className='float-right'>
                {currentUsers.length} people attending to {this.state.eventName}
              </h3>
            </div>
          </div>
        </div>

        <UserCardList
          users={currentUsers}
          handleRemoveUser={::this.removeUser}
          />
      </div>
    );
  }
}