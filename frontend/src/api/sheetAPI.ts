import { Tab, FlowResult } from "../types";

const API_BASE_URL = 'http://localhost:3001';  // Adjust as needed

export async function fetchTabs(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-tabs`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There was a problem fetching tabs:', error);
    return [];
  }
}

export async function calculateFlow(tab: string): Promise<FlowResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate-flow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tab })
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There was a problem calculating water flow:', error);
    return { count: 0, coordinates: [], grid: [] };
  }
}
