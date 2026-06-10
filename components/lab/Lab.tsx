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
    id: 'inference-sandbox',
    title: 'ONNX Dynamic Quantization Sandbox',
    category: 'Inference Optimization',
    description:
      'A bench-testing utility designed to apply post-training dynamic quantization to float32 model structures. Quantizes weight matrices to int8 to reduce memory footprint and boost edge execution speeds.',
    stats: 'Inference Speedup: 2.4x | Size reduction: 74%',
    icon: 'cpu',
    code: `import onnx
from onnxruntime.quantization import quantize_dynamic, QuantType

def optimize_onnx_model(model_path: str, output_path: str):
    # Quantize linear layers from float32 to int8
    quantize_dynamic(
        model_input=model_path,
        model_output=output_path,
        weight_type=QuantType.QUInt8
    )
    print("Optimization complete: Int8 quantization applied successfully.")

optimize_onnx_model("model.onnx", "model_quant.onnx")`,
    language: 'python',
  },
  {
    id: 'fps-counter',
    title: 'Frame Pipeline Batch Profiler',
    category: 'Computer Vision',
    description:
      'Performance evaluation script simulating multi-stream video input streams. Batches frames asynchronously to maximize TPU memory utilization during live YOLOv8 model evaluations.',
    stats: 'Throughput: 148 FPS | Streams: 8 parallel',
    icon: 'zap',
    code: `import cv2
import queue
import threading

class StreamProfiler:
    def __init__(self, buffer_size=32):
        self.frame_queue = queue.Queue(maxsize=buffer_size)
        self.is_running = True

    def enqueue_stream(self, rtsp_url):
        cap = cv2.VideoCapture(rtsp_url)
        while self.is_running:
            ret, frame = cap.read()
            if not ret: break
            if not self.frame_queue.full():
                self.frame_queue.put(frame)
        cap.release()`,
    language: 'python',
  },
  {
    id: 'redis-broker',
    title: 'Redis Event Broker Queue',
    category: 'Backend Architecture',
    description:
      'Highly concurrent Node.js handler managing real-time slot state changes. Brokered messages through Redis Pub/Sub channels to update client dash connection nodes under 15ms.',
    stats: 'Broker latency: 8.5ms | Msg/sec: 12,000+',
    icon: 'terminal',
    code: `import { createClient } from 'redis';

async function launchEventBroker() {
  const publisher = createClient();
  const subscriber = publisher.duplicate();
  
  await Promise.all([publisher.connect(), subscriber.connect()]);
  
  await subscriber.subscribe('slot-updates', (message) => {
    const data = JSON.parse(message);
    console.log(\`[Broker Hub] Slot \${data.id} is now \${data.status}\`);
  });
}

launchEventBroker().catch(console.error);`,
    language: 'typescript',
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
