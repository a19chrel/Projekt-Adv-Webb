import '../App.css';
import React from "react";

class ReviewInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            rating: 0,
            user: ""
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.afterSubmission = this.afterSubmission.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleMessageChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleRatingChange(event) {
        this.setState({
            rating: event.target.value
        });
    }

    handleUserChange(event) {
        this.setState({
            user: event.target.value
        });
    }

    afterSubmission(event) {
        event.preventDefault();

        fetch("http://127.0.0.1:3000/comment/", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                book_title: this.props.book_title,
                title: this.state.title,
                message: this.state.message,
                rating: this.state.rating,
                user: this.state.user
            })
        }).then(response => response.json().then(data => {
        }));

    }

    render() {
        return (
            <div>
                <form onSubmit={this.afterSubmission}>
                    <label> Title
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                    </label>
                    <label>
                        Comment
                        <textarea
                            name="message"
                            onChange={this.handleMessageChange}>
                            {this.state.message}
                        </textarea>
                    </label>
                    <label> Rating
                        <input
                            type="number"
                            name="rating"
                            value={this.state.rating}
                            onChange={this.handleRatingChange}
                        />
                    </label>
                    <label> User
                        <input
                            type="text"
                            name="user"
                            value={this.state.user}
                            onChange={this.handleUserChange}
                        />
                    </label>
                    <input className="button" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default ReviewInput;
