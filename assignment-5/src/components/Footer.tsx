import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FrontEnd 2023 - Assignment 5.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
