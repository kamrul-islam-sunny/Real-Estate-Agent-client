const getEmbedUrl = (url:string) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === 'youtu.be') {
        // ছোট লিঙ্ক: youtu.be
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      } else if (parsedUrl.hostname.includes('youtube.com')) {
        // বড় লিঙ্ক: youtube.com/watch?v=...
        const videoId = parsedUrl.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      } else {
        return ''; // not a valid YouTube URL
      }
    } catch (error) {
      console.error('Invalid URL:', error);
      return '';
    }
  };


export default getEmbedUrl;
  