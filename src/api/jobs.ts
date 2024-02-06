import axios from 'axios'
const api_url = 'http://localhost:3000'
export async function getAllJobListings(): Promise<any> {
	try {
		const res = await axios.get(`${api_url}/jobListings`)
		return res.data
	} catch (error: any) {
		console.log('getAllJobListings error', error)
		return error
	}
}

export async function insertJobListing(data: any): Promise<any> {
	try {
		const res = await axios.post(`${api_url}/jobListings`, data)
		return res.data
	} catch (error: any) {
		console.log('insertJobListing error', error.response.data?.message || error)
		throw new Error(error.response.data?.message || error)
	}
}

export async function preadmissionDashboard(date: any): Promise<any> {
	try {
		const res = await axios.get('/eforms/api/preadmission/preAdmissionDashboard', { params: { date } })
		return res.data
	} catch (error: any) {
		console.log('preadmissionDashboard error', error)
		return error
	}
}

export async function linkHpercode(id: number, hpercode: string): Promise<string> {
	try {
		const res = await axios.patch('/eforms/api/preadmission/linkHpercode', { id, hpercode })
		return res.data
	} catch (error: any) {
		console.log('linkHpercode error', error)
		return error
	}
}

export async function unlinkHpercode(id: number): Promise<string> {
	try {
		const res = await axios.patch('/eforms/api/preadmission/unlinkHpercode', { id })
		return res.data
	} catch (error: any) {
		console.log('unlinkHpercode error', error)
		return error
	}
}

export async function deleteRequest(preAdmId: any): Promise<any> {
	try {
		const res = await axios.delete('/eforms/api/preadmission', { params: { preAdmId } })
		return res.data
	} catch (error: any) {
		console.log('deleteRequest error', error)
		return error
	}
}
