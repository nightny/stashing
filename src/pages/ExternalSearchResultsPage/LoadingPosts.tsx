import { Spinner } from 'react-bootstrap';

export default function LoadingPosts() {
  return <div className="text-center py-5">
    <Spinner animation="border"/>
  </div>;
}
