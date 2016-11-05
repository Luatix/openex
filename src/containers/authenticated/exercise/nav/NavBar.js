import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as Constants from '../../../../constants/ComponentTypes'
import {Drawer} from '../../../../components/Drawer'
import {List} from '../../../../components/List'
import {IconListItemLink} from '../../../../components/list/ListItem'
import {Icon} from '../../../../components/Icon'
import {AppBar} from '../../../../components/AppBar'
import {toggleLeftBar} from '../../../../actions/Application'

const styles = {
  exit: {
    position: 'absolute',
    bottom: '20px',
    left: '20px'
  }
}

class NavBar extends Component {

  handleToggle() {
    this.props.toggleLeftBar()
  }

  render() {
    return (
      <Drawer width={65} docked={true} open={true} zindex={50}>
        <AppBar onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
        <List>
          <IconListItemLink to={'/private/exercise/' + this.props.id + '/world'}
                            leftIcon={<Icon type={Constants.ICON_TYPE_NAVBAR}
                                            name={Constants.ICON_NAME_SOCIAL_PUBLIC}/>}/>
          <IconListItemLink to={'/private/exercise/' + this.props.id + '/objectives'}
                            leftIcon={<Icon type={Constants.ICON_TYPE_NAVBAR}
                                            name={Constants.ICON_NAME_CONTENT_FLAG}/>}/>
          <IconListItemLink to={'/private/exercise/' + this.props.id + '/scenario'}
                            leftIcon={<Icon type={Constants.ICON_TYPE_NAVBAR}
                                            name={Constants.ICON_NAME_LOCAL_MOVIES}/>}/>
          <IconListItemLink to={'/private/exercise/' + this.props.id + '/audience'}
                            leftIcon={<Icon type={Constants.ICON_TYPE_NAVBAR}
                                            name={Constants.ICON_NAME_SOCIAL_GROUP}/>}/>
          <IconListItemLink to={'/private/exercise/' + this.props.id + '/calendar'}
                            leftIcon={<Icon type={Constants.ICON_TYPE_NAVBAR}
                                            name={Constants.ICON_NAME_ACTION_EVENT}/>}/>
          <IconListItemLink to={'/private/exercise/' + this.props.id + '/settings'}
                            leftIcon={<Icon type={Constants.ICON_TYPE_NAVBAR}
                                            name={Constants.ICON_NAME_ACTION_SETTINGS}/>}/>
        </List>
        <div style={styles.exit}>
          <Link to='/private' key='exit'>
            <Icon name={Constants.ICON_NAME_ACTION_EXIT_TO_APP}/>
          </Link>
        </div>
      </Drawer>
    )
  }
}

NavBar.propTypes = {
  id: PropTypes.string.isRequired,
  toggleLeftBar: PropTypes.func,
  open: PropTypes.bool
}

const select = (state) => {
  return {
    open: state.application.getIn(['ui', 'navbar_left_open'])
  }
}

export default connect(select, {toggleLeftBar})(NavBar)