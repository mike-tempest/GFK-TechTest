import React, { FormEvent, ChangeEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Search.css';

interface ISearchState {
  query: string
}

class Search extends React.Component<RouteComponentProps, ISearchState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      query: ''
    }
  }
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.history.push(`/search/${this.state.query}`)
  }

  handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({query: event.target.value})
  }

  render() {
    return (
      <>
        <form className='search' onSubmit={this.handleSubmit}>
          <h2 className='search__title'><label htmlFor='search'>Search for user:</label></h2>
          <p>
            <input className='search__input' id='search' value={this.state.query} onChange={this.handleOnChange} type='text' />
          </p>
          <p className='search__submit-row'>
            <button className='search__submit' type='submit'>Search</button>
          </p>
        </form>
      </>
    )
  }
}

export default withRouter(Search);