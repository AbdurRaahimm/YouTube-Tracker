import { useEffect, useState } from 'react';
import { Eye, Video, TrendingUp, ArrowRight } from 'lucide-react';
import SheetSidebar from '@/components/SheetSidebar';
import { Footer } from './Footer';
import { socialMedia } from '@/data/socialMedia';
import { useToast } from "@/hooks/use-toast";
import SearchForm from './SearchForm';
import { useApi } from '@/context/ApiProvider';

export default function YoutubeSubsTracker() {
  const { data } = useApi(); // Fetch YouTube API data from context
  const [subscriberCount, setSubscriberCount] = useState(data?.items?.[0]?.statistics?.subscriberCount || '0');
  const [hideHeader, setHideHeader] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [showAdditionalStats, setShowAdditionalStats] = useState(false);
  const { toast } = useToast();

  // Handle copying the subscriber count to the clipboard
  const handleCopyText = () => {
    if (data?.items?.[0]?.statistics?.subscriberCount) {
      navigator.clipboard.writeText(data.items[0].statistics.subscriberCount);
      toast({
        title: 'Copied to clipboard',
        variant: 'default',
        description: `Subscriber Count: ${data.items[0].statistics.subscriberCount}`,
        duration: 3000,
      });
    }
  };

  const calculateNextMile = () => {
    const subscriberCount = parseInt(data?.items?.[0]?.statistics?.subscriberCount || '0');
    const nextMile = Math.ceil(subscriberCount / 1000) * 1000;
    return nextMile;
  };

  const calculateLeft = () => {
    const subscriberCount = parseInt(data?.items?.[0]?.statistics?.subscriberCount || '0');
    const nextMile = calculateNextMile();
    const left = nextMile - subscriberCount;
    return left;
  };

  // console.log(data);

  // chanel id set in url
  useEffect(() => {
    // Check if data and data.items exist before trying to access them
    if (data?.items?.length > 0) {
      const channelId = data.items[0].id;
      // console.log(channelId);
  
      // Set the channelId in the URL here (if that's your goal)
      const newUrl = `${window.location.origin}/channel/${channelId}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      
    }
  }, [data]);
  

  // 1 second update
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Updating...');
      setSubscriberCount(data?.items?.[0]?.statistics?.subscriberCount || '0');
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      {/* Sidebar component */}
      <SheetSidebar
        hideHeader={hideHeader}
        setHideHeader={setHideHeader}
        hideSearch={hideSearch}
        setHideSearch={setHideSearch}
        showAdditionalStats={showAdditionalStats}
        setShowAdditionalStats={setShowAdditionalStats}
      />

      {/* Header */}
      {!hideHeader && (
        <>
          <h1 className="text-center text-3xl font-bold mb-2">YouTube Tracker</h1>
          <p className="mb-4">for the channel</p>
        </>
      )}

      {/* Channel Profile Image */}
      <div className="w-20 h-20 bg-pink-400 rounded-full mb-4">
        <img
          src={data?.items?.[0]?.snippet?.thumbnails?.default?.url || 'https://via.placeholder.com/150'}
          alt="Channel thumbnail"
          className="w-full h-full object-cover rounded-full"
          loading='lazy'
        />
      </div>

      {/* Channel Title */}
      <h2 className="text-xl mb-4">
        {data?.items?.[0]?.snippet?.title || 'Channel Title'}
      </h2>

      {/* Subscriber Count with Copy to Clipboard */}
      <div
        onClick={handleCopyText}
        className="bg-white text-pink-500 text-4xl sm:text-6xl font-bold py-4 px-8 rounded-full mb-6 cursor-pointer"
      >
        {subscriberCount}
      </div>

      {/* Search Form */}
      {!hideSearch && (
        <div className="relative mb-6">
          <SearchForm />
        </div>
      )}

      {/* Statistics Section */}
      {!showAdditionalStats && (
        <div className="flex justify-between w-full max-w-md mb-6">
          <div className="flex flex-col items-center">
            <Eye className="mb-2" />
            <p className="font-bold">{data?.items?.[0]?.statistics?.viewCount || '0'}</p>
            <p className="text-sm">Views</p>
          </div>
          <div className="flex flex-col items-center">
            <Video className="mb-2" />
            <p className="font-bold">{data?.items?.[0]?.statistics?.videoCount || '0'}</p>
            <p className="text-sm">Videos</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="mb-2" />
            <p className="font-bold">
              {calculateNextMile()}
            </p>
            <p className="text-sm">Next mile</p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="mb-2" />
            <p className="font-bold">
              {calculateLeft()}
            </p>
            <p className="text-sm">Left</p>
          </div>
        </div>
      )}

      {/* Social Media Links */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {socialMedia.map((service) => (
          <a
            href={service.url}
            key={service.name}
            className="text-sm text-pink-500 border border-pink-500 rounded-full px-4 py-2 bg-white font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {service.name}
          </a>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
