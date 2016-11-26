import React, { PropTypes } from 'react';

function Content(props) {
  switch (props.state) {
    case 'NOT_ASKED':
      return <p>please enter a user name</p>;
    case 'LOADING':
      return <p>Loading</p>;
    case 'ERROR':
      return <p>{props.error}</p>;
    case 'SUCCESS':
      return (
        <ul>
          {props.data.map((repo) =>
            <li key={repo.id}><a href={repo.url}>{repo.name}</a></li>
          )}
        </ul>
      );
    default:
      return null
  }
}

Content.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.number
};

export default Content;
