import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-[#b81d33] text-center mt-auto fixed bottom-0 left-0 w-full text-white py-2 text-sm">
      <div className="text-center py-2">
        <div className="space-y-2">
          <p className="text-base">Created by:</p>
          <p>
            Emanuel, Raz, Yossi, Shai, Itay
          </p>
          <p>
            NutriPlus Team -{' '}
            <a href="mailto:Support@NutriPlus.com" className="text-white hover:text-red-600">Support@NutriPlus.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
