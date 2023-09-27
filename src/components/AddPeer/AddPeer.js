import React from "react";
import AddInput from "./AddInput";

export const AddPeer = () => {
  return (
    <div className="add-peer-container">
      <AddInput />
      <AddInput />
      <button>Add</button>
    </div>
  );
};
