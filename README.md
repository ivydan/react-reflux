# react-reflux

简单的实例 通过使用React Reflux webpack ES6 来实现多页应用。

**代码运行**
### npm install
### npm run start
Project is running at http://localhost:8080/common/page.html

## page页面

* 使用 Reflux.Component --ES6写法

#### 实例：

import React from 'react';

import Reflux from 'reflux';

import ReactMixin from 'react-mixin';

import commonMixin from '../utils/mixin';

import Actions from '../utils/actions';

import DataStore from '../utils/store';

export default class Page extends Reflux.Component{

    constructor(props){
        super(props);
        this.store = DataStore;
        console.log("TEST// React-Mixin :", this.utilAdd(20, 45));
    }

    componentDidMount(){
        Actions.handleChangeName("www");
    }
    
    render(){
        return (
            <div>{this.state.name}</div>
        );
    }
}

ReactMixin.onClass(Page, commonMixin);

## oldPage页面

* 使用常用写法 --ES6写法

#### 实例：
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

ReactMixin.onClass(Page, Reflux.connect(store,"addItem"));

ReactMixin.onClass(Page, Reflux.connect(store,"deleteItem"));