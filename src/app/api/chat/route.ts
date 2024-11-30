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
		console.error('Error fetching chat completion:', error);
		// Post the error to a given URL
		const errorReportingUrl =
			'https://deploy-nodejs-vercel-8id1ouhb0-charan-tejas-projects-c8450f47.vercel.app/';
		await fetch(errorReportingUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				error,
			}),
		});

		throw error;
	}
}
