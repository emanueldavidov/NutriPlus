import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-[#b81d33] text-center w-full text-white py-2 text-sm md:text-base">
    <div className="text-center py-2">
      <div className="space-y-2">
        <p className="text-base md:text-lg">Created by:</p>
        <p className="text-sm md:text-base">Emanuel, Raz, Yossi, Shai, Itay</p>
        <p className="text-sm md:text-base">
          NutriPlus Team -{' '}
          <a href="mailto:Support@NutriPlus.com" className="text-white hover:text-red-600">
            Support@NutriPlus.com
          </a>
        </p>
      </div>
    </div>
  </footer>
  );
}
export default Footer;
