import React, { useState } from "react";
import "./AddPeer.css";

export const AddPeer = ({ handleAddPeer }) => {
  const [peerInfo, setPeerInfo] = useState({
    name: "",
    pic: "",
  });

  const updatePeerName = (e) => {
    setPeerInfo({
      ...peerInfo,
      name: e.target.value,
    });
  };

  const updatePeerPic = (e) => {
    setPeerInfo({
      ...peerInfo,
      pic: e.target.value,
    });
  };
  return (
    <div
      style={{ backgroundColor: "antiquewhite" }}
      className="add-peer-container pa3 pt4"
    >
      <div className="add-details-container mt3 mb3">
        <span>Friends</span> <input onChange={updatePeerName} type="text" />
      </div>
      <div className="add-details-container mt3 mb3">
        <span>Image Url</span> <input onChange={updatePeerPic} type="text" />
      </div>
      <button onClick={() => handleAddPeer(peerInfo.name, peerInfo.pic)}>
        Add
      </button>
    </div>
  );
};
