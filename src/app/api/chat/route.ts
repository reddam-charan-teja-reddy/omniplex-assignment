import { AzureOpenAI } from 'openai';
import type {
	ChatCompletion,
	ChatCompletionCreateParamsNonStreaming,
} from 'openai/resources/index';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiVersion = '2024-08-01-preview';
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deploymentName = process.env.AZURE_DEPLOYMENT_ID;

function getClient(): AzureOpenAI {
	return new AzureOpenAI({
		endpoint,
		apiKey,
		apiVersion,
	});
}

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '../../../../firebaseConfig';

const openai = getClient();

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const { messages, model } = await req.json();
		console.log('inside chat api.ts', messages, model);

		const response = await openai.chat.completions.create({
			stream: true,
			model: model,
			messages: messages,
		});

		const stream = OpenAIStream(response);
		return new StreamingTextResponse(stream);
	} catch (error) {
		const e = await JSON.stringify(error);
		console.error('chat API request error:', error);
		return new Response(JSON.stringify({ message: e }), {
			status: 500,
		});
		throw error;
	}
}
