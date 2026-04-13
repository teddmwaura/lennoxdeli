import { generateSystemInsights } from './aiInsights.js';

export function initAIPage() {
  const button = document.querySelector('.generate-ai-btn');
  const output = document.getElementById('aiOutput');

  if (!button || !output) return;

  button.addEventListener('click', () => {
    const insights = generateSystemInsights();

    if (insights.length === 0) {
      output.innerHTML = "<p>No insights available.</p>";
      return;
    }

    output.innerHTML = insights
      .map(i => `<p>• ${i}</p>`)
      .join('');
  });
}