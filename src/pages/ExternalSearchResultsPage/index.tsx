import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExternalSearchResultsContent from './content';
import { ExternalPostModel } from '../../model/ExternalPostModel';

export default function ExternalSearchResultsPage() {
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
      body: JSON.stringify({ query }),
    };

    fetch('http://localhost:3200/external/searchPosts', options)
      .then(res => res.json())
      .then(json => {
        setPosts(json.posts);
        if (json.errors && json.errors.length) {
          console.log(json.errors);
        }
      });
  }, [query]);

  return <ExternalSearchResultsContent posts={posts}/>;
}
