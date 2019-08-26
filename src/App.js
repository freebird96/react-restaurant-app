import React, {Component} from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { thisExpression } from '@babel/types';

class App extends Component {

  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=4566d51f26552bca4b6f1eb7ef382fd4",
    base_url: "https://www.food2fork.com/api/search?key=4566d51f26552bca4b6f1eb7ef382fd4",
    details_id: 35382,
    pageIndex: 1,
    search: "",
    query: '&q=',
    error: ''
  };

  async getRecipes(){ 
    try{
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if(jsonData.recipes.length === 0){
        this.setState(()=>{
          return {error: 'Sorry no match found'};
        })
      } else {        
        this.setState(()=>{
          return {
            recipes: jsonData.recipes
          }
        });
      }
    }catch(error) {
      console.log(error);
    }
  }

  //lifecycle method in react is the one below
  componentDidMount(){
    this.getRecipes();
  }

  displayPage = (index) =>{
    switch(index){
      default:
        case 1:
          return (
            <RecipeList recipes = {this.state.recipes}
            handleDetails = {this.handleDetails}
            value = {this.state.search}
            handleChange ={this.handleChange}
            handleSubmit = {this.handleSubmit}
            error = {this.state.error}
            />
          )
          
        case 0:
          return (
            <RecipeDetails 
            id ={this.state.details_id}
            handleDetails = {this.handleDetails}
            />
          )           
    }
  };

  handleIndex =(index) => {
    this.setState ({
      pageIndex: index
    });
  };

  handleDetails = (index, id) =>{
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };
  
  handleChange = e =>{
    
    this.setState({
      search: e.target.value
    }, ()=>{
      console.log(this.state.search);
    });
  };


  handleSubmit = e =>{
    e.preventDefault();
    const {base_url, query, search} = this.state
    this.setState({
        url:`${base_url}${query}${search}`,
        search: ""      
    }, () =>{
      this.getRecipes();
    })
  };

    render () {     
      return (
        <React.Fragment>
          {this.displayPage(this.state.pageIndex)}             
        </React.Fragment>
    );
  }
}

export default App;
