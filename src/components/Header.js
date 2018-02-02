import React from 'react';
import PropTypes from 'prop-types'

const Header = ({talkingTo}) => (
 <div className="header">
    {talkingTo !== '' ? `Talking to: ${talkingTo}` : ''}
  </div>
)

Header.propTypes = {
    talkingTo: PropTypes.string
};

export default Header;