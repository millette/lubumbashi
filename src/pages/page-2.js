import React, { Component } from 'react'
import Link from 'gatsby-link'

import GithubUser from '../components/github-user'

const sorter = (a, b) => {
  if (a[1] > b[1]) {
    return 1
  }
  if (a[1] < b[1]) {
    return -1
  }
  return 0
}

const languageField = x => {
  if (
    !x.repositoriesContributedTo ||
    !x.repositoriesContributedTo.edges ||
    !x.repositoriesContributedTo.edges.length
  ) {
    return x
  }
  const languagesObject = {}

  x.repositoriesContributedTo.edges.forEach(({ node }) => {
    const primaryLanguage =
      node && node.primaryLanguage && node.primaryLanguage.name
    if (!primaryLanguage) {
      return
    }
    if (!languagesObject[primaryLanguage]) {
      languagesObject[primaryLanguage] = 0
    }
    ++languagesObject[primaryLanguage]
  })

  const languagesCounts = []
  let r
  for (r in languagesObject) {
    languagesCounts.push([r, languagesObject[r]])
  }

  // sort by number of appearances
  const languagesImp = languagesCounts.sort(sorter).reverse()

  const languages = languagesImp
    // convert to a string
    .map(x => `${x[0]} (${x[1]})`)
    .join(', ')

  return { ...x, languages, languagesImp }
}

class SecondPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: false,
      onlyAvailable: false,
    }
    this.click = this.click.bind(this)
    this.clickAvailable = this.clickAvailable.bind(this)
  }

  clickAvailable(ev) {
    this.setState({ onlyAvailable: !this.state.onlyAvailable })
  }

  click(ev) {
    const filter = ev.target.dataset.key !== 'Tous' && ev.target.dataset.key
    this.setState({ filter })
  }

  render() {
    const filtering = x => {
      if (!this.state.filter) {
        return true
      }
      let ok = false
      if (!x.languagesImp) {
        return false
      }
      x.languagesImp.forEach(y => {
        if (y[0] === this.state.filter) {
          ok = true
        }
      })
      return ok
    }

    const filtering2 = x => {
      if (!this.state.onlyAvailable) {
        return true
      }
      return x.isHireable
    }

    const { data } = this.props
    const users2 = data.allGithubSearch.edges
      .filter(x => x.node && x.node.login)
      .map(x => x.node)
      .map(languageField)

    const availableLanguagesImp = {}

    users2.forEach(x => {
      if (!x.languagesImp || !x.languagesImp.length) {
        return
      }
      x.languagesImp.forEach(z => {
        if (!availableLanguagesImp[z[0]]) {
          availableLanguagesImp[z[0]] = 0
        }
        availableLanguagesImp[z[0]] += z[1] || 0
      })
    })

    const users = users2.filter(filtering).filter(filtering2)

    const availableLanguages2 = [['Tous', 999]]

    let r
    for (r in availableLanguagesImp) {
      availableLanguages2.push([r, availableLanguagesImp[r]])
    }

    // sort by number of appearances
    const availableLanguages = availableLanguages2.sort(sorter).reverse()

    return (
      <div>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
        <p>
          <button type="button" onClick={this.clickAvailable}>
            Dispo? {this.state.onlyAvailable ? 'OUI' : 'Peu importe'}
          </button>
        </p>
        <div>
          {availableLanguages.map(x => (
            <button
              type="button"
              data-key={x[0]}
              onClick={this.click}
              key={x[0]}
            >
              {x[0]}&nbsp;({x[1]})
            </button>
          ))}
        </div>
        <div>{users.map(x => <GithubUser key={x.id} {...x} />)}</div>
      </div>
    )
  }
}

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
