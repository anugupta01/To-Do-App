import React from 'react';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
library.add(faCheck)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:'',
        completed:false
      }
    }

    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.clearList = this.clearList.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:'',
        completed :false
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now(),
        completed: false
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    console.log("Anu Delete")
    this.setState({
      items: filteredItems
    })
  }

  completeItem(item){
    console.log("key:",this.state.items);
    const items = this.state.items;
    let currentItem = items.indexOf(item)
    console.log("currentItem",currentItem)
    const completedItem = items[currentItem];
    completedItem.completed = true;
    this.setState( {
     items : items
    });

    // const newTasks = this.state.items.filter(item =>
    //     item.key.text===true);
    // this.setState({
    //   items: newTasks.push(this)
    // })
    // console.log("newTasks:",newTasks);
  }

  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      id: id,
      editItem: true
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  setUpdate(text,key){
    console.log("items:",this.state.items);
    const items = this.state.items;
   items.map(item=>{
      if(item.key===key){
        item.text= text;
      }
    })
   this.setState({
      items: items
    })
  }

 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>

        <form id="clear-form" onClick={this.clearList}>
          <button type="button">Clear All</button></form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} completeItem={this.completeItem}
                     handleEdit={this.handleEdit} setUpdate={this.setUpdate}/>
      </header>
    </div>
  );
 }
}

export default App;
