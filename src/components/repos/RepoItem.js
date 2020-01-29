import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/dataAndMethods/dataAndMethodsContext';
import TeamContext from '../../context/team/teamContext';

const RepoItem = ({ repo }) => {
    const gitHubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const teamContext = useContext(TeamContext);
    return (
        <div className='card'>
            <h3>
                <a href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                >{repo.name}</a>
            </h3>
            <p>{repo.description}</p>
            <p>Last updated: {repo.updated_at}</p>
        </div>
    );
};

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
};

export default RepoItem;