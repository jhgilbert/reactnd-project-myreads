import React from 'react'
import BookshelfSelector from './BookshelfSelector'

class BookTile extends React.Component {

  render() {
    const { title, authors } = this.props.book
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && book.imageLinks.smallThumbnail && (
            <div
              className="book-cover"
              style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
            </div>
          )}
          <BookshelfSelector book={book} onShelfChange={this.props.onShelfChange} />
        </div>
        <div className="book-title">{title}</div>
        {authors && authors.map((author) => {
          return <div key={author} className="book-authors">{author}</div>
        })}
      </div>
    )
  }
}

export default BookTile
