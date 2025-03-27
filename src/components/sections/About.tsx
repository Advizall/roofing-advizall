
import { Shield, Clock, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2015',
      title: 'Founded',
      description: 'PACC Solutions LLC was established with a mission to help homeowners navigate storm damage recovery.'
    },
    {
      year: '2018',
      title: 'Regional Expansion',
      description: 'Expanded services to cover the entire Midwest region, helping hundreds of families.'
    },
    {
      year: '2020',
      title: 'Industry Recognition',
      description: 'Received "Excellence in Customer Service" award from the National Restoration Association.'
    },
    {
      year: '2023',
      title: 'Technology Integration',
      description: 'Implemented advanced digital inspection tools and customer communication platforms.'
    }
  ];

  const values = [
    {
      icon: <Shield className="h-10 w-10 text-gold" />,
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty in every interaction.'
    },
    {
      icon: <Clock className="h-10 w-10 text-gold" />,
      title: 'Efficiency',
      description: 'We work diligently to expedite your claim and restoration process.'
    },
    {
      icon: <Award className="h-10 w-10 text-gold" />,
      title: 'Excellence',
      description: 'We deliver superior results through expertise and attention to detail.'
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
            Helping people rebuild after storms with honesty, professionalism, and experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Our Mission</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                At PACC Solutions LLC, we understand the stress and uncertainty that follows storm damage to your home. Our mission is to stand by your side throughout the entire recovery process, from the initial inspection to the final restoration.
              </p>
              <p className="text-white/80 leading-relaxed">
                We advocate for homeowners, ensuring they receive fair treatment from insurance companies and quality workmanship in repairs. Our team combines technical expertise with compassionate service to transform a challenging experience into a smooth journey toward restoring your home and peace of mind.
              </p>
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 gold-gradient">Our Values</h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">{value.icon}</div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">{value.title}</h4>
                      <p className="text-white/80">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 reveal" style={{ animationDelay: '0.5s' }}>
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
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
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
    </section>
  );
};

export default About;
