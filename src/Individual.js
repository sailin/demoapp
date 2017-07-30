import React, { Component } from 'react';

class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {classes: [
      {time: '2017-07-30 16:00', title: "小动物的一天"},
      {time: '2017-08-01 20:30', title: "Let us go to school"}
    ]};
    this.buttonClick = this.buttonClick.bind(this);
  }

  send_message_to_sw(msg) {
    return new Promise(function(resolve, reject){
      // Create a Message Channel
      var msg_chan = new MessageChannel();

      // Handler for recieving message reply from service worker
      msg_chan.port1.onmessage = function(event){
        if(event.data.error){
          reject(event.data.error);
        }else{
          resolve(event.data);
        }
      };

      // Send message to service worker along with port for reply
      navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
    });
  }

  buttonClick() {
    this.send_message_to_sw("haha").then(m => {
      this.state.classes.push({time: '2017-08-02 10:30', title: m})
      this.forceUpdate();
    })
    // this.state.classes.push({time: '2017-08-02 10:30', title: "Another school"})
    // this.forceUpdate();
    // navigator.serviceWorker.controller.postMessage("Client 1 says '"+ 'haha' +"'");
    // function send_message_to_sw(msg){
    //   navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'");
    // }
  }


  render() {
    return(
      <div>
        <h3>1v1 classes:</h3>
        <ul>
          {this.state.classes.map((item, i) => {
            return <li key={item.time + i}> <span> {item.time}</span> <span>{item.title}</span></li>
          })}
        </ul>
        <button onClick={this.buttonClick}> Test Change</button>
      </div>
    );
  }
}

export default Individual;