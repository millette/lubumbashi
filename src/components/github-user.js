import React from 'react'
// import Link from 'gatsby-link'

// <pre>starredRepositories: {JSON.stringify(props.starredRepositories, null, '  ')}</pre>
// <pre>repositoriesContributedTo: {JSON.stringify(props.repositoriesContributedTo, null, '  ')}</pre>

const GithubUser = (props) => {
  return <div style={{ padding: '1em', margin: '1em', border: 'thin solid blue' }}>
    <h2>{props.name || props.login}</h2>
    {props.bio && <p>{props.bio}</p>}
    <dl>
      <dt>Location</dt>
      <dd>{props.location}</dd>
      <dt>Site web</dt>
      <dd>{props.websiteUrl}</dd>
      <dt>Créé</dt>
      <dd>{props.createdAt}</dd>
      <dt>starredRepositories</dt>
      <dd>{props.starredRepositories && props.starredRepositories.edges.length}</dd>
      <dt>repositoriesContributedTo</dt>
      <dd>{props.repositoriesContributedTo && props.repositoriesContributedTo.edges.length}</dd>
    </dl>
    {props.isHireable && <p>Disponible pour travailler</p>}

  </div>
}

export default GithubUser
