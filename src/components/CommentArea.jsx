import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

//class CommentArea extends Component {
//  state = {
//    comments: [],
//    isLoading: true,
//    isError: false,
//  }
//
//  componentDidMount = async () => {
//    try {
//      let response = await fetch(
//        'https://striveschool-api.herokuapp.com/api/comments/' +
//          this.props.asin,
//        {
//          headers: {
//            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTk4Mzk2NzAsImV4cCI6MTcyMTA0OTI3MH0.QYj2VUZnQPtQrhKpCnu3XkYhs9XfqfrrsZfj-YyRLJ0',
//          },
//        }
//      )
//      console.log(response)
//      if (response.ok) {
//        let comments = await response.json()
//        this.setState({ comments: comments, isLoading: false, isError: false })
//      } else {
//        this.setState({ isLoading: false, isError: true })
//      }
//    } catch (error) {
//      console.log(error)
//      this.setState({ isLoading: false, isError: true })
//    }
//  }
//
//  render() {
//    return (
//      <div className="text-center">
//        {this.state.isLoading && <Loading />}
//        {this.state.isError && <Error />}
//        <AddComment asin={this.props.asin} />
//        <CommentList commentsToShow={this.state.comments} />
//      </div>
//    )
//  }
//}

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }


  fetchComments = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmQ2MjdjMjM5YzAwMTUyZjRiNTciLCJpYXQiOjE3MTk4Mzk2NzAsImV4cCI6MTcyMTA0OTI3MH0.QYj2VUZnQPtQrhKpCnu3XkYhs9XfqfrrsZfj-YyRLJ0',
          },
        }
      );
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments, isLoading: false, isError: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  componentDidMount() {
    this.fetchComments();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.asin !== prevProps.asin) {
      this.setState({ isLoading: true, isError: false, comments: [] });
      this.fetchComments();
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }
}

export default CommentArea
