import { useState } from "react";
import { FaUserCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  profileName: string;
  profilePicture: string | undefined;
  //   showDropdown: boolean;
  //   onToggleDropdown: () => void;
}

const Dropdown = ({ profileName, profilePicture }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className="relative" data-te-dropdown-ref>
      <button
        className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        type="button"
        id="dropdownMenu"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={toggleDropdown}
      >
        <div className="flex justify-center items-center space-x-3 cursor-pointer">
          {profilePicture ? (
            <img
              className="object-cover w-8 h-8 rounded-full ring ring-gray-300 dark:ring-gray-600 "
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
              alt="Profile image"
            />
          ) : (
            <FaUserCircle size={32} color="#aba6b3" />
          )}

          <div>
            <div className="cursor-pointer capitalize text-base">
              {profileName}
            </div>
          </div>
        </div>
        <span className="ml-2 w-2 mt-1">
          {showDropdown ? (
            <FaChevronUp size={16} color="currentColor" />
          ) : (
            <FaChevronDown size={16} color="currentColor" />
          )}
        </span>
      </button>
      {showDropdown && (
        <ul
          className="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-gray-color-100 bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenu"
          data-te-dropdown-menu-ref
        >
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-16 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              href="#"
              data-te-dropdown-item-ref
            >
              Profile
            </a>
          </li>

          <li>
            <form action="/logout" method="post" data-te-dropdown-item-ref>
              <button
                type="submit"
                className="button block w-full whitespace-nowrap bg-transparent px-16 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                Logout
              </button>
            </form>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
