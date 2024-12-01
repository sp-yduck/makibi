import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <section className="bg-red-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Make your life easier with Makibi
        </h1>
        <p className="text-xl mb-8">
          Makibi helps you manage your OKRs effectively
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-50"
        >
          Get Started Free
        </button>
      </div>
    </section>
  );
};

export default Hero;
