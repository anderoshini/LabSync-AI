
type ParameterInsight = {
  description: string;
  deficiencyReason: string;
  improvement: string;
  funFact: string;
};

type ParameterInsights = {
  [key: string]: ParameterInsight;
};

export const parameterInsights: ParameterInsights = {
  // CBC Parameters
  hemoglobin: {
    description: "A protein in red blood cells that carries oxygen throughout the body",
    deficiencyReason: "Common causes include iron deficiency, blood loss, or poor nutrition",
    improvement: "Increase iron-rich foods (meat, leafy greens), vitamin C for better absorption",
    funFact: "Hemoglobin makes blood red, but it's actually deep purple when not bound to oxygen!"
  },
  wbc: {
    description: "White blood cells that fight infection and disease",
    deficiencyReason: "Can be caused by viral infections, severe infections, or bone marrow problems",
    improvement: "Maintain good hygiene, healthy diet rich in vitamins B12 and folate",
    funFact: "A single white blood cell can destroy hundreds of bacteria in its lifetime!"
  },
  platelets: {
    description: "Blood cells that help form clots to stop bleeding",
    deficiencyReason: "May be due to immune system problems or bone marrow disorders",
    improvement: "Eat foods rich in vitamin K and folate, avoid alcohol",
    funFact: "Platelets have a lifespan of just 8-10 days, yet your body produces millions each day!"
  },
  // Liver Function Parameters
  total_protein: {
    description: "Measures all proteins in blood, indicating liver and kidney health",
    deficiencyReason: "Can be caused by malnutrition, malabsorption, or liver disease",
    improvement: "Increase protein intake through lean meats, eggs, and legumes",
    funFact: "Your body contains about 2-3 pounds of proteins in total!"
  },
  albumin: {
    description: "Main protein in blood plasma, maintains blood volume",
    deficiencyReason: "Often indicates malnutrition or liver/kidney problems",
    improvement: "Eat protein-rich foods, maintain healthy liver function",
    funFact: "Albumin helps transport hormones and vitamins throughout your body!"
  },
  total_bilirubin: {
    description: "Waste product from breakdown of red blood cells",
    deficiencyReason: "High levels may indicate liver problems or blood cell destruction",
    improvement: "Maintain healthy liver function, avoid alcohol and processed foods",
    funFact: "Bilirubin gives bruises their yellow-green color as they heal!"
  },
  sgot_ast: {
    description: "Enzyme found in liver cells, indicates liver health",
    deficiencyReason: "Elevated levels suggest liver cell damage",
    improvement: "Avoid alcohol, maintain healthy weight, exercise regularly",
    funFact: "This enzyme is also found in heart muscle cells!"
  },
  sgpt_alt: {
    description: "Liver enzyme more specific to liver health than AST",
    deficiencyReason: "High levels indicate liver inflammation or damage",
    improvement: "Limit processed foods, alcohol, and maintain healthy weight",
    funFact: "ALT levels can temporarily rise after intense exercise!"
  },
  alkaline_phosphatase: {
    description: "Enzyme found in liver and bones",
    deficiencyReason: "Elevated levels may indicate liver or bone disorders",
    improvement: "Maintain vitamin D levels, balanced diet with calcium",
    funFact: "This enzyme helps break down proteins in the intestines!"
  },
  globulin: {
    description: "Proteins made by the immune system",
    deficiencyReason: "Low levels may indicate immune system problems",
    improvement: "Eat a balanced diet, get adequate sleep, manage stress",
    funFact: "Globulins help transport vitamins A, D, E, and K through your blood!"
  }
};
