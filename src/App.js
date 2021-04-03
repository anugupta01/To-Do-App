import React from 'react';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
library.add(faEdit)
library.add(faPlus)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],hashTag : null,inputHashText: '',
      showTag:false,filterSymbol:[],
      currentItem:{
        text:'',
        key:'',
        completed:false,
        tags:[],
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
        completed :false,
        tags:[]
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now(),
        completed: false,
        tags:[]
      }
    })
  }

  addInputTag = (item) =>{
     this.setState({
       showTag:true,
       hashTag:item
    })
   }

   handleTagInput=(e)=>{
      this.setState({
        inputHashText:'#'+ e.target.value,
      })
   }

   addTag = () => {
     const tagItem = this.state.hashTag;
     const items = this.state.items;
      tagItem.tags.push(this.state.inputHashText);
      this.setState({
      items:items,
       showTag:false
     })
   }

   filterHashTag=(tag)=>{
     const items = this.state.items
       const filterSymbol = [];
       items.forEach((item)=>{
           for(let t of item.tags){
               if(t===tag){ filterSymbol.push(item); break;}
           }
       })
this.setState({
   filterSymbol:this.state.items,
   items : filterSymbol
})
   }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })
  }

  completeItem(item){
    const items = this.state.items;
    let currentItem = items.indexOf(item)
    const completedItem = items[currentItem];
    completedItem.completed = true;
    this.setState( {
     items : items
    });
  }

  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      id: id,
      editItem: true,
      tags:[]
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  setUpdate(text,key){
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
          <input  type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>

        <form id="clear-form" onClick={this.clearList}>
          <button type="button">Clear All</button></form>
        <p>{this.state.items.text}</p>
        {this.state.showTag && <div id="to-do-forms"><input type="text" placeholder="Add tag" onChange={this.handleTagInput} ></input>
          <button type="submit" onClick={() => this.addTag()}>HashTag</button></div>}
        <ListItems items={this.state.items} deleteItem={this.deleteItem} completeItem={this.completeItem}
                     handleEdit={this.handleEdit} setUpdate={this.setUpdate} addInputTag={this.addInputTag} filterHashTag={this.filterHashTag}/>

      </header>
    </div>
  );
 }
}

export default App;
