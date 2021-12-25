import { FormCheck, Image } from 'react-bootstrap';
import { PostModel } from '../../model/PostModel';
import e621Logo from '../../assets/e621.png';
import nhentaiLogo from '../../assets/nhentai.png';

export interface SearchResultProps {
  post: PostModel;
}

function imageFromPost(post: PostModel) {
  if (post.source === 'e621') {
    return e621Logo;
  }
  return nhentaiLogo;
}

export default function SearchResult({ post }: SearchResultProps) {
  return <>

    <div className="text-center">
      <Image fluid src={post.thumbnailUrl} className="text-center" alt="test"/>
      <div>
        <FormCheck inline type="checkbox" label={<><Image src={imageFromPost(post)}/></>}/>

      </div>
    </div>
  </>;
}
