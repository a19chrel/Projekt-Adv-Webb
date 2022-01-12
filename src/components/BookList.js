import '../App.css';
import React from "react";
import Book from "./Book";

class BookList extends React.Component {

    render() {

        const list = this.props.data.map((obj, index) =>
            <Book key={index} data={obj}></Book>
        );
        return (
            <div className="forecast container">
                <div>{list}</div>
            </div>
        );
    }
}

export default BookList;
