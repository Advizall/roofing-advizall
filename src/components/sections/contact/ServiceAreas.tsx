
export const ServiceAreas = () => {
  return (
    <div className="glass-card p-6 md:p-8 reveal flex-grow" style={{
      animationDelay: '0.5s'
    }}>
      <h3 className="text-2xl font-semibold mb-6 gold-gradient">Service Areas</h3>
      <p className="text-white/80 mb-4">
        We proudly serve homeowners throughout Illinois, including:
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Cook County</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">DuPage County</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Lake County</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Will County</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Kankakee County</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
          <span className="text-white/80">Kendall County</span>
        </div>
      </div>
    </div>
  );
};
