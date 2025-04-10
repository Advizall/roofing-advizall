
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
}

const VideoPlayer = ({ url, title, className }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  
  const isMobile = useIsMobile();
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      setControlsVisible(true);
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      if (playing) {
        controlsTimeout.current = setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
      }
    };
    
    const playerContainer = containerRef.current;
    if (playerContainer) {
      playerContainer.addEventListener('mousemove', handleMouseMove);
      playerContainer.addEventListener('touchstart', handleMouseMove);
      
      return () => {
        playerContainer.removeEventListener('mousemove', handleMouseMove);
        playerContainer.removeEventListener('touchstart', handleMouseMove);
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
      };
    }
  }, [playing]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number; loaded: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat((e.target as HTMLInputElement).value));
    }
  };

  const handleToggleFullscreen = () => {
    if (isMobile) {
      // No iOS, use o fullscreen nativo do youtube
      if (playerRef.current) {
        // Pausar e reiniciar o vídeo com controles nativos do YouTube
        const currentTime = playerRef.current.getCurrentTime();
        
        // Criar uma URL de incorporação que vai para o mesmo ponto do vídeo
        // e forçar controles nativos e fullscreen
        const videoId = url.includes('youtube.com') 
          ? url.split('v=')[1].split('&')[0]
          : url.includes('youtu.be')
            ? url.split('/').pop()?.split('?')[0]
            : '';
            
        if (videoId) {
          const encodedUrl = `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(currentTime)}s&fs=1&controls=1`;
          window.open(encodedUrl, '_blank');
        }
      }
    } else {
      // Em desktop, use a API Fullscreen normal
      if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const duration = playerRef.current ? playerRef.current.getDuration() : 0;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl glass-card shadow-lg transition-all duration-300",
        className
      )}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => playing && setControlsVisible(false)}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-400 z-10">
          <div className="w-12 h-12 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
        </div>
      )}
      
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onReady={() => setLoaded(true)}
        style={{ backgroundColor: '#05101B' }}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              rel: 0,
              modestbranding: 1,
              fs: 0,
              controls: 0,
              disablekb: 1,
            }
          }
        }}
      />
      
      {title && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-navy-500/80 to-transparent z-20">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-500/80 to-transparent transition-opacity duration-300 z-20",
          controlsVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress bar */}
        <div className="mb-2">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            onTouchStart={handleSeekMouseDown}
            onTouchEnd={handleSeekMouseUp as any}
            className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
          />
          <div className="flex justify-between text-xs mt-1 text-white/80">
            <span>{formatTime(played * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePlayPause} 
              className="p-2 rounded-full bg-gold/90 hover:bg-gold text-navy-500 transition-colors"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleToggleMute} 
                className="text-white hover:text-gold transition-colors"
              >
                {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
              />
            </div>
          </div>
          
          <button 
            onClick={handleToggleFullscreen} 
            className="text-white hover:text-gold transition-colors"
            aria-label="Toggle fullscreen"
          >
            {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
      
      {/* Play/Pause overlay on video click */}
      {!playing && controlsVisible && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-navy-500/20 cursor-pointer z-10"
          onClick={handlePlayPause}
        >
          <button 
            className="p-5 rounded-full bg-gold/90 hover:bg-gold text-navy-500 transition-all duration-300 transform hover:scale-110"
            onClick={handlePlayPause}
          >
            <Play size={30} />
          </button>
        </div>
      )}
      
      {/* Area for play/pause on click */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={handlePlayPause}
      ></div>
    </div>
  );
};

export default VideoPlayer;
