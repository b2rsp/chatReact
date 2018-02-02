import React from 'react';

const Header = ({talkingTo}) => (
 <div className="header">
    {talkingTo !== '' ? `Talking to: ${talkingTo}` : ''}
  </div>
)

export default Header;