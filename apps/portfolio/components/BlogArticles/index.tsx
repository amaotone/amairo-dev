import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Parser from "rss-parser";
import strftime from "strftime";

interface Post {
  title: string;
  link: string;
  pubDate: Date;
}

export const BlogArticles: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const parser = new Parser();

    const parseItems = (items: Parser.Item[]) => {
      return items
        .map((item: Parser.Item) => {
          return {
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate!),
          } as Post;
        })
        .slice(0, 10);
    };

    const fetchPosts = async () => {
      const url = "https://amalog.hateblo.jp/rss";
      const feed = await parser.parseURL(url);
      setPosts(parseItems(feed.items));
    };
    fetchPosts();
  }, []);

  return (
    <>
      {posts && (
        <>
          <UnorderedList>
            {posts.map(post => {
              return (
                <ListItem>
                  {strftime("%Y-%m-%d ", post.pubDate)}
                  <Link color="teal" href={post.link}>
                    {post.title}
                  </Link>
                </ListItem>
              );
            })}
          </UnorderedList>
          <Box textAlign="right">
            <Link color="teal" href="https://amalog.hateblo.jp">
              and more <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </>
      )}
    </>
  );
};
