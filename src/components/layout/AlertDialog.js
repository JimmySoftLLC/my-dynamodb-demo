import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

class AlertDialog extends Component {
  static propTypes = {
    alertOpen: PropTypes.bool.isRequired,
    setAlertToClosed: PropTypes.func.isRequired,
    alertMessage: PropTypes.string.isRequired,
    alertTitle: PropTypes.string.isRequired,
  };

  handleClose = () => {
    this.props.setAlertToClosed();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.alertOpen}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            <i className='fas fa-exclamation-triangle'></i>
            {'  '}
            {this.props.alertTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {this.props.alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className='btn btn-light'>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
