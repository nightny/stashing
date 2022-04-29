import { E621PostModel } from '../../model/ExternalPostModel';
import CenteredSpinner from '../../components/CenteredSpinner';
import PostNotFound from './PostNotFound';
import E621PostContent from '../../components/E621PostContent';
import E621PostFooter from '../../components/E621PostFooter';

export interface Props {
  post: E621PostModel | null | undefined;
}

export default function E621PostPageContent({ post }: Props) {
  if (post === undefined) {
    return <CenteredSpinner/>;
  }

  if (post === null) {
    return <PostNotFound/>;
  }

  return <div>
    <E621PostContent post={post}/>
    <hr/>
    <div className="text-end">
      <E621PostFooter post={post}/>
    </div>
  </div>;
}
