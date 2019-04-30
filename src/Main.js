import React from 'react';

import Submission from './components/Submission';

//This Main component exists as a hub for connecting my various components together
//Because this assignment only asked for one real component, I am leaving this as a placeholder for future expansion
export class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div><Submission /></div>
        )
    }
}



