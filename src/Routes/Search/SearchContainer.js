import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH } from './SearchQueries';
import SearchPresenter from './SearchPresenter';

export default withRouter(({ location: { search } }) => {
  const term = search.substring(6);
  const { data, loading } = useQuery(SEARCH, {
    skip: term === '',
    variables: { term },
  });
  console.log(data);
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
