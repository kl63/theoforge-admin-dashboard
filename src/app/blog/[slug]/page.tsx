import React from 'react';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { getPostData, getAllPostSlugs, getPostsByTag } from '@/lib/posts';
import { PostData } from '@/types/post';
import MarkdownRenderer from '@/components/Common/MarkdownRenderer';
import Image from 'next/image';
import PodcastMetadata from '@/components/Blog/PodcastMetadata';
import SocialShare from '@/components/Blog/SocialShare';
import NewsletterSignup from '@/components/Blog/NewsletterSignup';
import LinkedInPreview from '@/components/Blog/LinkedInPreview';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const slug = params.slug;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} - TheoForge Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getRelatedPosts = async (currentPost: PostData): Promise<PostData[]> => {
    if (!currentPost.tags || currentPost.tags.length === 0) return [];

    const relatedPosts: PostData[] = [];
    const processedSlugs = new Set<string>();
    processedSlugs.add(currentPost.slug);

    for (const tag of currentPost.tags) {
      const postsWithTag = await getPostsByTag(tag);

      for (const related of postsWithTag) {
        if (!processedSlugs.has(related.slug)) {
          relatedPosts.push(related);
          processedSlugs.add(related.slug);

          if (relatedPosts.length >= 3) break;
        }
      }

      if (relatedPosts.length >= 3) break;
    }

    return relatedPosts;
  };

  const relatedPosts = await getRelatedPosts(post);

  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/blog"
            sx={{ borderRadius: 8 }}
          >
            Back to All Articles
          </Button>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 6 }}>
          {post.image && (
            <Box sx={{ position: 'relative', width: '100%', height: { xs: 304, sm: 400, md: 496 }, backgroundColor: 'grey.100', overflow: 'hidden' }}>
              <Image src={post.image} alt={post.title} fill priority style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 960px) 100vw, 960px" />
              {post.isPodcast && (
                <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: 8, px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
                  <HeadphonesIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                    Podcast Episode {post.podcastEpisodeNumber}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 2 }}>
                {post.tags && post.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mr: 2 }}>
                    {post.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" component={Link} href={`/blog?tag=${encodeURIComponent(tag)}`} clickable />
                    ))}
                  </Box>
                )}
                <Typography variant="caption" component="span" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  {formattedDate} • {post.isPodcast ? post.podcastDuration : `${readingTimeMinutes} min read`}
                </Typography>
              </Box>

              <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.2, mb: 3 }}>
                {post.title}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                {post.author && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', mr: 2 }}>
                      {post.author.charAt(0).toUpperCase()}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                        {post.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        TheoForge
                      </Typography>
                    </Box>
                  </Box>
                )}
                <SocialShare title={post.title} url={`https://theoforge.com/blog/${post.slug}`} description={post.excerpt} hashtags={post.tags} />
              </Box>
            </Box>

            {post.isPodcast && (
              <PodcastMetadata episodeNumber={post.podcastEpisodeNumber} duration={post.podcastDuration} releaseDate={post.date} host={post.podcastHost} guest={post.podcastGuest} />
            )}

            <Divider sx={{ my: 5 }} />

            <Box sx={{ maxWidth: '46rem', mx: 'auto', fontSize: '1.125rem', '& > p:first-of-type': { fontSize: '1.25rem', color: 'text.primary' }, '& h1, & h2, & h3': { mt: 4, mb: 2 }, '& p': { lineHeight: 1.7, mb: 2 }, '& a': { color: 'primary.main' }, '& blockquote': { borderLeft: '4px solid', borderColor: 'divider', pl: 2, my: 2, fontStyle: 'italic' }, '& ul, & ol': { pl: 3, mb: 2 }, '& li': { mb: 1 } }}>
              <MarkdownRenderer content={post.content} />
            </Box>

            <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Related Topics
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {post.tags?.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" component={Link} href={`/blog?tag=${encodeURIComponent(tag)}`} clickable />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Share This Article
                </Typography>
                <SocialShare title={post.title} url={`https://theoforge.com/blog/${post.slug}`} description={post.excerpt} hashtags={post.tags} />
              </Box>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ mb: 8 }}>
          <NewsletterSignup title="Get the Latest AI Insights" subtitle="Subscribe to receive our weekly newsletter featuring expert insights, podcast episodes, and exclusive resources for enterprise leaders." />
        </Box>

        {relatedPosts.length > 0 && (
          <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              Explore Further Insights
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {relatedPosts.map((relatedPost) => (
                <Box key={relatedPost.slug} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' }, maxWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' }, flexGrow: 1, flexShrink: 0, display: 'flex', alignItems: 'stretch' }}>
                  <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', width: '100%', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }}>
                    <Link href={`/blog/${relatedPost.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      {relatedPost.image && (
                        <Box sx={{ position: 'relative', height: 160, overflow: 'hidden', flexShrink: 0 }}>
                          <Image src={relatedPost.image} alt={relatedPost.title} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px" />
                          {relatedPost.isPodcast && (
                            <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', p: 0.75, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
                              <HeadphonesIcon fontSize="small" />
                            </Box>
                          )}
                        </Box>
                      )}
                      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary" component="div">
                            {new Date(relatedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </Typography>
                          {relatedPost.isPodcast && (
                            <Chip label="Podcast" size="small" color="primary" sx={{ borderRadius: 1, height: 20, fontSize: '0.65rem' }} />
                          )}
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mt: 1, mb: 1 }}>
                          {relatedPost.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1, mb: 'auto' }}>
                          {relatedPost.excerpt}
                        </Typography>
                      </Box>
                    </Link>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'medium' }}>
            Ready to explore how AI can transform your organization?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" size="large" component={Link} href="/contact" sx={{ borderRadius: 8, px: 3 }}>
              Contact Us
            </Button>
            <Button variant="outlined" size="large" component={Link} href="/blog" sx={{ borderRadius: 8, px: 3 }}>
              Explore More Articles
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'medium' }}>
              Spread the Knowledge
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
              Help your network benefit from these insights by sharing this {post.isPodcast ? 'podcast episode' : 'article'} on LinkedIn.
            </Typography>
          </Box>
          <LinkedInPreview post={post} baseUrl="https://theoforge.com" />
        </Box>

        {post.isPodcast && (post.podcastSpotifyUrl || post.podcastAppleUrl) && (
          <Box sx={{ mb: 4, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
              Listen to this episode:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {post.podcastSpotifyUrl && (
                <Button variant="contained" color="success" startIcon={<MusicNoteIcon />} href={post.podcastSpotifyUrl} target="_blank" rel="noopener noreferrer" sx={{ borderRadius: 8 }}>
                  Spotify
                </Button>
              )}
              {post.podcastAppleUrl && (
                <Button variant="contained" color="secondary" startIcon={<PodcastsIcon />} href={post.podcastAppleUrl} target="_blank" rel="noopener noreferrer" sx={{ borderRadius: 8 }}>
                  Apple Podcasts
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
