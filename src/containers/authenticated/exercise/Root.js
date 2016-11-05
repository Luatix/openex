import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {redirectToHome, toggleLeftBar} from '../../../actions/Application'
import * as Constants from '../../../constants/ComponentTypes'
import {AppBar} from '../../../components/AppBar'
import {Chip} from '../../../components/Chip'
import NavBar from './nav/NavBar'
import LeftBar from './nav/LeftBar'
import UserPopover from './../UserPopover'
import {fetchExercise} from '../../../actions/Exercise'

const styles = {
  root: {
    padding: '90px 20px 0 85px',
  },
  title: {
    fontVariant: 'small-caps',
    display: 'block',
    float: 'left'
  }
}

const statusesNames = {
  SCHEDULED: 'Scheduled',
  RUNNING: 'Running',
  FINISHED: 'Finished'
}

class RootAuthenticated extends Component {
  componentDidMount() {
    this.props.fetchExercise(this.props.id)
  }

  toggleLeftBar() {
    this.props.toggleLeftBar()
  }

  redirectToHome() {
    this.props.redirectToHome()
  }

  render() {
    let title = ''
    let status = ''

    if (this.props.exercise) {
      title = this.props.exercise.get('exercise_name')
    }

    if (this.props.exercise_statuses && this.props.exercise) {
      status = this.props.exercise_statuses.getIn([this.props.exercise.get('exercise_status'), 'status_name'])
    }

    return (
      <div>
        <AppBar
          title={
            <div>
              <span style={styles.title}>{title}</span>
              <Chip backgroundColor="#C5CAE9" type={Constants.CHIP_TYPE_FLOATING}>{statusesNames[status]}</Chip>
            </div>
          }
          type={Constants.APPBAR_TYPE_TOPBAR}
          onTitleTouchTap={this.redirectToHome.bind(this)}
          onLeftIconButtonTouchTap={this.toggleLeftBar.bind(this)}
          iconElementRight={<UserPopover/>}
          showMenuIconButton={false}/>
        <NavBar id={this.props.id}/>
        <LeftBar id={this.props.id}/>
        <div style={styles.root}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

RootAuthenticated.propTypes = {
  id: PropTypes.string,
  leftBarOpen: PropTypes.bool,
  exercise: PropTypes.object,
  exercise_statuses: PropTypes.object,
  toggleLeftBar: PropTypes.func,
  logout: PropTypes.func,
  redirectToHome: PropTypes.func,
  children: React.PropTypes.node,
  fetchExercise: PropTypes.func.isRequired,
  params: PropTypes.object
}

const select = (state, ownProps) => {
  let exerciseId = ownProps.params.exerciseId
  return {
    id: exerciseId,
    exercise: state.application.getIn(['entities', 'exercises', exerciseId]),
    exercise_statuses: state.application.getIn(['entities', 'exercise_statuses'])
  }
}

export default connect(select, {redirectToHome, toggleLeftBar, fetchExercise})(RootAuthenticated)