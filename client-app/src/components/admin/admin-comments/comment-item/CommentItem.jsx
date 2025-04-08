import { Component } from "react"

export default class CommentItem extends Component {
    render() {
        return (
            <li>{this.props.content}</li>
        )
    }
}