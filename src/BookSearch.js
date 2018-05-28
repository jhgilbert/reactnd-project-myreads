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
    this.searchBooks(searchTerm);
  }

  addShelfData = (allBooks, searchResults) => {
    let parsedResults = searchResults.map((book) => {
      for (var i = 0; i < allBooks.length; i++) {
        if (allBooks[i].id === book.id) {
          book.shelf = allBooks[i].shelf
          return book
        }
      }
      return book
    } )
    return parsedResults
  }

  searchBooks = (query) => {
    let searchResults
    if (query === "") {
      this.updateSearchResults([])
      return
    }

    BooksAPI.search(query)
      .then((result) => {
        if (result.error === "empty query") {
          searchResults = []
        } else {
          searchResults = result
        }
        this.updateSearchResults(searchResults)
      })
  }

  updateSearchResults = (searchResults) => {
    BooksAPI.getAll()
      .then((books) => {
        searchResults = this.addShelfData(books, searchResults)
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
