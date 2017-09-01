import React, { Component } from 'react';
import '../app.css';

class ChatRoom extends Component {

   constructor(props, context) {
      super(props, context)
      this.state = {
         messages: [],
         message: '',
         username: ''
      }

      this.updateUserName = this.updateUserName.bind(this)
      this.updateMessage = this.updateMessage.bind(this)
      this.submitMessage = this.submitMessage.bind(this)
   }

   componentDidMount() {
      firebase.database().ref('messages/').on('value', (snapshot) => {

         const currentMessages = snapshot.val()

         if (currentMessages != null){
            this.setState({
               messages: currentMessages
            })
         }
      })
   }

   updateUserName(e) {
      e.preventDefault()
      var username = this.state.username
      this.setState({
         username: e.target.value
      })

   }

   updateMessage(e) {
      e.preventDefault()
      var message = this.state.message
      this.setState({
         message: e.target.value
      })

   }

   submitMessage(e) {
      e.preventDefault()
      var username = this.state.username
      var message = this.state.message
      var messages = this.state.messages
      const nextMessage = {
         id: messages.length,
         username: username,
         text: message
      }

      firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
      this.setState({
         username: '',
         message: ''
      })
   }

   render() {
      const currentMessage = this.state.messages.map((message, i) => {
         return (
            <div className="Message" key={message.id}>
               <div className="Message-author">{message.username}</div>
               <div className="Message-text">{message.text}</div>
            </div>
         )
      })

      return (
         <div className="MessagePane">
            <div className="MessagePane-List">
               {currentMessage}
            </div>


            <form className="MessagePane-Form" onSubmit={this.submitMessage}>
                <div className="MessagePane-Form-container">
                  <input className="name" onChange={this.updateUserName} type="text" placeholder="Username" value={this.state.username}/>
                  <br />
                  <input className="message" onChange={this.updateMessage} type="text" placeholder="Message" value={this.state.message}/>
                  <br />
                  <button className="send" onClick={this.submitMessage}>Send</button>
               </div>
            </form>
         </div>

      )
   }
}

export default ChatRoom;
