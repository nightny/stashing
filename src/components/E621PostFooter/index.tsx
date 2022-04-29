import { E621PostModel } from '../../model/ExternalPostModel';
import { isPartOfPoolOrRelationship } from '../E621PostContent';
import { Button } from 'react-bootstrap';

export interface Props {
  post: E621PostModel;
}

function ImportButton({ id }: { id: string }) {
  return <Button variant="success" size="sm" target="_blank" href={`/import/e621/${id}`}>Import</Button>;
}

function SpecialImportButton({ id }: { id: string }) {
  return <Button size="sm" target="_blank" href={`/import/e621/${id}/special`}>Special Import</Button>
}

export default function E621PostFooter({ post }: Props) {
  return <div>
    {isPartOfPoolOrRelationship(post) && <SpecialImportButton id={post.id}/>} <ImportButton id={post.id}/>
  </div>;
}
