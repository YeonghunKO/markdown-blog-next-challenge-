import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PostType from '../interfaces/post';
import { getAllPosts, getPostSlugs } from '../lib/api';
import styles from '../styles/Home.module.css';

export default function Home({ posts }: { posts: PostType[] }) {
  return (
    <>
      <header className={styles.header}>블로그</header>
      <main className={styles.main}>
        {posts.map((post: PostType, index) => (
          <Link key={index} as={`/posts/${post.slug}`} href="/posts/[slug]">
            <article className={styles.card}>
              <h1>{post.title}</h1>
              <h2>{post.excerpt}</h2>
              <img
                width="50%"
                height="50%"
                src={post.cover_image}
                alt={post.title}
              />
              <a>see more of {post.title}</a>
            </article>
          </Link>
        ))}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'date',
    'excerpt',
    'cover_image',
    'slug',
  ]);

  return {
    props: { posts },
  };
};
