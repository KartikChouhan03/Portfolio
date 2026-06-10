'use client';

import { useState } from 'react';
import { Terminal, Cpu, Zap, Code } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { cn } from '@/lib/utils';
import styles from './Lab.module.css';

interface Experiment {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: string;
  icon: 'terminal' | 'cpu' | 'zap';
  code: string;
  language: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'deceptiscan-inference',
    title: 'DeBERTa-v3 Fake Review Inference',
    category: 'AI / NLP',
    description:
      'Inference runner for DeceptiScan. Loads a fine-tuned DeBERTa-v3 sequence classification model using Hugging Face Transformers to evaluate and output the probability of a product review being deceptive.',
    stats: 'Model Accuracy: 96.8% | Average Inference Latency: ~12ms',
    icon: 'cpu',
    code: `import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def analyze_review(review_text: str):
    # Load fine-tuned DeBERTa model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained("microsoft/deberta-v3-small")
    model = AutoModelForSequenceClassification.from_pretrained("./deceptiscan-model")
    
    inputs = tokenizer(review_text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)
    
    # Returns probability of review being deceptive (Class 1)
    return probs[0][1].item()

prob = analyze_review("Excellent product! Very highly recommended.")
print(f"Deceptive Probability: {prob:.4f}")`,
    language: 'python',
  },
  {
    id: 'smartparkx-plate',
    title: 'OpenCV License Plate Segmenter',
    category: 'Computer Vision',
    description:
      'License plate extraction pipeline for SmartParkX ANPR workflows. Converts incoming parking gate video frames to grayscale, applies bilateral filtering, runs Canny edge detection, and isolates plate contours for OCR.',
    stats: 'ESP32 Check-in: sub-100ms | Slot Detection Accuracy: 95%',
    icon: 'zap',
    code: `import cv2
import pytesseract

def extract_license_plate(image_path: str):
    # Load frame and preprocess
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Smooth image to preserve edges while filtering noise
    filtered = cv2.bilateralFilter(gray, 11, 17, 17)
    edged = cv2.Canny(filtered, 30, 200)
    
    # Locate candidate contours
    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    # Filter for rectangular plate contours and extract text
    # ...
    return pytesseract.image_to_string(filtered)`,
    language: 'python',
  },
  {
    id: 'riskshield-interpretability',
    title: 'SHAP Explainable Fraud Classifier',
    category: 'Machine Learning',
    description:
      'Transaction risk scoring engine with explainable AI details. Loads a pre-trained fraud classifier and runs SHAP TreeExplainer to calculate SHapley values, exposing exactly which features drove the risk prediction.',
    stats: 'Dataset size: 284,807 | High / Med / Low Risk categories',
    icon: 'terminal',
    code: `import shap
import pickle
import pandas as pd

def explain_transaction(features_dict: dict):
    # Load trained Random Forest model
    with open("riskshield_model.pkl", "rb") as f:
        model = pickle.load(f)
        
    df = pd.DataFrame([features_dict])
    probability = model.predict_proba(df)[0][1]
    
    # Evaluate feature impact contributions via SHAP TreeExplainer
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(df)
    
    return probability, shap_values

tx = {"V1": -1.35, "V2": 1.20, "Amount": 149.99}
prob, explanations = explain_transaction(tx)
print(f"Risk Probability: {prob:.2%}")`,
    language: 'python',
  },
];

export function Lab() {
  const [activeExp, setActiveExp] = useState<Experiment>(EXPERIMENTS[0]);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return <Cpu className={styles.icon} size={20} />;
      case 'zap':
        return <Zap className={styles.icon} size={20} />;
      default:
        return <Terminal className={styles.icon} size={20} />;
    }
  };

  return (
    <section id="lab" data-section-id="lab" className={styles.lab}>
      <div className="container">
        
        <SectionHeading subtitle="Tinkering with models, scripts, and algorithms" align="left">
          Engineering Lab
        </SectionHeading>

        <div className={styles.layout}>
          
          {/* Left Panel: Experiment selector list */}
          <div className={styles.selectorPane}>
            <p className={styles.paneTitle}>Active Sandbox Experiments</p>
            <div className={styles.list}>
              {EXPERIMENTS.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExp(exp)}
                  className={cn(styles.expItem, activeExp.id === exp.id && styles.expItemActive)}
                >
                  <div className={styles.itemHeader}>
                    {renderIcon(exp.icon)}
                    <span className={styles.itemCategory}>{exp.category}</span>
                  </div>
                  <h4 className={styles.itemTitle}>{exp.title}</h4>
                  <p className={styles.itemSummary}>{exp.description.substring(0, 80)}...</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Terminal/Code Viewer */}
          <div className={styles.displayPane}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.terminalTitle}>
                {activeExp.id}.{activeExp.language === 'python' ? 'py' : 'ts'}
              </span>
              <div className={styles.terminalLang}>
                <Code size={14} />
                <span>{activeExp.language}</span>
              </div>
            </div>

            {/* Code display with JetBrains Mono font */}
            <div className={styles.codeWrapper}>
              <pre className={styles.codeBlock}>
                <code>{activeExp.code}</code>
              </pre>
            </div>

            {/* Experiment Performance Footer */}
            <div className={styles.performanceCard}>
              <div className={styles.perfLabel}>Experiment Metrics & Benchmark</div>
              <div className={styles.perfStats}>{activeExp.stats}</div>
              <p className={styles.perfDesc}>{activeExp.description}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
export default Lab;
