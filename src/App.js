import React, { Component } from "react";
import "./App.scss";
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory/ChatHistory'
import ChatInput from './components/ChatInput/ChatInput'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      username: "anon"
    }
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        ...prevState,
        chatHistory: [...this.state.chatHistory, msg],
      }))
      console.log(this.state);
    });
  }

  send = (event) => {
    if (event.keyCode === 13) {
      console.log(this.state)
      sendMsg(`${this.state.username}: ${event.target.value}`);
      event.target.value = "";
    }
  }

  setUsername = (event) => {
    this.setState(prevState => ({
      ...prevState,
      username: event.target.value
    }))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <div className="inputs">
          <ChatInput className="username" send={this.setUsername} placeholder="username"/>
          <ChatInput className="message" send={this.send} placeholder="type something..."/>
        </div>
      </div>
    );
  }
}

export default App;