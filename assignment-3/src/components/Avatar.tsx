import React from 'react';
import './Avatar.css';

function Avatar() {

  const avatarImageSrc = 'https://vapa.vn/wp-content/uploads/2022/12/avatar-doremon-cute-001.jpg';
  const avatarAltText = 'User Avatar';

  return (
    <div className="avatar">
      <img src={avatarImageSrc} alt={avatarAltText} />
    </div>
  );
}

export default Avatar;
