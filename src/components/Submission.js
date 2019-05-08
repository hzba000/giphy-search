import React from 'react';

//this array will house gif urls
let urlArray = [];

export default class Submission extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //click is false when on landing display and true when user has started using the app - toggles different render displays
            click: false,
            urlArray: null,
            searchTerm: null,
            emptyarray:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchGiphyData = this.fetchGiphyData.bind(this);
        this.firstClick = this.firstClick.bind(this);
    }

    firstClick(){
        this.setState({click:true});
    }

    //After getting user input, we send a fetch request using appropriate query parameters
    handleSubmit(event){
        event.preventDefault();
        let userSubmission = this.Submission.value.trim();
        if(userSubmission){
            this.Submission.value = '';
        }
        this.setState({searchTerm: userSubmission});
        this.fetchGiphyData(userSubmission);
    }

    fetchGiphyData(userSubmission){
        fetch(`https://sheltered-oasis-13181.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${userSubmission}&limit=24&api_key=OCCArgS2EYvkFFV3JhFhd64xt5zIKxDT`)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Sorry, an error occurred!');
        })
        .then(myJson => {
          urlArray = [];

          if(myJson.data.length < 1){
              this.setState({emptyarray:true});
          }

          if(myJson.data.length > 0){
              this.setState({emptyarray:false});
                        //The first for loop allows us to enter our data array, the second searches for the existence of images key, if it exists, we push it to our global array
          for(let i=0; i<myJson.data.length; i++){
            for(let key in myJson.data[i]){
                if(key==='images'){
                    urlArray.push(myJson.data[i][key].fixed_height.url);
                }
            }
        }
        this.setState({urlArray:urlArray});

          }

        });
    }


    render(){
        //Takes the image urls held in our global array and prepares them to be added to the DOM via JSX
        const images = urlArray.map(image=><div className="image-holder" key={image} ><a href={image} target="_blank" rel="noopener noreferrer"><img src={image} alt="gif-choice" /></a></div>);

        //First render view -- landing -- we see the search bar, welcome message and SANTA
        if(this.state.click===false){
            return(
                <div className="submission-holder">
                    <form className = "test" onSubmit = {this.handleSubmit}  >
                        <input placeholder="Look up something cool" ref={input => this.Submission = input}></input>
                        <button type="submit" onClick={this.firstClick}> Submit </button>
                    </form>
                    <div className="home-container"><img src="./santa.gif" alt="santa"/><h2>Start looking for fun gifs above!</h2></div>
                 </div>
            )
        }

        //Second render view - If there are no gifs in our global array and the user has clicked past the landing view, show no results
        if(this.state.emptyarray===true && this.state.click ===true){
            return(
                <div className="submission-holder">
                    <form className = "test" onSubmit = {this.handleSubmit}  >
                        <input placeholder="Look up something cool" ref={input => this.Submission = input}></input>
                        <button type="submit" onClick={this.firstClick}> Submit </button>
                    </form>
                    <div className="error-container"><h2>Hmmmm...didn't turn up any results! Try again.</h2></div>
                </div> 
            )
        }
        
        //Third render view - If gifs are available, render them to the screen
        else{
            return(
                <div className="submission-holder">
                    <form className = "test" onSubmit = {this.handleSubmit}  >
                        <input placeholder="Look up something cool" ref={input => this.Submission = input}></input>
                        <button type="submit" onClick={this.firstClick}> Submit </button>
                    </form>
                    <div className="image-flex-container">{images}</div>
                </div>
            )
        }
    }
}