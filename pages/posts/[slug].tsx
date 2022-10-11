import Head from 'next/head';
import PostType from '../../interfaces/post';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownHTML from '../../lib/markdownToHTML';
type Props = {
  post: PostType;
  content: string;
};

function Post({ posts: { content } }: { posts: Props }) {
  return (
    <div>
      <Head>
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
          as="script"
        />
        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css`}
          rel="stylesheet"
        />
      </Head>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = getPostBySlug(params.slug, [
    'slug',
    'title',
    'date',
    'excerpt',
    'cover_image',
    'content',
  ]);

  const content = await markdownHTML(posts.content || '');

  return {
    props: {
      posts: {
        ...posts,
        content,
      },
    },
  };
}

export function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
