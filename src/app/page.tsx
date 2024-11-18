import Link from "next/link";
import FusionCollection from "fusionable/FusionCollection";
import styles from "./HomePage.module.css";
import { formatDate } from "../utils";

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
export default function HomePage() {
  const posts = new FusionCollection()
    .loadFromDir("content/posts")
    .orderBy("date", "desc")
    .getItemsArray();

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
