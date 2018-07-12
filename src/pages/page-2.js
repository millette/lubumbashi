import React from 'react'
import Link from 'gatsby-link'

import GithubUser from '../components/github-user'

const SecondPage = ({ data }) => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <div>
      {data.allGithubSearch.edges
        .filter(x => x.node && x.node.login)
        .map(x => <GithubUser key={x.node.id} {...x.node} />)}
    </div>
  </div>
)

export default SecondPage

export const pageQuery = graphql`
  query MyQueryGitHub {
    allGithubSearch {
      edges {
        node {
          id
          userCount
          name
          bio
          login
          databaseId
          location
          createdAt
          isHireable
          websiteUrl
          starredRepositories {
            edges {
              starredAt
              node {
                nameWithOwner
                primaryLanguage {
                  name
                }
              }
            }
          }
          repositoriesContributedTo {
            edges {
              node {
                forkCount
                stargazers {
                  totalCount
                }
                primaryLanguage {
                  name
                }
                nameWithOwner
              }
            }
          }
        }
      }
    }
  }
`
