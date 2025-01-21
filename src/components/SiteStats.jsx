import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const SiteStats = ({ setSelectedLayer }) => { // Accept a prop to set the selected layer
  const [selectedOption, setSelectedOption] = useState('Select data'); // Default layer

  const handleSelect = (option) => {
    setSelectedOption(option); // Update local state
    setSelectedLayer(option);  // Pass selected option to parent
  };

  console.log(selectedOption)

  return (
    <div className="site-stats">
      <h3>Choose Dataset</h3>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedOption}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>
        </div>
        <MenuItems className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <MenuItem>
            <a
              href="#"
              onClick={() => handleSelect('Static JSON + STACOV File')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Select data
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => handleSelect('Static JSON + STACOV File')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Static JSON + STACOV File
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => handleSelect('Over All Site Info')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Over All Site Info
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => handleSelect('Over All Vs MYCS2')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Over All Vs MYCS2
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => handleSelect('OPUSNET Data')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              OPUSNET Data
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default SiteStats;
