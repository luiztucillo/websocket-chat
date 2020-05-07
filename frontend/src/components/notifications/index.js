import React, {Component} from 'react';
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('ws://my-token:password@localhost:8080');

class Notifications extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      inputValue: '',
      logged: false
    };
  }

  componentDidMount = () => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      this.setState((prevState) => ({
        messages: [JSON.parse(message.data), ...prevState.messages]
      }));
    };
  }

  list = () => {
    return (
        <div>
          <ul>
            {this.state.messages.map(message => (<li><b>{message.user.name}</b>: {message.message}</li>))}
          </ul>
        </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    client.send(this.state.logged
        ? JSON.stringify({message: this.state.inputValue})
        : JSON.stringify({name: this.state.inputValue}));
    this.setState({
      inputValue: '',
      logged: true
    });
  }

  render = () => {
    if (!this.state.logged) {
      return (
          <form onSubmit={e => this.handleSubmit(e)}>
            <label>Qual seu nome?</label>
            <br/>
            <input value={this.state.inputValue}
                   onChange={e => this.handleChange(e)}/>
            <button type="submit">Enviar</button>
          </form>
      );
    }

    return (
        <div>
          {this.list()}
          <form onSubmit={e => this.handleSubmit(e)}>
            <input value={this.state.inputValue}
                   onChange={e => this.handleChange(e)}/>
            <button type="submit">Enviar</button>
          </form>
        </div>
    );
  }
}

export default Notifications;
