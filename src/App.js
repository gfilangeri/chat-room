import React, { Component } from 'react';
import ChatRoom from './components/ChatRoom';

class App extends Component {
   render() {
      return (
         <div>
            <div>
               <h1>CHAT ROOM</h1>
               <ChatRoom />
            </div>
         </div>

      )
   }
}

export default App;
