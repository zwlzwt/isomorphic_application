import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { ApolloConsumer, Query } from 'react-apollo';
import gql from 'graphql-tag';

// actions
// import {
//   userInfoAction,
//   homeInfoAction
// } from '../actions/userAction';

// selector
// import {
//   selectQueryDataFromUser,
// } from '../reducers/entities'
//
// const mapStateToProps = (state, ownProps) => {
//   const userInfo = selectQueryDataFromUser(state)
//   return {
//     ...userInfo,
//   }
// };
//
// const mapDispatchToProps = {
//   userInfoAction,
//   homeInfoAction
// };
//
// @connect(mapStateToProps, mapDispatchToProps)

const GET_INFO_AUTH = gql`
{
  info
  feed {
    id
    url
    description
  }
  name
  age
}
`
class Home extends React.Component {
  // static loadData(dispatch) {
  //   return Promise.all([dispatch(userInfoAction()), dispatch(homeInfoAction())])
  // }

  static defaultProps = {
    name: '',
    age: null,
  }

  render() {
    const {
      name,
      age,
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>主页</title>
        </Helmet>
        <label>
          姓名
          <input
            />
        </label>
        <label>
          密码
          <input
          />
        </label>
        <label>
          邮箱
          <input
          />
        </label>
        <h1>{name}</h1>
        <h2>{age}</h2>
      </React.Fragment>
    );
  }
}

export default withRouter(
  () => (
    <Query
      query={GET_INFO_AUTH}
      >
      {
        ({ loading, error, data }) => {
          if (loading) return "loading..."
          if (error) return  `Error! {error.message}`
          return (
            <Home
              age={data.age}
              name={data.name}
              />
          )
        }
      }
    </Query>
  )
);
