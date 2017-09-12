import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';

//创建Action
// var action = Reflux.createAction({
//     actionName: "addItem",
//     asyncResult: true,  //设置为true的时候，自动创建两个名为completed和failed的子action
//     sync: false,  //设置为true，指定action的默认出发方式为同步
//     children: ['success'] //用户创建子action
// });

//简化
// var action = Reflux.createAction('addItem');

//或者匿名
var addItemAction = Reflux.createActions(["addItem","deleteItem"]);

//使用
// addItemAction({a:1});

// action('hello world', 'Love');

// addItemAction.listen(function(url){
//     //listen: Action 消息订阅
//     console.log("URL");
// });


// addItemAction("../../add");

//trigger 同步触发Action消息，在触发具体的消息之前，首先会执行preEmit和shouldEmit
//preEmit 返回值将作为shouldEmit函数的入参，用于修改payload
//shouldEmit 返回的值将作为是否真正出发消息的标志

//Store
var store = Reflux.createStore({
    // init: function(){
    //     this.item = [1]
    //     console.log("This is a Store!");

    //     this.data = {}; //存储数据

    //     // this.listenTo(addItemAction, this._onAction);
    //     //或者
    //     //this.listenTo(action, '_onAction');
    //     //或者
    //     //addItemAction.listen(this._onAction);

    //     this.listenToMany(addItemAction);
    // },

    listenables: addItemAction, //更加简洁的写法

    getInitialState(){
        return {
            age: 0
        }
    },

    item: [],

    onAddItem: function(){
        this.item.push(2);
        console.log("ITEM", this.item);
        this.trigger({age: 222});
    },

    onDeleteItem: function(){
        console.log("deleteItem")
    }

});

// addItemAction("Hello world!");

// addItemAction.addItem();

export default class Page extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            name: "mm"
        }
    }

    componentDidMount(){
        this.listenTo(store, this.onChange); 
        // this.unsubscribe = store.listen(this.onStatusChange); //然而还有更简单的写法，就是通过Reflux.connect()来写
        //通过store.listen来进行消息订阅， 而实际上，View本身并没有消息订阅的能力，
        //所以Reflux提供了一个minxin， 叫做Reflux.ListenerMixin.
        //1.给View添加ListenerMethods集合里的方法。是View具备了消息订阅的能力。
        //2.在组件销毁componentWillUnmount生命周期方法里，对之前监听的Action自动解绑
    }
    

    onChange(data){
        this.setState(data)
    }

    onClick(){
        console.log(111);
        addItemAction.addItem();
    }

    render(){
        console.log("Page:", this.props, this.state);
        return <div>
            Render Old Page!
            <div onClick={this.onClick.bind(this)}>
                btn
                {this.state.age}
            </div>
        </div>
    }
}

ReactMixin.onClass(Page, Reflux.ListenerMixin)