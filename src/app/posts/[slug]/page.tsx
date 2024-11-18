import Link from "next/link";
import FusionCollection from "fusionable/FusionCollection";
import { FusionFieldsType } from "fusionable/FusionItem";
import Showdown from "showdown";
import styles from "./PostPage.module.css";
import fs from "fs";
import path from "path";
import { formatDate } from "@/utils";

export function generateStaticParams() {
  const files = fs.readdirSync(path.join("content/posts")); // 'content' folder holds Markdown files
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

type Params = Promise<{ slug: string }>;

// Main PostPage component
export default async function PostPage(props: { params: Params }) {
  const { slug } = await props.params;
  const posts = new FusionCollection().loadFromDir("content/posts");
  const item = posts.getOneBySlug(slug);

  if (!item) {
    throw new Error("Post not found");
  }
  const post = item.getItem();

  if (!post) {
    throw new Error("Post not found");
  }
  const fields: FusionFieldsType = post.fields;
  const converter = new Showdown.Converter();
  const contentHTML = converter.makeHtml(post.content);

  return (
    <article className={styles.postPage}>
      <Link href="/" passHref className={styles.backLink}>
        ← Back to All Posts
      </Link>
      <header className={styles.postHeader}>
        <h1 className={styles.postTitle}>{fields.title}</h1>
        <p className={styles.postDate}>{formatDate(new Date(fields.date))}</p>
      </header>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
    </article>
  );
}
