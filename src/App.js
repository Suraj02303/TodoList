import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layouts/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import About from './components/pages/About';
import Test from './components/PROPTYPES';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
class App extends React.Component{
  state = {
    todos: [
        { 
          id: uuidv4(),
          title: 'Take out the trash',
          completed: false
        },
        { 
          id: uuidv4() ,
          title: 'Dinner wth wife',
          completed: false
        },
        { 
          id: uuidv4(),
          title: 'Meeting with boss',
          completed: false
        }
    ]
  }

  componentDidMount(){
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10').then(res=>this.setState({todos: res.data}))
  }
//Toggle complete
  markComplete=(id)=>{
    this.setState({todos: this.state.todos.map(todo =>{
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  //Delete Todo
  /*Here 3 dots is spread operator*/
  //Delete Todo
  delTodo =(id)=>{
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res=>this.setState({ todos: [...this.state.todos.filter(
      todo=>todo.id !== id)]}));
  }

  

  //Add Todo
  addTodo=(title)=>{
    axios.post('http://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    }).then(res=>this.setState(
      {todos: [...this.state.todos, res.data]})
    );
  }
  /*for local machine
  //Add Todo
  addTodo = (title)=>{
    const newTodo ={
      id: uuidv4(),
      title,
      completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]})
  }*/
  render(){
      return (
        <Router>
          <div className ="App">
            <div className =" container">
                <Header/>
                <Route exact path ="/" render={props =>(
                  <React.Fragment>
                    <AddTodo addTodo ={this.addTodo}/>
                    <Todos todos={this.state.todos} 
                    markComplete={this.markComplete}
                    delTodo ={this.delTodo}/>
                  </React.Fragment>
                )}/>
                <Route path="/about" component={About}/>
                /*here exact keyword is used to show the only path searched and not the other(one or more)*/
                /*setting the path*/
            </div>
          </div>
        </Router>  
    );
  }
}

export default App;