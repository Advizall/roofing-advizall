import { Shield, Users, Heart, Award, Lightbulb, Compass } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2004',
      title: 'Founded',
      description: 'The Dirty Roofer was established as a family-owned business serving the New England area.'
    },
    {
      year: '2010',
      title: 'Service Expansion',
      description: 'Expanded services to include custom copper work and slate roofing throughout Boston and surrounding areas.'
    },
    {
      year: '2015',
      title: 'Certification Achievement',
      description: 'Received Master Shingle Applicator certification from CertainTeed Corporation and EPDM certification.'
    },
    {
      year: '2021',
      title: 'Boston Copperworks',
      description: 'Launched specialized subsidiary Boston Copperworks offering "Custom Copperwork at its Finest".'
    }
  ];

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-gold" />,
      title: 'Craftsmanship',
      description: 'We take pride in our work and deliver the highest quality craftsmanship on every project, from small repairs to custom copper installations.'
    },
    {
      icon: <Heart className="h-12 w-12 text-gold" />,
      title: 'Family',
      description: 'As a family-owned business, we treat every customer like family, providing personalized service and attention to detail that larger companies cannot match.'
    },
    {
      icon: <Award className="h-12 w-12 text-gold" />,
      title: 'Quality',
      description: 'We use only the finest materials and time-tested techniques to ensure every roof we install or repair stands the test of time and weather.'
    },
    {
      icon: <Compass className="h-12 w-12 text-gold" />,
      title: 'Reliability',
      description: 'When we make a commitment, we stand by it. Our customers know they can count on us to show up on time and complete projects as promised.'
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-gold" />,
      title: 'Expertise',
      description: 'With nearly two decades of experience in diverse roofing applications, we have the specialized knowledge to tackle any roofing challenge effectively.'
    },
    {
      icon: <Users className="h-12 w-12 text-gold" />,
      title: 'Community',
      description: 'We\'ve built our reputation in the New England community through word of mouth and relationships that span generations of satisfied customers.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-navy-400 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            About <span className="gold-gradient">The Dirty Roofer</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            <span className="font-semibold gold-gradient">Built to last</span> - A collection of the most talented roofing specialists serving residential and commercial projects in New England.
          </p>
        </div>

        {/* Vision, Mission, and Niche */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="reveal glass-card p-8 flex flex-col items-center text-center h-full" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4 p-4 rounded-full bg-gold/10">
              <Shield className="h-10 w-10 text-gold" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 gold-gradient">Vision</h3>
            <p className="text-white/80 leading-relaxed">
              To be the most trusted name in roofing across New England.
            </p>
          </div>

          <div className="reveal glass-card p-8 flex flex-col items-center text-center h-full" style={{ animationDelay: '0.4s' }}>
            <div className="mb-4 p-4 rounded-full bg-gold/10">
              <Compass className="h-10 w-10 text-gold" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 gold-gradient">Mission</h3>
            <p className="text-white/80 leading-relaxed">
              Providing exceptional roofing services with unmatched craftsmanship, ensuring every project meets our high standards.
            </p>
          </div>

          <div className="reveal glass-card p-8 flex flex-col items-center text-center h-full" style={{ animationDelay: '0.5s' }}>
            <div className="mb-4 p-4 rounded-full bg-gold/10">
              <Award className="h-10 w-10 text-gold" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 gold-gradient">Our Specialty</h3>
            <p className="text-white/80 leading-relaxed">
              Custom copper work and expert installation of slate, rubber, and asphalt roofing systems.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20 reveal" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our <span className="gold-gradient">Values</span>
            </h3>
            <p className="text-lg max-w-3xl mx-auto text-white/80">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="glass-card p-8 flex flex-col h-full reveal" 
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="mb-5">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-white/80 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mt-20 reveal" style={{ animationDelay: '1.3s' }}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Our <span className="gold-gradient">Growth Timeline</span>
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold/30"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} reveal`}
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                    <h4 className="text-xl font-semibold mb-2">{milestone.title}</h4>
                    <p className="text-white/80">{milestone.description}</p>
                  </div>
                  
                  {/* Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center z-10">
                    <span className="text-navy-500 font-bold">{milestone.year.slice(2)}</span>
                  </div>
                  
                  {/* Empty space */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gold/5 to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gold/5 to-transparent opacity-30 blur-3xl"></div>
    </section>
  );
};

export default About;
