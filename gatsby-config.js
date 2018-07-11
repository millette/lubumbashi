module.exports = {
  siteMetadata: {
    title: 'Lubumbashi (Gatsby)',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
        },
        queries: [
          `{
            search(first: 100, type: USER, query: "location:lubumbashi sort:joined") {
              userCount
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              edges {
                node {
                  ... on User {
                    name
                    bio
                    login
                    databaseId
                    location
                    createdAt
                    isHireable
                    websiteUrl
                    starredRepositories(last: 90, ownedByViewer: false) {
                      totalCount
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
                    repositoriesContributedTo(last: 90, includeUserRepositories: true) {
                      totalCount
                      edges {
                        node {
                          forkCount
                          stargazers(last: 50) {
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
          }`
        ]
      }
    }
  ]
}
