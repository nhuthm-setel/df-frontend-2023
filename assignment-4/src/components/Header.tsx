import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-2xl lg:text-3xl text-white font-semibold mb-2 lg:mb-0">
          Bookstore Management
        </h1>
        <div className="flex items-center">
          <div>
            <img src='https://demoda.vn/wp-content/uploads/2022/01/avatar-doremon-ngau.jpg' className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-blue-500"/>
          </div>
          <span className="text-white font-semibold ml-2">Nhut Huynh Steve</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
