import Link from "next/link";
import FusionCollection from "fusionable/FusionCollection";
import { FusionFieldsType, FusionItemType } from "fusionable/FusionItem";
import Showdown from "showdown";
import styles from "./PostPage.module.css";
import fs from "fs";
import path from "path";
import { formatDate } from "@/utils";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/posts")); // 'content' folder holds Markdown files
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false }; // All paths are pre-rendered
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  if (!params?.slug) {
    return;
  }

  const collection = new FusionCollection().loadFromDir("content/posts");
  const post = collection.getOneBySlug(params.slug);
  if (!post) {
    throw new Error("Post not found");
  }
  return { props: { post: post.getItem() } };
};

// Main PostPage component
export default function PostPage({ post }: { post: FusionItemType }) {
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
