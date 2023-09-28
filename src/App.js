import "./App.css";
// components
import { PeerCard } from "./components/PeerCard/PeerCard";
import { BillRow } from "./components/BillRow/BillRow";
import { AddPeer } from "./components/AddPeer/AddPeer";
import { useEffect, useState } from "react";

function App() {
  const staticPeers = [
    {
      name: "Clark",
      // id: 0,
      money: -7,
      selected: false,
      profilePic:
        "https://kevindayphotography.com/wp-content/uploads/2020/12/headshot-for-business-man-1200x675.jpg",
    },
    {
      name: "Sarah",
      // id: 1,
      money: 27,
      selected: true,
      profilePic:
        "https://www.cityheadshots.com/uploads/5/1/2/1/5121840/editor/lowres-mjb-5074_3.jpg?1574008349",
    },
    {
      name: "Anthony",
      // id: 2,
      money: 0,
      selected: false,
      profilePic:
        "https://images.squarespace-cdn.com/content/v1/54693b1ee4b07c8a3da7b6d0/1492201646122-7CCYPRAF33QU2MGPW8YJ/Headshot-by-Lamonte-G-Photography-Baltimore-Corporate-Headshot-Photographer-IMG_6763-Edit.JPG?format=1500w",
    },
  ];
  const [peers, setPeers] = useState(staticPeers);
  const [bill, setBill] = useState({
    totalBill: 0,
    myExpense: 0,
  });

  let peerBill = bill.totalBill - bill.myExpense;

  const onSelectPeer = () => {
   setPeers([...peers, {
     selected: false
   }])
  }

  const onAddPeer = (peerName, peerPic) => {
    setPeers([
      ...peers,
      {
        name: peerName, money: 0, selected: false, profilePic: peerPic,
      }
    ])
  }

  return (
    <div className="App">
      <div className="peer-container">
        {peers.map((i, index) => {
          return (
            <PeerCard
              handleSelectPeer={onSelectPeer}
              peers={peers}
              index={index}
              name={i.name}
              money={i.money}
              selected={i.selected}
              profilePic={i.profilePic}
            />
          );
        })}

        <AddPeer
        handleAddPeer={onAddPeer}
        />
        <button className="mt4" id="close-btn">
          Close
        </button>
      </div>
      <div className="bill-total-container">
        {peers.map((i) => {
          if (i.selected)
            return (
              <>
                <h1 className="mt3 mb3">Split a bill with {i.name}</h1>
                <BillRow>
                  <span>Bill value</span>
                  <input
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        totalBill: Number(e.target.value),
                      })
                    }
                    type="number"
                    id="bill-value"
                  />
                </BillRow>
                <BillRow>
                  <span>Your Expense</span>
                  <input
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        myExpense: Number(e.target.value),
                      })
                    }
                    type="number"
                    id="your-expense"
                  />
                </BillRow>
                <BillRow>
                  <span>{i.name}'s Expense</span>
                  <input value={peerBill} type="text" id="thier-expense" />
                </BillRow>
                <BillRow>
                  <span>Who is paying the bill?</span>
                  <select style={{ cursor: "pointer" }} id="who-pays">
                    <option value="you">You</option>
                    <option value="peer">{i.name}</option>
                  </select>
                </BillRow>
                <div className="split-bill-container">
                  <button>Split Bill</button>
                </div>
              </>
            );
        })}
      </div>
    </div>
  );
}

export default App;

/*
State Needed
1. Which friend is selected

2. The bill

3. The difference in how much money is owed between friends

4. Peer list

can all of this state be combined into one large state
, or should it be broken up into different state?

The bill will be separate from the peer list of state

--bill state will be the value of the first input
--your expense will calculate the friend's expense from the bill state
-- who pays the bill then will take your expense and either ADD it to the friend's money total (green)
or it will subtract from the friends money total (red)
-- pressing split bill will trigger this action and state change of the peer state


Another area where we will need to update peer state is from the add friend button which will 
affect the friend name and profile picture, their money will start at 0 and selected at false

Peer expense comes from bill state minus your expense state


*/
