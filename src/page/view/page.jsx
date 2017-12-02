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
        console.log(this.state);
        debugger;
        Actions.handleChangeName("www");
    }
    
    render(){
        return (
            <div>{this.state.name}</div>
        );
    }
}

ReactMixin.onClass(Page, commonMixin);
