import React from 'react';
import Helmet from 'react-helmet';

class User extends React.Component {
  static loadData(dispatch) {
    return dispatch(userInfoAction())
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>个人页</title>
        </Helmet>
        <h3>个人页</h3>
      </React.Fragment>
    )
  }
}

export default User;
