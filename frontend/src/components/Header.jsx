import React from "react";
// import { useTasks } from "@/context/taskContext";
// import { useUserContext } from "@/context/userContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";


function Header() {
  // const { user } = useUserContext();
  // const { openModalForAdd, activeTasks } = useTasks();

  // const { name } = user;
  // const userId = user._id;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {/* {userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"} */}
        </h1>
        <p className="text-sm">
          {/* {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )} */}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        {/* <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px] hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              handleNavigation("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button> */}

        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/coolCoderD"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <FontAwesomeIcon  icon={faGithub}/>
          </a>
          <a
            href="https://github.com/coolCoderD"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <FontAwesomeIcon  icon={faMoon}/>
          </a>
          <a
            href="https://github.com/coolCoderD"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <FontAwesomeIcon  icon={faUser}/>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
