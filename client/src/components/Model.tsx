import React, { Fragment } from "react";

type props={
    closeModel: () => void,
    children:JSX.Element
}

const Model = ({closeModel,children}:props) => {
  return (
    <Fragment>
      <div className="absolute top-0 overflow-y-auto py-10 left-0 flex justify-center items-center w-full h-full bg-[#000000b5]">
        <div
          className="bg-white p-10 rounded-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <span
            onClick={closeModel}
            className="absolute top-3 right-4 cursor-pointer text-lg font-extrabold"
          >
            X
          </span>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Model;
