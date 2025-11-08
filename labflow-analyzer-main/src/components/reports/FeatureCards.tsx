
export const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {[
        {
          title: "Quick Analysis",
          description: "Get instant insights from your lab reports",
        },
        {
          title: "Track Progress",
          description: "Monitor your health metrics over time",
        },
        {
          title: "Secure Storage",
          description: "Your data is encrypted and stored safely",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-lg text-gray-900">
            {feature.title}
          </h3>
          <p className="mt-2 text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
