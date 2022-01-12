import '../App.css';
import React from "react";

class ReviewsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            title: this.props.data.title,
            message: this.props.data.message,
            rating: this.props.data.rating
        }
        console.log(this.state, this.props)

        this.changeEditState = this.changeEditState.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }

    changeEditState() {
        this.setState({edit: !this.state.edit});
    }

    saveChanges() {

        fetch(`http://localhost:3000/comment/${this.props.data._id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                message: this.state.message,
                rating: this.state.rating,
            })
        }).then(response => response.json().then(data => {
        }))

        this.setState({edit: !this.state.edit});
    }

    changeTitle(event) { this.setState({title: event.target.value}) }
    changeMessage(event) { this.setState({message: event.target.value}) }
    changeRating(event) { this.setState({rating: event.target.value}) }

    render() {
        if (this.state.edit) return (
            <div className="review">
                <input type="text" value={this.state.title} onChange={this.changeTitle}/>
                <input type="number" value={this.state.rating} onChange={this.changeRating}/>
                <textarea onChange={this.changeMessage}>{this.state.message}</textarea>
                <button onClick={this.saveChanges}>Save</button>
            </div>
        );
        else
            return (
                <div className="review">
                    <h3>{this.props.data.title}</h3><a href="#" onClick={this.changeEditState}>[Edit]</a>
                    <p>Given {this.props.data.rating} / 10 Stars by: {this.props.data.user.username}</p>
                    <p>{this.props.data.message}</p>
                </div>
            );
    }
}

export default ReviewsList;
