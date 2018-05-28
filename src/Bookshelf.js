import React from 'react'
import BookTile from './BookTile'

class Bookshelf extends React.Component {
  render() {
    const { title, books, onShelfChange } = this.props

    return <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            console.log(book)
            return <li key={book.id}><BookTile book={book} onShelfChange={onShelfChange} /></li>
          })}
        </ol>
      </div>
    </div>
  }
}

export default Bookshelf
