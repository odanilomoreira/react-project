import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
    // this.state =
  }
  state = {
    persons: [
      {id: 'ofgsdoifsfo', name:'Max', age: 20},
      {id: 'gdfmgoidnda', name: 'Manu', age: 29},
      {id: 'vcklbmncbky', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount(){
    console.log('[App.js] ComponentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }
  
  nameChangeHandler = (event, id) => { 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id; // true or false
    }); 
    // const person = this.state.persons[personIndex]; // mutate state directly
    const person = {...this.state.persons[personIndex]}; // making a copy of the object
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); //.slice() make a copy of the array
    const persons = [...this.state.persons]; // alternative for the line above
    persons.splice(personIndex, 1); // remove one element from the array
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
              persons={this.state.persons} 
              clicked={this.deletePersonHandler} 
              changed={this.nameChangeHandler} />;
    }

    return (
      <div className={classes.App}>
          <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
          {persons}
      </div>
    );
  }
}

export default App;
