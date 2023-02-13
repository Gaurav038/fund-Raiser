import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ name, color, icon }) => {
  return (
    <Link to={`/query/${name} `}>
      <div>
        <div
          className={`text-center ${color} w-60 h-max max-w-xs md:p-2 p-3 md:px-8 md:py-8 rounded-2xl`}
        >
         <img src={icon} style={{ filter: "invert(100%)"}} alt="fund_logo" className='w-1/2 h-1/2' />
          <h1 className="md:text-2xl text-xl text-gray-100 ">{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Card;