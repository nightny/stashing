import ContentWithSidebar from '../../ContentWithSidebar';
import { E621PostModel } from '../../../model/ExternalPostModel';
import { Alert, Image } from 'react-bootstrap';
import { useState } from 'react';

export interface Props {
  post: E621PostModel;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function E621PostTag({ category, tags, postId }: { category: string; tags: string[]; postId: string }) {
  return <div>
    <h5>{capitalize(category)}</h5>
    <ul>{tags.map((tag, i) => <li key={`E621PC-E621PS-E621PT-${postId}-${i}`}>{tag}</li>)}</ul>
  </div>;
}

function E621PostSidebar({ post }: Props) {
  return <div>
    {Object.entries(post.tags).filter(([, tags]) => tags.length).map(([category, tags], i) =>
      <E621PostTag category={category} tags={tags} key={`E621PC-E621PS-${post.id}-${i}`} postId={post.id}/>,
    )}
  </div>
}

export function isPartOfPoolOrRelationship(post: E621PostModel) {
  return post.pools?.length || post.relationships?.parent_id != null || post.relationships?.children?.length
}

export default function E621PostContent({ post }: Props) {
  const specialImport = isPartOfPoolOrRelationship(post);
  const [show, setShow] = useState(true);

  return <div>
    {specialImport && show && <Alert onClose={() => setShow(false)} dismissible={true}>
        <Alert.Heading as={'h5'}>Special Import Available!</Alert.Heading>
        <strong>Stashing</strong> detected that this post is tied to at least one pool, has a parent
        or at least one children, and can be imported as a collection.
    </Alert>}
    <ContentWithSidebar thickness="250" sidebar={<E621PostSidebar post={post}/>}>
      <div className="text-center"><Image fluid src={post.url}/></div>
      {post.description?.length && <Alert variant="primary" className={'mt-2'}>
          <h5><strong>Description</strong></h5>
        {post.description.split('\n').map((s, i) => <div key={`E621PC-${post.id}-${i}`}>{s}</div>)}
      </Alert>}
    </ContentWithSidebar>
    <Alert variant="secondary">
      <details>
        <summary>Debug &mdash; JSON code</summary>
        <pre>
          <code>
          {JSON.stringify(post, null, 4)}
          </code>
        </pre>
      </details>
    </Alert>
  </div>;
}
