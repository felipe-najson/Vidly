import React, { Component } from 'react';
import Form from '../common/form';
import Input from '../common/input';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import Select from '../common/select';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  };

  async populatesGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populatesGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    const { data, errors, genres } = this.state;

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='title'
            value={data.title}
            label='Title'
            onChange={this.handleChange}
            error={errors.title}
          />
          <Select
            name='genreId'
            label='Genre'
            onChange={this.handleChange}
            error={errors.genres}
            options={genres}
          />
          <Input
            name='numberInStock'
            value={data.numberInStock}
            label='Number In Stock'
            onChange={this.handleChange}
            error={errors.numberInStock}
          />
          <Input
            name='dailyRentalRate'
            value={data.dailyRentalRate}
            label='Daily Rental Rate'
            onChange={this.handleChange}
            error={errors.dailyRentalRate}
          />
          <button
            disabled={this.validate()}
            type='submit'
            className='btn btn-primary'>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
