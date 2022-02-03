import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';

export default function Button({ onClick, children }) {
  return (
    <ButtonLoad type="button" onClick={onClick}>
      {children}
    </ButtonLoad>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
