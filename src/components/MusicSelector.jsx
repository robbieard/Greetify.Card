import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const musicFiles = import.meta.glob('../../assets/music/**/*.{mp3,wav,ogg,m4a}', { eager: true, as: 'url' })

const normalizeTrackName = (filename) => {
  const noExt = filename.replace(/\.(mp3|wav|ogg|m4a)$/i, '')
  const spaced = noExt.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
  return spaced || 'Untitled'
}

const MusicSelector = ({ selectedTrack, onTrackSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const tracks = useMemo(() => {
    return Object.entries(musicFiles)
      .map(([path, url]) => {
        const filename = path.split('/').pop() || ''
        const name = normalizeTrackName(filename)
        return {
          id: path,
          name,
          artist: 'Local',
          preview_url: url,
          image: null,
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const filteredTracks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return tracks
    return tracks.filter((t) => t.name.toLowerCase().includes(q))
  }, [searchQuery, tracks])

  const handleTrackSelect = (track) => {
    onTrackSelect(track)
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <motion.div whileHover={{ y: -2 }} className="group relative z-10">
      <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
        Background Music
      </label>
      
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black border-2 border-gray-100 hover:border-black transition-all duration-300 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex-shrink-0" />
            <div className="text-left min-w-0 flex-1">
              {selectedTrack ? (
                <>
                  <div className="font-semibold text-black text-sm sm:text-base truncate">{selectedTrack.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 truncate">{selectedTrack.artist}</div>
                </>
              ) : (
                <>
                  <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">
                    Choose Background Music
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Choose from your local music
                  </div>
                </>
              )}
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 flex-shrink-0 ml-2"
          >
            ↓
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute bottom-full left-0 right-0 mb-2 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl shadow-2xl z-[200] max-h-80 sm:max-h-96 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search music..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 sm:p-3 pl-8 sm:pl-10 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:border-black transition-colors text-xs sm:text-sm"
                  />
                  <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base">
                    /
                  </div>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-60 sm:max-h-80">
                {filteredTracks.length > 0 ? (
                  <div className="p-1 sm:p-2">
                    {filteredTracks.map((track, index) => (
                      <motion.button
                        key={`${track.id}-${index}`}
                        type="button"
                        onClick={() => handleTrackSelect(track)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                        className="w-full p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 sm:gap-3 text-left group"
                      >
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-md sm:rounded-lg bg-gray-100 border border-gray-200 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-black truncate group-hover:text-gray-800 text-sm sm:text-base">
                            {track.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate">
                            {track.artist}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <div className="text-xs text-gray-400 hidden sm:block">
                            Select
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 sm:p-6 text-center text-gray-500">
                    <p className="font-medium text-sm sm:text-base">
                      No music found
                    </p>
                    <p className="text-xs sm:text-sm mt-1">
                      Add audio files to the assets/music folder
                    </p>
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <div className="p-2 sm:p-3 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-1 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default MusicSelector