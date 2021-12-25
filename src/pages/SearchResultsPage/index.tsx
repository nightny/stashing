import { Col, Image, Row } from 'react-bootstrap';
import logo from '../../logo.svg';
import './index.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostModel } from '../../model/PostModel';
import SearchResult from '../../components/SearchResult';

function LoadingPosts() {
  return <div>Loading...</div>;
}

function NoPosts() {
  return <div>No posts were found.</div>
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [posts, setPosts] = useState<PostModel[]>();

  useEffect(() => {
    setPosts(undefined);
    const promise = fetch('http://localhost:3200/searchPosts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    promise.then(res => res.json())
      .then(json => {
        setPosts(json.posts);
        if (json.errors && json.errors.length) {
          console.log(json.errors);
        }
      })
  }, [query]);

  return <Row>
    <Col md={{ order: 'last' }}>
      <Row xs="1" sm="2" md="3" lg="4" xl="5" xxl="6">
        {
          posts ? posts.length ? posts.map((value, index) => (
            <Col key={`SearchResultsPage-${index}-${value.id}`}>
              <SearchResult post={value}/>
            </Col>
          )) : <NoPosts/> : <LoadingPosts/>
        }
      </Row>
    </Col>
    <Col md={{ order: 'first' }} className={'col-sidebar-span'}>
      This is the sidebar
    </Col>
  </Row>
}
