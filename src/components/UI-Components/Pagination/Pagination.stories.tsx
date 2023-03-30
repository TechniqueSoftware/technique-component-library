import * as React from 'react';
import { createCUICStoriesOf } from '../utils/utils';
import { MODULE_NAME } from '../constants';
import Pagination from './Pagination';
import { demoTop101Movies } from './data';

const { useState } = React;

function PaginationStory() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const movies =
    demoTop101Movies
      .slice((pageNo - 1) * pageSize)
      .slice(0, pageSize);

  if (!movies.length) setPageNo(1);

  return (
    <>
      <Pagination
        count={demoTop101Movies.length}
        pageNo={pageNo}
        pageSize={pageSize}
        onPageNoChange={setPageNo}
        onPageSizeChange={setPageSize}
      />
      {movies.map(movie => (
        <div key={movie.no}>
          <div style={{ display: 'inline-block', minWidth: 46 }}>No {movie.no}.</div>
          <span>{movie.title} ({movie.year})</span>
        </div>
      ))}
    </>
  );
}

createCUICStoriesOf(MODULE_NAME.TABLES, module)
  .addCUICStory({
    render: () => <PaginationStory/>,
    name: 'Pagination',
    notes: require('./notes.md').default
  });
