import React from 'react';
import { getUser, IProfile } from '../../utils/API';
import Moment from 'react-moment';
import './Profile.css';

interface IProfileState {
  profile?: IProfile
}

class Profile extends React.Component<any, IProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      profile: undefined
    }
  }

  componentDidMount() {
    getUser(this.props.match.params.query).then((result) => {
      this.setState({profile: result });
    });
  }

  render() {
    const {profile} = this.state;
    return (
      <>
        {profile &&
          <div>
            <h2 className='profile__title'>{profile.name || profile.login} <a href={profile.url}>View on GitHub</a></h2>
            <img className='profile__img' src={profile.avatarUrl} alt={`${profile.name || profile.login} profile`} />
            <h2 className='profile__subtitle'>Commit History (Last 10 from 5 Repos)</h2>
            {profile.contributionsCollection.commitContributionsByRepository.map((repo: any, idx: number)=> (
              <div key={idx}>
                <h3 className='profile__heading'>Repo: <a href={repo.repository.url}>{repo.repository.name}</a></h3>
                <ul className='profile__list'>
                {repo.contributions.edges.map((contribution: any, index: number) => (
                  <li key={index}>
                    <a href={contribution.node.url}>View Commit </a>
                    (<Moment format="DD/MM/YYYY" date={contribution.node.occurredAt} />)
                  </li>
                ))}
                </ul>
              </div>
            ))}
          </div>
        }
      </>
    )
  }
}

export default Profile;