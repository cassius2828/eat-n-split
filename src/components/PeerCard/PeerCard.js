import React from "react";
import "./PeerCard.css";

export const PeerCard = ({ name, profilePic, money, selected, index, handleSelectPeer }) => {
  return (
    <div
      style={{
        backgroundColor: index % 2 === 0 ? "whitesmoke" : "antiquewhite",
      }}
      className="peer-card"
    >
      <div className="profile-container">
        <img alt={name} src={profilePic} />
      </div>
      <div className="name-container">
        <h3>{name}</h3>
        {money > 0 ? (
          <span style={{ color: "green" }}>
            {name} owes you ${money}{" "}
          </span>
        ) : money === 0 ? (
          <span>You and {name} are even</span>
        ) : (
          <span style={{ color: "red" }}>
            You owe {name} ${money * -1}
          </span>
        )}
      </div>
      <button onClick={handleSelectPeer} >{selected ? "close" : "select"}</button>
    </div>
  );
};

/*
we are passing in the index to identify the peercard and btn
- handleSelectPeer={() => onSelectPeer(index)}
- onClick={handleSelectPeer}

what should I expect from this function?
- toggle selected state
- ensure that only one can be set as true at a time

*/