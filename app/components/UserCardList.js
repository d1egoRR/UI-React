import React from 'react';
import UserCard from './UserCard';

export default class UserCardList extends React.Component {
  onRemoveUser(user) {
    this.props.handleRemoveUser(user);
  }

  render() {
    const cards = this.props.users.map((user, index) => {
      return <UserCard
        key={index}
        user={user}
        onRemoveUser={::this.onRemoveUser}
        currentUser={user}
        />;
    });

    return(
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card-columns'>
            {cards}
          </div>
        </div>
      </div>
    );
  }
}