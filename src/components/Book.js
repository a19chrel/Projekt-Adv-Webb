import '../App.css';
import React from "react";
import ReviewsList from "./ReviewsList";

class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showFull: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = () => {
        this.setState({
            showFull: !this.state.showFull
        })
    };

    render() {

        const authors = this.props.data.authors.map((author, index) =>
            <a key={index} href={"?author=" + author}>{author}</a>
        );
        const category = this.props.data.categories.map((category, index) =>
            <a key={index} className="tag" href={"?category=" + category}>{category}</a>
        );

        if (this.state.showFull)
            return (
                <div className="book-full">
                    <div className="flex book-content">
                        <img className="book-img" src={this.props.data.thumbnailUrl} alt={this.props.data.title}/>
                        <div className="info-content">
                            <h2 onClick={this.handleClick}>{this.props.data.title}</h2>
                            <div>{category}</div>
                            <p className="propertys"><strong>Authors:</strong> {authors}</p>
                            <p><strong>Pages:</strong> {this.props.data.pageCount}</p>
                            <p><strong>Description:</strong> {this.props.data.longDescription}</p>
                        </div>
                    </div>
                    <ReviewsList title={this.props.data.title}></ReviewsList>
                </div>

            );
        else
            return (
                <div className="flex book-row">
                    <img className="book-img" src={this.props.data.thumbnailUrl}  alt={this.props.data.title}/>
                    <div className="info-content">
                        <h2 onClick={this.handleClick}>{this.props.data.title}</h2>
                        <div>{category}</div>
                        <p className="propertys"><strong>Authors:</strong> {authors}</p>
                        <p><strong>Description:</strong> {this.props.data.shortDescription ? this.props.data.shortDescription : "There is no short description for this book, please click on the book to read the long description!"}</p>
                    </div>
                </div>
            );
    }
}

export default Book;
