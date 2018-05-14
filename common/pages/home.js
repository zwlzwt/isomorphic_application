import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import {
  userInfoAction,
  homeInfoAction
} from '../actions/userAction';

// selector
import {
  selectQueryDataFromUser,
} from '../reducers/entities'

const mapStateToProps = (state, ownProps) => {
  const userInfo = selectQueryDataFromUser(state)
  return {
    ...userInfo,
  }
};

const mapDispatchToProps = {
  userInfoAction,
  homeInfoAction
};

@connect(mapStateToProps, mapDispatchToProps)
class Home extends React.Component {
  static loadData(dispatch) {
    return Promise.all([dispatch(userInfoAction()), dispatch(homeInfoAction())])
  }

  static defaultProps = {
    title: '',
    content: '',
    name: '',
    age: '',
  }

  // componentDidMount() {
  //   this.props.userInfoAction()
  // }

  render() {
    const {
      title,
      age,
      name,
      content
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>主页</title>
        </Helmet>
        <h3>主页</h3>
        <h3>{title}</h3>
        <h3>{content}</h3>
        <h1>{name}</h1>
        <h1>{age}</h1>
      </React.Fragment>
    )
  }
}

export default Home;
