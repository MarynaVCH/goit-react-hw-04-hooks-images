import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWrapp } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  a;
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWrapp>{this.props.children}</ModalWrapp>
      </Overlay>,

      modalRoot,
    );
  }
}
