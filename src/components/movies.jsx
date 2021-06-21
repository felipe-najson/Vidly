import React, { Component } from 'react';
import ListGroup from '../common/listGroup.jsx';
import Pagination from '../common/pagination';
import { toast } from 'react-toastify';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable.jsx';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox.jsx';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: '',
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.');

      //Rollback if there is an error.
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database.</p>;

    let filtered = allMovies;

    if (searchQuery) {
      // For searching
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      // For selecting genre
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const moviesForThisPage = paginate(sorted, currentPage, pageSize);

    return (
      <div className='row'>
        <div className='col-3 m-2'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            textProperty='name'
            valueProperty='_id'
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          {user && (
            <Link className='btn btn-primary btn-sm mb-2' to='/movies/new'>
              New Movie
            </Link>
          )}

          <p>Showing {filtered.length} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            moviesForThisPage={moviesForThisPage}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
