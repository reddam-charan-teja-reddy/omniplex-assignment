export const handleMode = async (text: string) => {
	try {
		console.log('inside api.ts before tools api call' + text);
		const response = await fetch('/api/tools', {
			//https://omniplex-assignment.vercel.app/api/tools
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify([
				{
					role: 'system',
					content:
						'You are an Ai Asistant who is supposed to use functions or chat based on the user query.' +
						'If the user wants to search for information, use search function.' +
						'If the user wants to get stock information, use stock function.' +
						'If the user wants to get weather information, use weather function.' +
						'If the user wants to translate text, use translate function.' +
						'If the user wants to get dictionary information, use dictionary function.',
				},
				{ role: 'user', content: text },
			]),
		});
		const data = await response.json();
		console.log('after tools api call iside handle mode in api.ts', data);
		return { mode: data.mode, arg: data.arg };
	} catch (error) {
		console.error('Error fetching mode and arguments:', error);
		throw error;
	}
};
