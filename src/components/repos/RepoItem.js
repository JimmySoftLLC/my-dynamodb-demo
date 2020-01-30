import React from 'react';

const RepoItem = ({ repo }) => {
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

export default RepoItem;