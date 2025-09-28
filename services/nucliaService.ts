// FIX: Removed `FindFeature` from import as it is not an exported member of '@nuclia/core'.
import { Nuclia, type Resource } from '@nuclia/core';
import { firstValueFrom } from 'rxjs';

// IMPORTANT: Set these in your .env file
const NUCLIA_KBID = process.env.VITE_NUCLIA_KBID;
const NUCLIA_API_KEY = process.env.VITE_NUCLIA_API_KEY;

// Conditionally initialize the Nuclia client
let nuclia: Nuclia | null = null;
if (NUCLIA_KBID && NUCLIA_API_KEY) {
  nuclia = new Nuclia({
    knowledgeBox: NUCLIA_KBID,
    apiKey: NUCLIA_API_KEY,
    backend: 'https://nuclia.cloud/api',
  });
} else {
    console.warn("Nuclia credentials (VITE_NUCLIA_KBID, VITE_NUCLIA_API_KEY) not found in environment. AI search will use mock data.");
}

interface AIResult {
  answer: string;
  sources: Resource[];
}

// Stubbed Nuclia service
export const nucliaService = {
  ask: async (query: string): Promise<AIResult> => {
    console.log(`Asking Nuclia: "${query}"`);

    // If nuclia client is not initialized, return mock data.
    if (!nuclia) {
      // Return mock data if credentials are not available
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            answer: `This is a mock answer for your question: "${query}". To get real answers from your documents, please set your Nuclia API Key and Knowledge Box ID in the environment settings.`,
            sources: [
              {
                id: 'mock1',
                title: 'Mock Document 1.md',
              } as Resource,
              {
                id: 'mock2',
                title: 'Mock Note.txt',
              } as Resource,
            ],
          });
        }, 1500);
      });
    }

    // Real API call to Nuclia
    try {
      // FIX: Corrected Nuclia find call to use direct property access and type casting to align with the actual SDK behavior, resolving errors from outdated type definitions.
      const results = await firstValueFrom(nuclia.knowledgeBox.find(query, ['generative' as any]));
      
      const answer = (results as any).generative?.text || "No direct answer found. Check the sources below.";

      return {
        answer,
        sources: Object.values((results as any).resources || {}),
      };
    } catch (error) {
      console.error("Error querying Nuclia API:", error);
      throw new Error("Failed to get answer from Nuclia.");
    }
  },
};