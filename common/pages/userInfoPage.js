import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { userInfoAction } from '../actions/userAction';

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = {
  userInfoAction,
};

@connect(mapStateToProps, mapDispatchToProps)
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
