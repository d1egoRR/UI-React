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
      users: []
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

  render() {
    return(
      <div>
        <div className='row mb-3'>
          <div className='col-lg-12'>
            <AddUserForm />
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