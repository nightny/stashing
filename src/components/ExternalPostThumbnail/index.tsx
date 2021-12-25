import { FormCheck, Image } from 'react-bootstrap';
import e621Logo from '../../assets/e621.png';
import nhentaiLogo from '../../assets/nhentai.png';
import { ExternalPostModel } from '../../model/ExternalPostModel';

export interface SearchResultProps {
  post: ExternalPostModel;
  handleClick(): void;
}

function imageFromPost(post: ExternalPostModel) {
  if (post.source === 'e621') {
    return e621Logo;
  }
  return nhentaiLogo;
}

export default function SearchResult({ post, handleClick }: SearchResultProps) {
  return <>
    <div className="text-center">
      <a href="#" onClick={handleClick}>
        <Image fluid src={post.thumbnailUrl} className="text-center" alt="test"/>
      </a>
      <div>
        <FormCheck inline type="checkbox" label={<><Image src={imageFromPost(post)}/></>}/>
      </div>
    </div>
  </>;
}
