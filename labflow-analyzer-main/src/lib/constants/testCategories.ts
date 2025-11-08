
import { Droplet, TestTube, Heart, Activity, LucideIcon } from 'lucide-react';

type MetricRange = {
  min: number;
  max: number;
  unit: string;
};

type TestCategory = {
  icon: LucideIcon;
  metrics: {
    [key: string]: MetricRange;
  };
};

type TestCategories = {
  [key: string]: TestCategory;
};

export const testCategories: TestCategories = {
  'Complete Blood Count': {
    icon: Droplet,
    metrics: {
      hemoglobin: { min: 12, max: 15, unit: "g/dL" },
      wbc: { min: 4000, max: 11000, unit: "/µL" },
      platelets: { min: 150000, max: 450000, unit: "/µL" },
      rbc: { min: 4.0, max: 5.5, unit: "million/µL" },
      hct: { min: 36, max: 48, unit: "%" },
      mcv: { min: 80, max: 100, unit: "fL" },
      mch: { min: 27, max: 32, unit: "pg" },
      mchc: { min: 32, max: 36, unit: "g/dL" },
      neutrophils: { min: 40, max: 70, unit: "%" },
      lymphocytes: { min: 20, max: 40, unit: "%" },
      monocytes: { min: 2, max: 10, unit: "%" },
      eosinophils: { min: 1, max: 6, unit: "%" },
      basophils: { min: 0, max: 2, unit: "%" }
    }
  },
  'Liver Function': {
    icon: TestTube,
    metrics: {
      total_bilirubin: { min: 0.3, max: 1.2, unit: "mg/dL" },
      direct_bilirubin: { min: 0.1, max: 0.4, unit: "mg/dL" },
      indirect_bilirubin: { min: 0.2, max: 0.8, unit: "mg/dL" },
      ast: { min: 8, max: 40, unit: "U/L" },
      alt: { min: 7, max: 56, unit: "U/L" },
      alp: { min: 44, max: 147, unit: "U/L" },
      total_protein: { min: 6.0, max: 8.3, unit: "g/dL" },
      albumin: { min: 3.5, max: 5.2, unit: "g/dL" },
      globulin: { min: 2.0, max: 3.5, unit: "g/dL" },
      ag_ratio: { min: 1.0, max: 2.2, unit: "" },
      ggt: { min: 9, max: 48, unit: "U/L" },
      ldh: { min: 100, max: 250, unit: "U/L" }
    }
  },
  'Lipid Profile': {
    icon: Heart,
    metrics: {
      cholesterol: { min: 150, max: 200, unit: "mg/dL" },
      hdl: { min: 40, max: 60, unit: "mg/dL" },
      ldl: { min: 100, max: 130, unit: "mg/dL" },
      triglycerides: { min: 50, max: 150, unit: "mg/dL" }
    }
  },
  'Diabetes': {
    icon: Activity,
    metrics: {
      glucose: { min: 70, max: 100, unit: "mg/dL" },
      hba1c: { min: 4, max: 5.7, unit: "%" }
    }
  }
};

export const categoryToTestType: { [key: string]: string } = {
  'Complete Blood Count': 'cbc',
  'Liver Function': 'lft',
  'Lipid Profile': 'lipid_profile',
  'Diabetes': 'diabetes'
};
