import React from 'react';
import {getUsers} from 'api/RandomUsers';
import ISO from 'api/ISO';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'React Event',
      users: []
    }
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    getUsers(6, users => {
      this.setState({users: users});
    });
  }

  render() {
    const currentUsers = this.state.users;
    const cards = currentUsers.map((user, index) => {
      const {name, gender, photo, region, email, age} = user;
      const genderSign = gender === 'female' ? 'fa fa-venus' : 'fa fa-mars';
      const flagClassName = `flag-icon flag-icon-${ISO(region)}`;
      const card =
        <div key={index} className="card text-center">
          <img className="card-img-top img-fluid rounded-circle hvr-grow" src={photo} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">{name} {age} <i className={genderSign}></i></h4>
            <p>
              <a href={`mailto:${email}?Subject=Hello%20${name}`} target="_top">
                <i className="fa fa-envelope"/> - {email}
              </a>
            </p>
            <p className="card-text">
              <small className="text-muted">
                {region} <span className={flagClassName}></span>
              </small>
            </p>
            <i className='fa fa-remove fa-2x float-right hvr-grow'></i>
          </div>
        </div>;

      return card;
    });

    return(
      <div>
        <div>
          <h3>
            {this.state.users.length} people attend to {this.state.eventName}
          </h3>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card-columns'>
              {cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}