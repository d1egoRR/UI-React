import React from 'react';
import {getUsers} from 'api/RandomUsers';
import UserCardList from './UserCardList';
import AddUserForm from './AddUserForm';
import {without} from 'lodash';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'React Event',
      users: [],
      isFormVisible: false
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

  render() {
    return(
      <div>
        <div className='row mb-3'>
          <div className='col-lg-12'>
            <AddUserForm
              handleToggleFormVisibility={::this.toogleFormVisibility}
              isFormVisible={this.state.isFormVisible} />
          </div>
        </div>
        <div>
          <h3>
            {this.state.users.length} people attending to {this.state.eventName}
          </h3>
        </div>
        <UserCardList
          users={this.state.users}
          handleRemoveUser={::this.removeUser}
          />
      </div>
    );
  }
}