if (module.hot) {
  module.hot.accept();
}

import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

//pure component that embeds the html5 video player. it sets the src to props.videoid
const VideoPlayer = (props) => {

return (
<video autoPlay controls src = { "video/" + props.videoid}>

</video>  
);
}

//component which consits of text field, button and the VideoPlayer component
class VideoPlayerInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {video:false,videoText:""};
  };


changeText(e){
this.setState({videoText:e.target.value});

};


playClick(){
  this.setState({video:this.state.videoText});
  console.log(this.state.video)
};

  render(){
    return(
      <div>
        <input type="text" onChange={this.changeText.bind(this)} text={this.state.videoText}/>
        <button onClick={this.playClick.bind(this)}> Play this video </button>
        <br />
       <VideoPlayer videoid={this.state.video} />
      
      </div>
    )
  }
};


class APP extends React.Component {
  constructor(props){
    super(props);
  }
 async componentDidMount() { 
   
  
 }
  render(){
    return (
      <div>
      for demo try video id : 001
      <br /> <br />
      <VideoPlayerInterface />
       
      </div>  
    )
  }
};


ReactDOM.render(<APP /> , document.getElementById('root'))