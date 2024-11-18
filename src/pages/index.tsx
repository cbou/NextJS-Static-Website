import Link from "next/link";
import FusionCollection from "fusionable/FusionCollection";
import styles from "./HomePage.module.css";
import { formatDate } from "../utils";

export const getStaticProps = async () => {
  const collection = new FusionCollection()
    .loadFromDir("content/posts")
    .orderBy("date", "desc");
  return { props: { posts: collection.getItemsArray() } };
};

type Post = {
  fields: {
    title: string;
    date: string;
    slug: string;
  };
};

// PostItem component to render individual post data
const PostItem = ({ post }: { post: Post }) => (
  <li className={styles.postItem}>
    <Link href={`/posts/${post.fields.slug}`} className={styles.postTitle}>
      {post.fields.title}
    </Link>
    <p className={styles.postDate}>{formatDate(new Date(post.fields.date))}</p>
  </li>
);

// Main HomePage component
export default function HomePage({ posts }: { posts: Post[] }) {
  return (
    <main className={styles.homePage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blog Posts</h1>
      </header>
      <section className={styles.postsSection}>
        <ul className={styles.postsList}>
          {posts.map((post) => (
            <PostItem key={post.fields.slug} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}
