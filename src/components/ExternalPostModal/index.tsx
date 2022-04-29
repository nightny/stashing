import { Button, Modal } from 'react-bootstrap';
import { ExternalPostModel } from '../../model/ExternalPostModel';
import './index.scss';
import E621PostContent from '../E621PostContent';
import E621PostFooter from '../E621PostFooter';

export interface Props {
  post: ExternalPostModel | undefined;

  handleClose(): void;
}

export function RenderBody({ post }: { post: ExternalPostModel }) {
  if (post.source === 'e621') {
    return <E621PostContent post={post}/>;
  }
  if (post.source === 'nhentai') {
    return <div>It's an NHentai post</div>;
  }
  throw Error('Impossible.');
}

export function RenderFooter({ post }: { post: ExternalPostModel }) {
  if (post.source === 'e621') {
    return <E621PostFooter post={post}/>;
  }
  if (post.source === 'nhentai') {
    return <div>It's an NHentai footer</div>;
  }
  throw Error('Impossible.');
}

export default function ExternalPostModal({ post, handleClose }: Props) {
  return <Modal dialogClassName="modal-fluid" show={post !== undefined} onHide={handleClose} centered>
    <Modal.Header closeButton/>
    <Modal.Body>{post && <RenderBody post={post}/>}</Modal.Body>
    <Modal.Footer>{post && <RenderFooter post={post}/>}</Modal.Footer>
  </Modal>;
}
