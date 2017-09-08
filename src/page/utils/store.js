import Reflux from 'reflux';
import Actions from './actions';

//数据ｔｒｅｅ
let stateTree = {
    name: ""
}

export default class DataStore extends Reflux.Store{
    constructor(){
        super();
        this.state = stateTree;
        this.listenables = Actions;
    }

    onHandleChangeName(i){
        this.setState({name: i});
    }
}
