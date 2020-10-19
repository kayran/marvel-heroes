import React, {Component} from 'react';

import api from './api/service';
import Header from './components/header/header';


import './App.css';
import HeroList from './components/heroList/heroList';

const FAVORITE_LIMIT = 5;

class App extends Component {

  constructor() {
    super();

    this.state = {
      heroList: [],
      searchText: '',
      sort:'name',
      favorites: [],
      onlyFavorite: false,
      fetchingHero: false,
      canFavorite: true,
    };
  }

  async componentDidMount() {
    this.setState({fetchingHero:true});
    const heroList = await api.getHeroes();
    this.setState({heroList, fetchingHero:false});

  }

  getHeroBasedOnState = async () =>{
    console.log(this.state.onlyFavorite)
    if(this.state.onlyFavorite){
      return await api.getFavoriteHeroes(this.state.favorites, this.state.sort);
    }
    return await api.getHeroes(this.state.searchText, this.state.sort);
  }

  searchHero = async (searchText) => {
      if(this.state.fetchingHero){
        return false;
      }
      await this.setState({fetchingHero:true, searchText, heroList:[]});
      const heroList = await this.getHeroBasedOnState()
      this.setState({heroList, fetchingHero:false});
  }

  changeSort = async (sort) => {
    if(this.state.fetchingHero){
      return false;
    }
    await this.setState({fetchingHero:true, sort, heroList:[]});
    const heroList = await this.getHeroBasedOnState()
    this.setState({heroList, fetchingHero:false});
  }

  changeFavorites = async () => {
    if(this.state.fetchingHero){
      return false;
    }
    await this.setState({
      fetchingHero:true, 
      onlyFavorite:!this.state.onlyFavorite, 
      heroList:[]
    });
    const heroList = await this.getHeroBasedOnState()
    this.setState({heroList, fetchingHero:false});
  }

  addFavorite = async (id) => {
    if(!this.state.canFavorite){
      return false;
    }
    const favorites = Array.from(new Set([...this.state.favorites, id]))
    const canFavorite = favorites.length < FAVORITE_LIMIT;
    this.setState({favorites, canFavorite});
  }

  removeFavorite = async (id) => {
    const favorites = this.state.favorites.filter(favorite => favorite !== id)
    const canFavorite = favorites.length < FAVORITE_LIMIT;
    this.setState({favorites, canFavorite});
  }

  render() {
    return (
      <div className="App">
        <Header onSearch={searchText=>this.searchHero(searchText)}/>
        
        <HeroList 
          heroList={this.state.heroList} 
          sort={this.state.sort}
          favorites={this.state.favorites}
          fetchingHero={this.state.fetchingHero}
          changeSort={sort => this.changeSort(sort)}
          changeFavorites={() => this.changeFavorites()}
          addFavorite={id => this.addFavorite(id)}
          removeFavorite={id => this.removeFavorite(id)}
        />
        <footer/>
      </div>
    );
  }
}

export default App;
