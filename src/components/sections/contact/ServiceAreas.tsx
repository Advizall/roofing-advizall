export const ServiceAreas = () => {
  const areas = [
    "Boston", "Beacon Hill", "Back Bay", "South End", 
    "East Boston", "Brighton", "Allston", "Dorchester", 
    "Roxbury", "West Roxbury", "Mattapan", "Charlestown", 
    "South Boston", "Roslindale", "Hyde Park", "Jamaica Plain", 
    "North End", "Cambridge", "Braintree", "Brookline", 
    "Newton", "Newton Center", "Newton Highlands", "Chestnut Hill", 
    "West Newton", "Auburndale", "Quincy", "Milton", 
    "Watertown", "Suffolk County MA"
  ];

  return (
    <div className="glass-card p-6 md:p-8 reveal flex-grow" style={{
      animationDelay: '0.5s'
    }}>
      <h3 className="text-2xl font-semibold mb-6 gold-gradient">Service Areas</h3>
      <p className="text-white/80 mb-4">
        We proudly serve throughout Boston and surrounding areas:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {areas.map((area, index) => (
          <div key={index} className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-gold mr-2"></div>
            <span className="text-white/80">{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
