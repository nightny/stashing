import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { E621PostModel } from '../../model/ExternalPostModel';
import E621PostPageContent from './content';

export default function E621PostPage() {
  let { id } = useParams();

  const [post, setPost] = useState<E621PostModel | null | undefined>();

  useEffect(() => {
    setPost({
      'source': 'e621',
      'id': '2691281',
      'thumbnailUrl': 'https://static1.e621.net/data/sample/10/b2/10b203b797f50fd73ece696f99055d46.jpg',
      'url': 'https://static1.e621.net/data/10/b2/10b203b797f50fd73ece696f99055d46.jpg',
      'tags': {
        'general': ['animal_genitalia', 'anthro', 'arms_tied', 'ball_gag', 'balls', 'barefoot', 'bdsm', 'bed', 'bondage', 'bound', 'breasts', 'brown_body', 'brown_fur', 'brown_hair', 'chastity_cage', 'chastity_device', 'collar', 'collar_tag', 'countershade_tail', 'countershade_torso', 'countershading', 'feet', 'fully_sheathed', 'fur', 'furniture', 'gag', 'gagged', 'genitals', 'green_eyes', 'gynomorph', 'hair', 'hands_behind_back', 'hindpaw', 'intersex', 'kneeling', 'kneeling_on_bed', 'knot', 'lgbt_pride', 'looking_away', 'nipples', 'on_bed', 'paws', 'penis', 'pink_nipples', 'pink_penis', 'pride_colors', 'purple_collar', 'purple_rope', 'restraints', 'rope', 'rope_bondage', 'rope_harness', 'sheath', 'solo', 'submissive', 'submissive_anthro', 'submissive_gynomorph', 'submissive_intersex', 'tan_body', 'tan_fur', 'transgender_pride_colors', 'white_body', 'white_countershading', 'white_fur'],
        'species': ['canid', 'canine', 'canis', 'domestic_dog', 'mammal'],
        'character': ['katie_(kdurmeter)'],
        'copyright': [],
        'artist': ['whiskyjack'],
        'invalid': [],
        'lore': ['trans_(lore)', 'trans_woman_(lore)'],
        'meta': ['digital_media_(artwork)', 'hi_res', 'shaded', 'signature'],
      },
      'pools': [],
      'rating': 'e',
      'relationships': { 'parent_id': 2689836, 'has_children': false, 'has_active_children': false, 'children': [] },
      'description': 'This very cute pup is playing dress-up!! \r\n\r\nThis is a commission for "@kdurmeter!!":https://twitter.com/kdurmeter 🖤🖤 \r\n\r\n"Some alt versions were made of this as well, featuring some chastity devices and a lady who is clearly enjoying herself!! 😍😍":https://twitter.com/_WhiskyJack/status/1378567389617393667?s=19',
    })
    // setPost(undefined);
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // };
    //
    // fetch(`http://localhost:3200/api/external/e621/${id}`, options)
    //   .then(res => res.json())
    //   .then(
    //     json => setPost(json),
    //     cause => {
    //       console.log(cause);
    //       setPost(null);
    //     },
    //   );
  }, [id]);

  return <E621PostPageContent post={post}/>;
}
