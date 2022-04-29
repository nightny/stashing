import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExternalSearchResultsPageContent from './content';
import { ExternalPostModel } from '../../model/ExternalPostModel';

export interface Props {
  site?: string;
}

export default function ExternalSearchResultsPage({ site }: Props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [posts, setPosts] = useState<ExternalPostModel[]>();

  useEffect(() => {
    setPosts(undefined);
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, site }),
    };

    fetch('http://localhost:3200/api/external/searchPosts', options)
      .then(res => res.json())
      .then(json => {
        setPosts(json.posts);
        if (json.errors && json.errors.length) {
          console.log(json.errors);
        }
      });
  }, [query, site]);

  return <ExternalSearchResultsPageContent posts={posts}/>;
}
