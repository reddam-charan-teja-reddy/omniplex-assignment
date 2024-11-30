import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '../../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const key = process.env.BING_API_KEY;
const BING_SEARCH_URL = 'https://api.bing.microsoft.com/v7.0/search';

export const runtime = 'edge';

const errApp = initializeFirebase();
const db = getFirestore(errApp);

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get('q');

	if (!q || typeof q !== 'string') {
		return new NextResponse(
			JSON.stringify({
				message: 'Query parameter "q" is required and must be a string.',
			}),
			{ status: 400 }
		);
	}

	if (!key) {
		console.error(
			'Bing API key is undefined. Please check your .env.local file.'
		);
		return new NextResponse(
			JSON.stringify({ message: 'Bing API key is not configured.' }),
			{ status: 500 }
		);
	}

	try {
		const response = await fetch(
			`${BING_SEARCH_URL}?q=${encodeURIComponent(q)}`,
			{
				method: 'GET',
				headers: new Headers({
					'Ocp-Apim-Subscription-Key': key || '',
				}),
			}
		);

		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}`
			);
		}

		const data = await response.json();
		console.log('Bing API response:', data);
		return NextResponse.json({ message: 'Success', data });
	} catch (error) {
		await addDoc(collection(db, 'errors'), {
			error,
			timestamp: new Date(),
			route: 'tools',
		});

		console.error('Bing API request error:', error);
		return new NextResponse(
			JSON.stringify({ message: 'Internal Server Error' }),
			{ status: 500 }
		);
	}
}
