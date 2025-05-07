export const ServiceAreas = () => {
  return (
    <div className="glass-card p-6 md:p-8 reveal flex-grow" style={{
      animationDelay: '0.5s'
    }}>
      <h3 className="text-2xl font-semibold mb-6 gold-gradient">Service Areas</h3>
      <p className="text-white/80 mb-4">
        We proudly serve throughout Boston and surrounding areas:
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Boston</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Cambridge</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Brookline</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Newton</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Quincy</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Milton</span>
        </div>
      </div>
    </div>
  );
};
