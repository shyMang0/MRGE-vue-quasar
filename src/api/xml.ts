import axios from 'axios'
const api_url = 'http://localhost:3000'
export async function fetchXmlJobs(): Promise<any> {
	try {
		const res = await axios.get(`${api_url}/xml`)
		return res.data
	} catch (error: any) {
		console.log('getAllJobListings error', error)
		return error
	}
}
