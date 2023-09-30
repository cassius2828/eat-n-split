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
  const [selectFriend, setSelectFriend] = useState(1);
  const [peers, setPeers] = useState(staticPeers);
  const [bill, setBill] = useState({
    totalBill: 0,
    myExpense: 0,
    iPay: "you",
  });

  let peerBill = bill.totalBill - bill.myExpense;

  const onSelectFriend = (index) => {
    setSelectFriend(index);
    if (selectFriend === index) setSelectFriend(null);
  };

  const onAddPeer = (peerName, peerPic) => {
    if (peerName && peerPic)
      setPeers([
        ...peers,
        {
          name: peerName,
          money: 0,
          selected: false,
          profilePic: peerPic,
        },
      ]);
  };
  // using Object.assign to modify the money state of the selected Friend
  // now I must figure out how to use the bill state to effectively calculate the balance for the peer

  // For my understanding, I will list out what this function does :P
  /*
1. when I set the state, I am first looping through the objects in the current state
2. I am comparing the index of the obj to the selectFriend state
this allows me to access the obj that belongs to the selectedFriend
3. Using Object.assign if it is true, I take the obj (i),
then to modify the obj I spread the contents and add the money key with the new value
if the index does not match, i spread the obj to make sure it remains the same
? do I need to spread the contents into an array first? It seems to currently work as desired 

! Calcs are decided based upon the who pays state, this state will be toggled in the select below
*/
  const handleMoney = () => {
    if (bill.iPay === "you")
      setPeers(
        peers.map((i, index) =>
          index === selectFriend
            ? Object.assign(i, { ...i, money: i.money + peerBill })
            : { ...i }
        )
      );
  };
  if (bill.iPay === "peer")
    setPeers(
      peers.map((i, index) =>
        index === selectFriend
          ? Object.assign(i, { ...i, money: i.money - peerBill })
          : { ...i }
      )
    );

  // ! infinite loop caused by setting state with the conditional based on the onChange event
  // waiting for answer from forum to proceed here
  // const handleWhoPays = (e, id) => {
  //   const selectTag = document.getElementById(id);

  //   if(selectTag.value === )
  //   setBill({...bill, iPay: e.target.value})

  // };
  // this ensures it runs on the first render so we know how to calculate the money later
  // useEffect(() => {
  //   handleWhoPays();
  // }, []);

  return (
    <div className="App">
      <div className="peer-container">
        {peers.map((i, index) => {
          return (
            <PeerCard
              // key={index}
              handleSelectFriend={onSelectFriend}
              peers={peers}
              index={index}
              name={i.name}
              money={i.money}
              selected={selectFriend}
              profilePic={i.profilePic}
            />
          );
        })}

        <AddPeer handleAddPeer={onAddPeer} />
        <button className="mt4" id="close-btn">
          Close
        </button>
      </div>
      <div className="bill-total-container">
        {peers.map((i, index) => {
          // this will likely change
          if (index === selectFriend)
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
                  {/* !!! THIS IS THE PROBLEM AREA !!! */}
                  <span>Who is paying the bill?</span>
                  <select
                    name={bill.iPay}
                    value={bill.iPay}
                    onChange={(e) =>
                      // console.log(e.target.value)
                      setBill({ ...bill, iPay: e.target.value })
                    }
                    style={{ cursor: "pointer" }}
                    id="who-pays"
                  >
                    {/* <option ></option> */}
                    <option value="you">You</option>
                    <option value="peer">{i.name}</option>
                  </select>
                 
                </BillRow>
                <div className="split-bill-container">
                  <button onClick={handleMoney}>Split Bill</button>
                </div>
              </>
            );
        })}
        {selectFriend === null && (
          <h1 style={{ textAlign: "center" }}>
            Select a Friend to Split the Bill With!
          </h1>
        )}
      </div>
    </div>
  );
}

export default App;



/*
if I pay the bill, I add to sarah money from sarah expense
if sarah pays the bill, i subtract sara money from my expense


*/

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
