import React from 'react'

class BookshelfSelector extends React.Component {
  handleShelfChange = (e) => {
    this.props.onShelfChange(this.props.book, e.target.value)
  }

  render() {
    const { book } = this.props

    return <div className="book-shelf-changer">
      <select value={book.shelf} onChange={(e) => this.handleShelfChange(e)}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  }

}

export default BookshelfSelector
