import React from 'react';

const aboutData = {
  title: 'Made4UU',
  description: 'Made4UU is a modern MERN stack e-commerce platform built with MongoDB, Express.js, React, and Node.js. We empower shoppers with seamless browsing, secure checkout, personalized recommendations, and fast delivery across categories like fashion, electronics, and home essentials.',
  mission: 'Our mission is to make online shopping accessible, affordable, and tailored just for you—because every product is made4UU.',
  founded: '2025',
  tagline: 'Shopping made personal, just for U.',
  team: [
    { 
      name: 'John Doe', 
      role: 'Founder & CEO', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: '15+ years in e-commerce innovation'
    },
    { 
      name: 'Jane Smith', 
      role: 'CTO & Lead Developer', 
      image: 'https://media.istockphoto.com/id/2165425195/photo/portrait-of-a-man-in-an-office.jpg?s=1024x1024&w=is&k=20&c=tl5FUJDIyFjdvygEKHDPXKhvPq-_PSjfK35SRtdTq7I=',
      bio: 'Full-stack expert specializing in MERN'
    },
    { 
      name: 'Mike Johnson', 
      role: 'Head of Operations', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Logistics & supply chain specialist'
    }
  ],
  stats: [
    { label: 'Happy Customers', value: '10K+', icon: '👥' },
    { label: 'Products Available', value: '50K+', icon: '🛍️' },
    { label: 'Orders Delivered', value: '100K+', icon: '🚚' },
    { label: 'Years in Business', value: '1+', icon: '📅' }
  ],
  features: [
    'Secure Payments',
    'Fast Delivery',
    'Easy Returns',
    '24/7 Support'
  ]
};

export default function Aboutus() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-24">
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {aboutData.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {aboutData.description}
          </p>
          <p className="text-2xl font-semibold text-blue-600 mt-4 italic">
            "{aboutData.tagline}"
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=700&fit=crop" 
            alt="Made4UU E-commerce Platform"
            className="w-full rounded-3xl shadow-2xl object-cover h-80 md:h-96 lg:h-125"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <h2 className="text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
        <div className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl shadow-xl">
          <p className="text-2xl text-gray-700 leading-relaxed mb-8">
            {aboutData.mission}
          </p>
          <p className="text-xl text-gray-600">
            Founded in <span className="font-bold text-blue-600">{aboutData.founded}</span>, we're committed to revolutionizing e-commerce with cutting-edge MERN technology.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {aboutData.stats.map((stat, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
              <div className="text-4xl md:text-5xl mb-4">{stat.icon}</div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">Why Choose Made4UU?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {aboutData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <span className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {aboutData.team.map((member, index) => (
            <div key={index} className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 group">
              <div className="relative mb-8">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover shadow-2xl group-hover:scale-110 transition-transform duration-300 border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-blue-600 font-semibold text-xl mb-4">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <div className="bg-linear-to-r from-blue-600 to-purple-700 text-white p-16 rounded-3xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to experience Made4UU?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">Join thousands of satisfied customers today!</p>
          <div className="space-x-4">
            <a 
              href="/products" 
              className="inline-block bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Shop Now
            </a>
            <a 
              href="/contact" 
              className="inline-block border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
