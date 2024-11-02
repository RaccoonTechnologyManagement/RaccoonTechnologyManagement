import React from 'react';

const RedirectButton = ({ item, url, className, imageSrc, altText }) => {
  const handleClick = () => {
    localStorage.setItem('idTicket', item.id);
    window.location.href = `${url}?idTicket=${item.id}`;
  };

  return (
    <td className={className}>
      <img 
        src={imageSrc} 
        alt={altText} 
        onClick={handleClick} 
      />
    </td>
  );
};

export default RedirectButton;
