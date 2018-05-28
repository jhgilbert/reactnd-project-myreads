import React from 'react'

class BookshelfSelector extends React.Component {
  handleShelfChange = (e) => {
    this.props.onShelfChange(this.props.book, e.target.value)
  }

  parseBookshelf = (book) => {
    if (!book.shelf) {
      return "none"
    } else {
      return book.shelf
    }
  }

  render() {
    const { book } = this.props
    console.log("book shelf is")
    console.log(book.shelf)

    if (!book.shelf) {
      book.shelf = "none"
    }

    return <div className="book-shelf-changer">
      <select value={this.parseBookshelf(book)} onChange={(e) => this.handleShelfChange(e)}>
        <option value="moveTo" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  }

}

export default BookshelfSelector
