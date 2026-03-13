import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import eventCategories from "../data/eventCategories";

const EventDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = eventCategories.find((item) => item.slug === slug);

  if (!event) {
    return (
      <div className="bg-slate-950 text-slate-50 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold mb-3">Event not found</h1>
        <p className="text-slate-300 mb-6">
          We couldn't find that event type. Please explore our categories.
        </p>
        <Link
          to="/"
          className="px-5 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-slate-900" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Event category
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">{event.name}</h1>
          <p className="mt-4 text-lg text-slate-200/90 max-w-3xl">
            {event.desc}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/#request-form"
              className="bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 px-6 py-3 rounded-lg font-semibold shadow-lg shadow-rose-900/30 hover:translate-y-[-2px] transition"
            >
              Request this service
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:border-amber-400 hover:text-amber-200 transition"
            >
              Go back
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30">
              <h2 className="text-2xl font-semibold mb-3">Highlights</h2>
              <ul className="space-y-3 text-sm text-slate-200/90">
                {event.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30">
              <h2 className="text-2xl font-semibold mb-3">How booking works</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-200/90">
                <li>Share your requirements and budget range.</li>
                <li>Receive curated vendor shortlists with transparent packages.</li>
                <li>Confirm selections; we lock dates and send coordinated timelines.</li>
                <li>Automated reminders and a shared calendar keep everyone aligned.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30">
              <h3 className="text-xl font-semibold mb-4">Packages</h3>
              <div className="space-y-4">
                {event.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="border border-white/10 rounded-lg p-4 bg-slate-950/60"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{pkg.name}</p>
                      <p className="text-amber-300 font-semibold">{pkg.price}</p>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-200/80">
                      {pkg.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                to="/#request-form"
                className="block text-center mt-4 bg-amber-500 text-slate-950 font-semibold rounded-lg py-3 hover:bg-amber-400 transition"
              >
                Request a custom quote
              </Link>
            </div>

            <div className="bg-slate-900/70 border border-white/10 rounded-xl p-5 shadow-lg shadow-black/30">
              <h4 className="font-semibold mb-3">Looking for something else?</h4>
              <div className="space-y-2 text-sm">
                {eventCategories
                  .filter((item) => item.slug !== event.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      to={`/events/${item.slug}`}
                      className="flex items-center justify-between border border-white/10 rounded-lg px-3 py-2 hover:border-amber-300 transition"
                    >
                      <span>{item.name}</span>
                      <span className="text-amber-300 text-xs">View</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
