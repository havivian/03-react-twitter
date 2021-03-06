import React, { Component } from 'react'
import ProfileAvatar from './ProfileAvatar';
import AvatarDialog from './AvatarDialog';
import { getMessages } from '../../api/messageApi';

import './Profile.css';
import { sortMessagesById } from '../../Utilities/userUtilities';
import { addUsersStars } from '../../Utilities/userUtilities';


class Profile extends Component {
  constructor()  {
    super();
    this.state = {
      avatar: 'https://via.placeholder.com/150x150',
      name: 'Paul',
      handle: '@jack',
      message_count: 0,
      star_count: 0,
      bio: 'Front end dev located in Denver',
      location: 'Denver, CO',
      link: 'github.com/git',
      birth_date: '03/02/1999',
      dialog_open: false
    };
  }

  componentDidMount() {
    this.initializeUserDashboard();
  }

  initializeUserDashboard = () => {
    getMessages().then(res => {
      sortMessagesById(res.data);
      this.setState({
        star_count: addUsersStars(res.data),
        message_count: res.data.length,
        messages: this.renderMessageItem(res.data)
      });
    });
  }

  renderMessageItem = (messagesList) => {
    let htmlList = [];
    // TODO Sort array by time stamp, once time stamp is getting here from data.
    messagesList.forEach((message, index) => {
      htmlList.push(<li key={index}>--- {message.text}</li>);
    })
    return htmlList;
  }

  avatarClicked = (e) => {
     e.preventDefault();
     console.log('The link was clicked.');
  }

  changeAvatar = (url) => {
    console.log("Changing avatar");
    this.setState({avatar: url});
  }

  render() {
    return (
      <div className="ProfileContainer">
        <div className="ProfileHeader">
        <ProfileAvatar onClick={this.avatarClicked}  image={this.state.avatar} />
          <h1
            data-handle={this.state.handle}
            className="handle">{this.state.name}</h1>
          <ul className="InfoList">
            <li>messages: {this.state.message_count}</li>
            <li>likes: {this.state.star_count}</li>
          </ul>
        </div>
        <div className="InfoContainer">
          <p>
            {this.state.bio}
          </p>

          <ul className="InfoList">
            <li>{this.state.location}</li>
            <li>{this.state.link}</li>
            <li>{this.state.birth_date}</li>
          </ul>

        </div>
        <AvatarDialog changeAvatar={this.changeAvatar}/>
        <div className="messageView">
          <h2>{this.state.name}'s Message List</h2>
          <ul>
            {this.state.messages}
          </ul>
        </div>
      </div>
    )
  }
};

export default Profile;
