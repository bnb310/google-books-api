import React, { Component } from  'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printType: 'all',
      bookType: 'all',
      searchTerm: ' ',
      results: [],
    };
  }

  searchTermChanged(searchTerm) {
    this.setState({searchTerm})
  }

  printTypeChanged(printType) {
    this.setState({printType})
  };

  ebookTypeChanged(ebookType) {
    this.setState({
      ebookType
    })
  }

displayBooks () {
  let searchResults = this.state.results.map((results, index) => {
      return(
        <div>
          <h2 key = {this.state.results.items.id}>{this.state.results.items.volumeInfo.title}</h2>
          <p>{this.state.results.items.volumeInfo.authors}</p>
          <button className = 'more'>View Details</button>
        </div>
      )
    
  });   
  
}


handleSubmit (e) {
  e.preventDefault();
  const apiKey = 'AIzaSyDmIrNEuMPwAX7J-3SOswjopfm7aWzXIHU'
  const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}&key=${apiKey}`;
  
  fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then(data => {
        let searchResults = data.items.map(item => {
          return (
            <div>
              <h2 key={item.id}>{item.volumeInfo.title}</h2>
              <p>{item.volumeInfo.authors}</p>
            </div>
          );
        });
        this.setState({
          results: searchResults
        });
      });
}

render () {
  return (
    <div className="App">
      <form className = 'searchBar' onSubmit = {e => this.handleSubmit(e)}>
      <label htmlFor = 'searchBox'>Search:</label>
      <input type = 'text' id = 'searchTerm' onChange = {e => this.searchTermChanged(e.target.value)} />
      <button type = 'submit'>Search</button>

      <select className = 'printType' id = 'printType' onChange = {e => this.printTypeChanged(e.target.value)}>
        <option value = 'all'>All</option>
        <option value = 'books'>Boooks</option>
        <option value = 'magazines'>Magazines</option>
      </select>

      <select className = 'ebookType' id = 'ebookType' onChange = {e => this.ebookTypeChanged(e.target.value)}>
        <option value = ''>All</option>
        <option value = 'allEbooks'>EBooks</option>
        <option value = 'freeEbooks'>Free EBooks</option>
        <option value = 'paidEbooks'>Paid EBooks</option>
      </select>
      </form>
      <div className = 'results'>
        ({this.state.results.length} = 0) ? 'Search to see a list of books' : return ({this.state.results})
        
        
      </div>
    </div>
  );
}
};


export default App;
