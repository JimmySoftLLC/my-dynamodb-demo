import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/dataAndMethods/dataAndMethodsContext';
import TeamContext from '../../context/team/teamContext';

const Repos = ({ repos }) => {
    const gitHubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const teamContext = useContext(TeamContext);
    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default Repos;