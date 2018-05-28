import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }

  componentDidMount() {
    this.refreshBookData()
  }

  // fetch data for all books
  refreshBookData() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
      .then((res) => {
        this.refreshBookData()
      })
  }

  render() {
    const { books } = this.state
    const shelves = [
      {id: "currentlyReading", title: "Currently Reading"},
      {id: "wantToRead", title: "Want To Read"},
      {id: "read", title: "Read"},
    ]

    return (
      <div className="app">

        { /* home route */ }
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((shelf) => {
                  return <Bookshelf
                            key={shelf.id}
                            title={shelf.title}
                            books={books.filter((book) => {return book.shelf === shelf.id})}
                            onShelfChange={this.changeShelf}
                          />
                })}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        { /* search route */ }
        <Route path='/search' render={() => (
          <BookSearch onShelfChange={this.changeShelf} />
        )} />

      </div>
    )
  }
}

export default BooksApp
