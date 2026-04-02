import { Component } from "react";
import request from "../../../utils/request";
import CommentItem from "./comment-item/CommentItem";

const commentsURL = 'http://localhost:3030/data/comments'


export default class AdminComments extends Component {

    // invoke constructor of class component in order to define state
    constructor(props) {
        super(props)
        // invoke the constructor of the base class component by invoking super(props);

        this.state = {
            comments: [{text: 'Test test'}],
            name: 'Pesho'
        }
    }

    // lifecycle method in React Class components 
    // runs once after the component has been mounted (inserted into the DOM)
    async componentDidMount(){
      
      const comments = await request.get(commentsURL);
       
        // Update component's state with the fetched comments
    this.setState({comments},() => {
        console.log('State after state update is:', this.state)

    })
    }

    /*
    Invoked immediately after a component is mounted (inserted into the tree).
    Initialization that required DOM nodes should go here.
    */

    render() {
        return (
            <ul>
                {
                    this.state.comments.map(comment => <CommentItem key={comment._id} content={comment.content}/>)
                }       
            </ul>
        );
    }

}

// Hooks cannot be used in class components

/*
    State in Class Components

    - In React, class components traditionally manage their own state using the this.state property
*/