import ContentWithSidebar from '../../components/ContentWithSidebar';
import ResponsiveGrid from '../../components/ResponsiveGrid';
import ExternalPostThumbnail from '../../components/ExternalPostThumbnail';
import NoPosts from './NoPosts';
import CenteredSpinner from '../../components/CenteredSpinner';
import { ExternalPostModel } from '../../model/ExternalPostModel';
import ExternalPostModal from '../../components/ExternalPostModal';
import { useState } from 'react';

export interface Props {
  posts: ExternalPostModel[] | undefined;
}

interface ContentProps {
  posts: ExternalPostModel[] | undefined;

  setPost(post: ExternalPostModel): void;
}

function Content({ posts, setPost }: ContentProps) {
  if (!posts) {
    return <CenteredSpinner/>;
  }

  if (!posts.length) {
    return <NoPosts/>;
  }

  return <ResponsiveGrid
    keyPrefix={'SRS-CWS-RG'}
    childNodes={posts.map((value, index) => (
      <ExternalPostThumbnail
        key={`SRS-CWS-RG-SR-${index}-${value.id}`}
        post={value}
        handleClick={() => setPost(value)}
      />
    ))}
  />;
}

export default function ExternalSearchResultsPageContent({ posts }: Props) {
  const [post, setPost] = useState<ExternalPostModel>();
  return <>
    <ContentWithSidebar thickness="250" sidebar={'This is the sidebar'}>
      <Content posts={posts} setPost={setPost}/>
    </ContentWithSidebar>
    <ExternalPostModal post={post} handleClose={() => setPost(undefined)}/>
  </>;
}
