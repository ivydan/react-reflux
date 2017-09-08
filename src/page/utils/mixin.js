var commonMixin = {
    componentWillMount(){
        console.log("this is a componentWillMount!");
    },
    utilAdd: function(a, b){
        return a + b;
    }
}

export default commonMixin;