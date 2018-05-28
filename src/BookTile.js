import React from 'react'

class BookTile extends React.Component {

  handleShelfChange = (e) => {
    this.props.onShelfChange(this.props.book, e.target.value)
  }

  render() {
    const { title, authors } = this.props.book
    const { book } = this.props
    const thumbnail = this.props.book.imageLinks.smallThumbnail
    console.log(thumbnail)
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => this.handleShelfChange(e)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors.map((author) => {
          return <div key={author} className="book-authors">{author}</div>
        })}
      </div>
    )
  }
}

export default BookTile
