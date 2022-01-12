import '../App.css';
import React from "react";
import ReviewInput from "./ReviewInput";
import Review from "./Review";

class ReviewsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
        }
        var url = `http://127.0.0.1:3000/comment/book/${this.props.title}`;

        fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        }).then(response => response.json().then(data => {
            this.setState({reviews: data})
        }));

    }

    render() {

        const reviws = this.state.reviews.map((review, index) =>
            <Review data={review}/>
        );

        return (
            <div className="review-list">
                <h3>Reviews ({this.state.reviews.length})</h3>
                {reviws}
                <ReviewInput book_title={this.props.title}></ReviewInput>
            </div>

        );
    }
}

export default ReviewsList;
