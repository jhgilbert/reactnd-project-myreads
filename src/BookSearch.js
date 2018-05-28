import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

class BookSearch extends React.Component {
  state = {
    searchTerm: '',
    books: []
  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState(
      {searchTerm: event.target.value}
    )
    if (this.state.searchTerm.length > 0) {
      this.searchBooks(this.state.searchTerm);
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        if (books.error === "empty query") {
          books = []
        }
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    const { books, searchTerm } = this.state
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
            <Bookshelf title="Search Results" books={books} onShelfChange={this.props.onShelfChange} />
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
