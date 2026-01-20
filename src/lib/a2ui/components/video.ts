/**
 * Video Component Creator
 */
import { PropertyResolver } from '../property-resolver';

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Check if URL is a YouTube URL
 */
function isYouTubeURL(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url);
}

/**
 * Convert YouTube URL to embed URL
 */
function convertYouTubeToEmbed(url: string): string {
  const videoId = extractYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

export function createVideoElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  // Mark data binding for url if using DynamicString with path
  const url = propertyResolver.resolveValue(properties.url, surfaceId);
  
  if (!url) {
    console.warn(`⚠️ No URL found for video component ${id}`);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'a2ui-video-error';
    errorDiv.textContent = 'No video URL provided';
    return errorDiv;
  }

  const urlString = String(url);
  console.log(`🎥 Loading video for component ${id}:`, urlString);

  // Check if it's a YouTube URL
  if (isYouTubeURL(urlString)) {
    const embedUrl = convertYouTubeToEmbed(urlString);
    console.log(`📺 YouTube video detected, converting to embed URL:`, embedUrl);
    
    // Create iframe for YouTube
    const container = document.createElement('div');
    container.className = 'a2ui-video-container a2ui-video-youtube';
    container.setAttribute('data-component-id', id);
    
    if (properties.url && typeof properties.url === 'object' && properties.url.path) {
      container.dataset.bindingUrlPath = properties.url.path;
    }

    const iframe = document.createElement('iframe');
    iframe.className = 'a2ui-video-iframe';
    iframe.src = embedUrl;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('frameborder', '0');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '400px';
    iframe.style.borderRadius = '12px';
    
    container.appendChild(iframe);
    return container;
  }

  // Regular video URL - use HTML5 video element
  const element = document.createElement('video');
  element.className = 'a2ui-video';
  element.setAttribute('data-component-id', id);
  element.controls = true;

  if (properties.url && typeof properties.url === 'object' && properties.url.path) {
    element.dataset.bindingUrlPath = properties.url.path;
  }

  element.src = urlString;

  // Handle video load error
  element.addEventListener('error', () => {
    console.error(`❌ Video load failed for component ${id}, URL:`, element.src);
  });

  return element;
}
