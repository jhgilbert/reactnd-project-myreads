import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

class BookSearch extends React.Component {
  state = {
    searchTerm: '',
    searchResults: []
  }

  handleInputChange = (event) => {
    event.preventDefault()
    let searchTerm = event.target.value
    this.setState({searchTerm})
    this.searchBooks(searchTerm)
  }

  addShelfData = (shelvedBooks, searchResults) => {
    let parsedResults = searchResults.map((book) => {
      // we use a for-loop here so we can stop the loop
      // when we've found what we're looking for
      for (var i = 0; i < shelvedBooks.length; i++) {
        if (shelvedBooks[i].id === book.id) {
          book.shelf = shelvedBooks[i].shelf
          return book
        }
      }
      // if not found in shelved books,
      // leave book in its original state
      return book
    } )
    return parsedResults
  }

  searchBooks = (query) => {
    // return empty results set if input is blank
    if (query === "") {
      this.updateSearchResults([])
      return
    }

    // otherwise, send a query to the API
    BooksAPI.search(query)
      .then((result) => {
        let searchResults
        if (result.error === "empty query") {
          searchResults = []
        } else {
          searchResults = result
        }
        this.updateSearchResults(searchResults)
      })
  }

  updateSearchResults = (searchResults) => {
    // pull all shelved books to update search results
    // with shelf data
    BooksAPI.getAll()
      .then((shelvedBooks) => {
        searchResults = this.addShelfData(shelvedBooks, searchResults)
        this.setState(() => ({
          searchResults
        }))
      })
  }

  render() {
    const { searchTerm, searchResults } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => { this.handleInputChange(event) }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Bookshelf title="Search Results" books={searchResults} onShelfChange={this.props.onShelfChange} />
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
