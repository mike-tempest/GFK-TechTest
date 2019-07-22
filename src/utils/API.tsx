import axios from 'axios';
const axiosGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}`
  }
})

export interface ISearchProfile {
  name?: string;
  login: string;
  avatarUrl: string;
}

interface ISearchUsers {
  (query: string): Promise<ISearchProfile[]>;
}

export interface IProfile {
  name?: string;
  login: string;
  avatarUrl: string;
  url: string;
  contributionsCollection: {
    totalCommitContributions: number;
    commitContributionsByRepository: {
      contributions: {
        edges: {
          node: {
            occurredAt: string;
            url: string;
          }
        }[]
      }[];
      repository: {
        name: string;
        url: string;
      }
      resourcePath: string;
      url: string;
    }[]
  };

}

interface IGetUser {
  (query: string): Promise<IProfile>;
}

export const searchUsers: ISearchUsers = async (query: string) => {
  const SEARCH_USERS = `{search(query: "${query}", type: USER, first: 20) {
    edges {
      node {
        ... on User {
          name,
          avatarUrl,
          login
        }
      }
    }
  }}`
  const result = await axiosGraphQL.post('', {
    query: SEARCH_USERS
  });
  return result.data.data.search.edges;
}

export const getUser: IGetUser = async (query: string) => {
  const GET_USER = `{
    user(login: "${query}") {
      id,
      login,
      name,
      url,
      avatarUrl,
      contributionsCollection(to: "2019-07-20T22:09:03+0000") {
        totalCommitContributions,
        commitContributionsByRepository(maxRepositories: 5) {
          repository {
            name
            url
          }
          contributions(last: 10) {
            edges {
              node {
                occurredAt
                resourcePath
                url
              }
            }
          }
        }
      }
    }
  }`
  const result = await axiosGraphQL.post('', {
    query: GET_USER
  })

  return result.data.data.user;
}