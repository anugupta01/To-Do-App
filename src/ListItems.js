import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';

function ListItems(props){
    const items = props.items;
    const listItems = items.map(item =>
   {
       return <div className="list" key={item.key}>
     <p>
         <input style = {{textDecoration: item.completed ? "line-through":""}}
             type="text" id={item.key} value={item.text} onChange={(e)=>{
             props.setUpdate(e.target.value,item.key)}}/>

        <FontAwesomeIcon className="faicons" onClick={() => {
            props.deleteItem(item.key)}} icon="trash" />


         <FontAwesomeIcon className="favicons" onClick={() => {
             props.completeItem(item)}} icon="edit" />

         <FontAwesomeIcon className="fav" onClick={() => {props.addInputTag(item)}} icon="plus" />

     </p>
           <p className="row" onClick={()=>{props.filterHashTag(item.tags[0])}}>{ item.tags.length>0 && item.tags[0]}</p>
           <p className="row" onClick={()=>{props.filterHashTag(item.tags[1])}}>{item.tags.length>1 && item.tags[1]}</p>
           <p className="row" onClick={()=>{props.filterHashTag(item.tags[2])}}>{item.tags.length>2 && item.tags[2]}</p>
    </div>})
    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {listItems}
        </FlipMove>
    
    </div>;
  }

  export default ListItems;
