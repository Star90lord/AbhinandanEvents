function Home() {
  const events = [
    
    {
      id: 1,
      title: "Royal Wedding Event",
      desc: "Luxury wedding planning with decoration & catering.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552",
    },
    {
      id: 2,
      title: "Corporate Conference",
      desc: "Professional event setup for business meetings.",
      img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    },
    {
      id: 3,
      title: "Birthday Celebration",
      desc: "Fun birthday themes with DJ & live music.",
      img: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
    },
    {
      id: 4,
      title: "College Fest",
      desc: "Complete fest management with stage & lighting.",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Premium Hero Section */}
<div className="relative h-[90vh] flex items-center justify-center text-center text-white">

  {/* Attractive Event Background */}
  <img
    src="https://images.unsplash.com/photo-1511578314322-379afb476865"
    alt="Luxury Wedding Event"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Soft Gradient Overlay (Not Too Dark) */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

  {/* Content */}
  <div className="relative z-10 px-6">
    <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
      Welcome to Abhinandan Events ✨
    </h1>

    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
      Creating Magical Weddings, Corporate Shows &
      Grand Celebrations with Perfection.
    </p>

    <button className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg transition shadow-lg">
      Explore Events
    </button>
  </div>
</div>

      {/* Events Section */}
      <div className="p-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={event.img}
              alt={event.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                {event.title}
              </h2>
              <p className="text-gray-600 mb-4">{event.desc}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;