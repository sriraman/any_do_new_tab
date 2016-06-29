import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
require('./css/style.css');

class TaskList extends Component {
	render() {
		return (
			<ul className="taskList">
				{this.props.tasks.map((task,index) => {
					return <li key={index} className={(task.status=="CHECKED")?"checked":""}> {task.title} </li>
				})}
			</ul>
		)
	}
}

class Status extends Component {
	render(){
		switch(this.props.status){
			case "":
				return <div> </div>
			case "LOADING":
				return <div className="loading"> Loading... </div>
			case "UNAUTHORIZED":
				return <a href="http://web.any.do" className="login"> Login with Any.Do </a>
		}
	}
}

@observer
class App extends Component {
  render() {
	console.log("App rendering")
    return (
      <div id="tasks">
		<h1> {this.props.appState.heading} </h1>
		<Status status={this.props.appState.status}/>
		<TaskList tasks={this.props.appState.getTodaysTasks} />
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }

  addData = () => {
	  this.props.appState.addData();
  }
};

export default App;
