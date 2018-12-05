import React, {Component} from 'react';


class Likes extends Component {
    constructor(){
        super()
        this.state={
            clicks:0
        }
    }
    render() {
        return (
            <button>{this.props.count}</button>
        );
    }
}

export default Likes;