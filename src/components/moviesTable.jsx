import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from '../common/like';
import TableHeader from '../common/tableHeader.jsx';
import auth from '../services/authService';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' },
  ];

  user = auth.getCurrentUser();

  render() {
    const { moviesForThisPage, onDelete, onLike, onSort, sortColumn } =
      this.props;

    return (
      <table className='table'>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {moviesForThisPage.map((movie) => (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like onClick={() => onLike(movie)} liked={movie.liked} />
              </td>
              {this.user && this.user.isAdmin && (
                <td>
                  <button
                    onClick={() => onDelete(movie)}
                    className='btn btn-danger btn-sm'>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
