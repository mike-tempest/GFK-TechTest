import React from 'react';
import { Link } from 'react-router-dom';
import { searchUsers, ISearchProfile } from '../../utils/API';
import './SearchList.css';

interface ISearchListState {
  profiles: ISearchProfile[]
}

class SearchList extends React.Component<any, ISearchListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      profiles: []
    }
  }

  componentDidMount() {
    searchUsers(this.props.match.params.query).then((result) => {
      this.setState({profiles: result })
    });
  }

  render() {
    const {profiles} = this.state;
    return (
      <>
        <ul className='search-list'>
          {profiles && profiles.map((profile: any) => (
            <li key={profile.node.login}>
              <Link className='search-list__link' to={`/profile/${profile.node.login}`}>
                <img className='search-list__img' src={profile.node.avatarUrl} alt={`${profile.node.name} profile `} />
                {profile.node.name || profile.node.login}
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default SearchList;