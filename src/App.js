import './App.css';
// components
import { PeerCard } from './components/peerCard/peerCard';
import { BillRow } from './components/billRow/billRow';
import { AddPeer } from './components/addPeer/AddPeer';



function App() {
  return (
    <div className="App">
     <div className='peer-container'>
      <PeerCard/>
      <AddPeer/>
     </div>
     <div className='bill-total-container'>
      <BillRow/>
     </div>
    </div>
  );
}

export default App;

