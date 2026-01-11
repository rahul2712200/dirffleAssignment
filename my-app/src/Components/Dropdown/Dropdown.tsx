import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Option } from "../../Interfaces/model";

interface DropdownProps {
  options: Option[];
  defaultValue?: Option;
  onChange?: (selected: Option) => void;
}

export default function Dropdown({ options, defaultValue, onChange }: DropdownProps) {
  // Initialize selected value
  console.log("Options:", options);
  console.log("Default value:", defaultValue);
  
  const initialSelected = options.find(opt => opt.key === defaultValue?.key) || options[0];
  console.log("Initial selected:", initialSelected);
  
  const [selected, setSelected] = useState<Option>(initialSelected);
  

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option); // call optional callback
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-white font-semibold hover:bg-gray-700">
        {selected.value} <img 
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E" 
  alt="Dropdown"
  className="w-4 h-4"
/>

      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right bg-white border rounded-md shadow-lg focus:outline-none z-50">
          {options.map(option => (
            <Menu.Item as={Fragment} key={option.key}>
              {({ active }) => (
                <button
                  className={`block w-full px-3 py-2 text-left ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.value}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
