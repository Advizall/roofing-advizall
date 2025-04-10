
import { Shield, Users, Heart, Award, Lightbulb, Compass } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '01',
      title: 'Founded',
      description: 'PACC Solutions LLC was established with a mission to help homeowners navigate storm damage recovery.'
    },
    {
      year: '02',
      title: 'Regional Expansion',
      description: 'Expanded services to cover the entire Midwest region, helping hundreds of families.'
    },
    {
      year: '03',
      title: 'Industry Recognition',
      description: 'Received "Excellence in Customer Service" award from the National Restoration Association.'
    },
    {
      year: '04',
      title: 'Technology Integration',
      description: 'Implemented advanced digital inspection tools and customer communication platforms.'
    }
  ];

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-gold" />,
      title: 'Loyalty',
      description: 'We stand steadfast in our commitment to our values, our mission, the promises made and our team. We are stronger together.'
    },
    {
      icon: <Heart className="h-12 w-12 text-gold" />,
      title: 'Family',
      description: 'We believe that family is the cornerstone of a thriving society, serving as a foundation where values are taught and nurtured. Our conviction is that good humans build strong families, creating a ripple effect of positivity and strength that uplifts communities. We want to develop good humans.'
    },
    {
      icon: <Award className="h-12 w-12 text-gold" />,
      title: 'Trust',
      description: 'It takes time to build and seconds to lose. We trust the process, and we trust each other to be honest and transparent in action and communication. We want to build a legacy on trust.'
    },
    {
      icon: <Compass className="h-12 w-12 text-gold" />,
      title: 'Discipline',
      description: 'We do the things we don\'t want to do but need to do consistently over time. Discipline is the bridge between dreams and accomplishments. We do the hard work.'
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-gold" />,
      title: 'Adaptability',
      description: 'It takes change to achieve big goals and adaptability to thrive in a changing environment. It\'s not the strongest, or the most intelligent that survives, but the one that has the ability to adapt.'
    },
    {
      icon: <Users className="h-12 w-12 text-gold" />,
      title: 'Empowerment',
      description: 'We believe that each person is a powerhouse of potential to make a difference in their part of the world, and that difference starts with themselves. We equip our team to be bold, confident, and unashamed to live big. We aren\'t afraid to fail, we are afraid to live small.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-navy-400 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">
            About <span className="gold-gradient">PACC Solutions</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white/80 reveal" style={{ animationDelay: '0.2s' }}>
            <span className="font-semibold gold-gradient">Built to last</span> - Helping people rebuild after storms with honesty, professionalism, and experience.
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
              To enrich lives and create lasting impacts.
            </p>
          </div>

          <div className="reveal glass-card p-8 flex flex-col items-center text-center h-full" style={{ animationDelay: '0.4s' }}>
            <div className="mb-4 p-4 rounded-full bg-gold/10">
              <Compass className="h-10 w-10 text-gold" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 gold-gradient">Mission</h3>
            <p className="text-white/80 leading-relaxed">
              We empower our team to grow professionally and personally, while focusing on redefining the customer experience, building relationships that last.
            </p>
          </div>

          <div className="reveal glass-card p-8 flex flex-col items-center text-center h-full" style={{ animationDelay: '0.5s' }}>
            <div className="mb-4 p-4 rounded-full bg-gold/10">
              <Award className="h-10 w-10 text-gold" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 gold-gradient">Our Niche</h3>
            <p className="text-white/80 leading-relaxed">
              Delivering a frictionless experience in the property service industry.
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
