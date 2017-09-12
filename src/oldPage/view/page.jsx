import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';

//或者匿名
var actions = Reflux.createActions(["addItem","deleteItem"]);

//Store
var store = Reflux.createStore({

    listenables: actions, //更加简洁的写法

    getInitialState(){
        return {
            age: 0
        }
    },

    onAddItem: function(){
        this.trigger({age: 2});
    },

    onDeleteItem: function(){
        console.log("deleteItem")
    }

});

export default class Page extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            name: "no"
        }
    }

    // componentDidMount(){
    //     this.listenTo(store, this.onStatusChange); 
    // }
    
    // onStatusChange(data){
    //     this.setState(data)
    // }

    onClick(){
        actions.addItem();
    }

    render(){
        console.log("Page:", this.state);
        return <div>
            Render Old Page!
            <div onClick={this.onClick.bind(this)}>
                btn
                {this.state.addItem.age}
            </div>
        </div>
    }
}

ReactMixin.onClass(Page, Reflux.connect(store,"addItem"))
ReactMixin.onClass(Page, Reflux.connect(store,"deleteItem"))
// ReactMixin.onClass(Page, Reflux.ListenerMixin);