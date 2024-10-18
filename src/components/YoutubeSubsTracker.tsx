import { useState } from 'react'
import { Search, Eye, Video, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SheetSidebar from '@/components/SheetSidebar'

export default function YoutubeSubsTracker() {
  const [hideHeader, setHideHeader] = useState<boolean>(false)
  const [hideSearch, setHideSearch] = useState<boolean>(false)
  const [showAdditionalStats, setShowAdditionalStats] = useState<boolean>(false)


  return (
    <div className="min-h-screen bg-pink-500 text-white flex flex-col items-center justify-center p-4">
      <SheetSidebar
        hideHeader={hideHeader}
        setHideHeader={setHideHeader}
        hideSearch={hideSearch}
        setHideSearch={setHideSearch}
        showAdditionalStats={showAdditionalStats}
        setShowAdditionalStats={setShowAdditionalStats}
      />
      {!hideHeader && (
        <>
          <h1 className="text-3xl font-bold mb-2">Realtime YouTube Tracker</h1>
          <p className="mb-4">for the channel</p>
        </>
      )}
      <div className="w-20 h-20 bg-pink-400 rounded-full mb-4">
        <img src="https://sun.livesubs.io/imgproxy/0f1tkj3MZMmcgu2O5Xo67b_NW9Y0zBQWtHe952qN5e8/f:webp/g:no/q:85/rt:fit/w:120/aHR0cHM6Ly95dDMuZ2dwaHQuY29tLzFpdll3TmFlWnFmYUtuQXc4Wi1DVjhCbVdtT3hPRjFPTkV6S0JCTkVwRk8zNWNiWUUxWmh1dzZWOFdZT3RWR0JfcjJkalRiRD1zODAwLWMtay1jMHgwMGZmZmZmZi1uby1yag" alt="" className="w-full h-full object-cover rounded-full" loading='lazy' />
      </div>
      <h2 className="text-xl mb-4">UR : Cristiano</h2>

      <div className="bg-white text-pink-500 text-6xl font-bold py-4 px-8 rounded-full mb-6">
        65 091 372
      </div>
      {!hideSearch && (
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Enter channel name"
            className="pl-3 pr-4 py-2 rounded-lg bg-pink-400 text-white placeholder:text-pink-200 w-64 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-200 cursor-pointer" />
        </div>
      )}
      {
        !showAdditionalStats && (
          <div className="flex justify-between w-full max-w-md mb-6">
            <div className="flex flex-col items-center">
              <Eye className="mb-2" />
              <p className="font-bold">547 190 946</p>
              <p className="text-sm">Views</p>
            </div>
            <div className="flex flex-col items-center">
              <Video className="mb-2" />
              <p className="font-bold">60</p>
              <p className="text-sm">Videos</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="mb-2" />
              <p className="font-bold">70 000 000</p>
              <p className="text-sm">Next mile</p>
            </div>
            <div className="flex flex-col items-center">
              <ArrowRight className="mb-2" />
              <p className="font-bold">4 908 628</p>
              <p className="text-sm">Left</p>
            </div>
          </div>
        )
      }
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {['Telegram', 'TikTok', 'X (Twitter)', 'VK', 'Instagram'].map((service) => (
          <Button key={service} variant="secondary" className="rounded-full text-pink-500">
            {service}
          </Button>
        ))}
      </div>

    </div>
  )
}

