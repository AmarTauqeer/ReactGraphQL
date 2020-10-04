import React, { Component } from "react";
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

class App extends Component {
  handleClick = () => {
    this.props.history.push("/Create");
  };
  handleEditClick = (id) => {
    if (id) {
      this.props.history.push(`/show/${id}`);
    }
  };
  render() {
    return (
      <Query pollInterval={500} query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container mt-5">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">LIST OF BOOKS</h3>
                  <h4>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={this.handleClick}
                    >
                      Add Book
                    </button>
                  </h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead className="thead-dark">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.books.map((book, index) => (
                        <tr key={index}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => this.handleEditClick(book._id)}
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
