import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  Globe,
  Heart,
} from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14 text-white">

      {/* Hero */}

      <div className="text-center">

        <div className="w-14 h-14 mx-auto rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
          <Zap size={26} />
        </div>

        <h1 className="text-5xl font-bold mt-6">
          About <span className="text-yellow-400">SkyMart</span>
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto mt-5 leading-8">
          SkyMart is a modern e-commerce platform built to make online
          shopping simple, fast, and enjoyable. We believe that shopping
          should be effortless, transparent, and accessible to everyone.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">

        <div className="border border-gray-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition-colors">
          <Package className="mx-auto text-yellow-400" />
          <h2 className="text-3xl font-bold mt-4">20K+</h2>
          <p className="text-gray-400 mt-2">Products</p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition-colors">
          <Users className="mx-auto text-yellow-400" />
          <h2 className="text-3xl font-bold mt-4">50K+</h2>
          <p className="text-gray-400 mt-2">Happy Customers</p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition-colors">
          <Star className="mx-auto text-yellow-400 fill-yellow-400" />
          <h2 className="text-3xl font-bold mt-4">4.9</h2>
          <p className="text-gray-400 mt-2">Average Rating</p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition-colors">
          <Truck className="mx-auto text-yellow-400" />
          <h2 className="text-3xl font-bold mt-4">99%</h2>
          <p className="text-gray-400 mt-2">On-Time Delivery</p>
        </div>

      </div>

      {/* Story */}

      <div className="border border-gray-700 rounded-3xl p-8 mt-14">

        <h2 className="text-3xl font-bold">
          Our Story
        </h2>

        <p className="text-gray-400 mt-6 leading-8">
          SkyMart started in 2023 with one simple vision — to make online
          shopping enjoyable for everyone. We wanted to create a platform
          where people could discover quality products without unnecessary
          complexity.
        </p>

        <p className="text-gray-400 mt-4 leading-8">
          From a handful of products to thousands of happy customers,
          SkyMart has continued to grow while staying committed to customer
          satisfaction, honest pricing, and exceptional service.
        </p>

      </div>

      {/* Values */}

      <h2 className="text-3xl font-bold text-center mt-16">
        What We Stand For
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 transition-colors">
          <ShieldCheck className="text-yellow-400" />

          <h3 className="text-xl font-semibold mt-4">
            Trust
          </h3>

          <p className="text-gray-400 mt-2 leading-7">
            Every product listed on SkyMart is carefully selected to ensure
            quality, authenticity, and customer satisfaction.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 transition-colors">
          <Truck className="text-yellow-400" />

          <h3 className="text-xl font-semibold mt-4">
            Speed
          </h3>

          <p className="text-gray-400 mt-2 leading-7">
            Fast order processing and reliable shipping mean your purchases
            reach you as quickly as possible.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 transition-colors">
          <Heart className="text-yellow-400" />

          <h3 className="text-xl font-semibold mt-4">
            Customer First
          </h3>

          <p className="text-gray-400 mt-2 leading-7">
            Every feature we build starts with one question:
            "Will this improve the shopping experience?"
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 transition-colors">
          <Globe className="text-yellow-400" />

          <h3 className="text-xl font-semibold mt-4">
            Accessibility
          </h3>

          <p className="text-gray-400 mt-2 leading-7">
            Shopping should be easy for everyone, on every device, from
            anywhere in the world.
          </p>
        </div>

      </div>

      {/* Team */}

      <h2 className="text-3xl font-bold text-center mt-16">
        Meet the Team
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

        {[
          {
            name: "Azeem Ali",
            role: "Founder & Full Stack Developer",
            color: "bg-yellow-400",
          },
          {
            name: "Priya Sharma",
            role: "UI/UX Designer",
            color: "bg-blue-500",
          },
          {
            name: "Rohan Mehta",
            role: "Backend Engineer",
            color: "bg-purple-500",
          },
          {
            name: "Sneha Kapoor",
            role: "Product Manager",
            color: "bg-pink-500",
          },
        ].map((member) => (
          <div
            key={member.name}
            className="border border-gray-700 rounded-2xl p-6 text-center hover:border-yellow-400 transition-colors"
          >
            <div
              className={`${member.color} w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto`}
            >
              {member.name.charAt(0)}
            </div>

            <h3 className="font-semibold mt-4">
              {member.name}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {member.role}
            </p>
          </div>
        ))}

      </div>

      {/* CTA */}

      <div className="mt-16 border border-yellow-500/40 rounded-3xl p-10 text-center bg-[#121212]">

        <h2 className="text-4xl font-bold">
          Ready to Shop?
        </h2>

        <p className="text-gray-400 mt-4">
          Discover thousands of carefully selected products at unbeatable
          prices.
        </p>

        <Link
          to="/products"
          className="inline-flex mt-8 bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-2xl font-semibold transition-colors"
        >
          Browse Products
        </Link>

      </div>

    </div>
  );
};

export default About;