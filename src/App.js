import React, { Component } from  'react';
import './App.css';

const options = {
  method: 'GET',
  body: JSON.stringify(),
  headers: {
    
  }
}

function displayBooks (response) {
    for (let i = 0; i < response.items.length; i++) {
      return (
      <div className = 'results'>
      <h2>{response.items[i].title}</h2>
      <button className = 'more'>View Details</button>
      </div>
    );
    }
    
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printType: 'all',
      bookType: 'all',
      results: [],
    };
  }

//  printTypeChanged {
//    this.setState({

//    })
//  };

//  ebookTypeChanged {
//    this.setState({

//    })

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
  const searchTerm = 'harry-potter'
  const apiKey = 'AIzaSyDmIrNEuMPwAX7J-3SOswjopfm7aWzXIHU'
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;
  
  fetch (url)
  .then (response => {
    if(!response.ok) {
        throw new Error('Something went wrong, please try again later');
      };
    return response.json();   
  })
  .then (data => {
    let results = data.response.map(items => {
      return(
        <div>
          <h2 key = {items.id}>{items.volumeInfo.title}</h2>
          <p>{items.volumeInfo.authors}</p>
          <button className = 'more'>View Details</button>
        </div>
      )
    
  });  
    this.setState({
      results: results
    })
  })
}

render () {
  return (
    <div className="App">
      <form className = 'searchBar' onSubmit = {e => this.handleSubmit(e)}>
      <label htmlFor = 'searchBox'>Search:</label>
      <input type = 'text' />
      <button type = 'submit'>Search</button>

      <select className = 'printType' onChange = {e => this.printTypeChanged(e.target.value)}>
        <option value = 'all'>All</option>
        <option value = 'books'>Boooks</option>
        <option value = 'magazines'>Magazines</option>
      </select>

      <select className = 'ebookType' onChange = {e => this.ebookTypeChanged(e.target.value)}>
        <option value = ''>All</option>
        <option value = 'allEbooks'>EBooks</option>
        <option value = 'freeEbooks'>Free EBooks</option>
        <option value = 'paidEbooks'>Paid EBooks</option>
      </select>
      </form>
    </div>
  );
}
};


export default App;
