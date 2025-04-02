import { Component } from "react"
import { UserContext } from "../../contexts/UserContext"
import {ErrorBoundary} from "react-error-boundary"


export default class Admin extends Component {
    render () {

        return (
            <ErrorBoundary>
                <UserContext.Consumer>
                    {(context) => {
                       
                       return (<div className="card shadow-lg max-w-xs mx-auto text-center font-sans bg-white p-6 rounded-lg transform transition-transform hover:scale-105">
                        <img src="https://www.kindpng.com/picc/m/21-211456_user-icon-hd-png-download.png" alt="John" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300"/>
                        <h1 className="title text-gray-800 text-2xl font-semibold mb-2">{context.email}</h1>
                        <p className="text-gray-600 text-sm mb-2">{context.username}</p>
                        <p className="text-gray-500 text-xs mb-6">Member</p>         
                        </div>
                       )   
                }}
                </UserContext.Consumer>
            </ErrorBoundary>
        )
    }
}



