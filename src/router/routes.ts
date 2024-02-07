import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/IndexPage.vue') },
			{ path: 'jobListings', name: 'Job Listings', component: () => import('components/JobListings/IndexPage.vue') },
			{ path: 'xml', name: 'Job Posts', component: () => import('components/XmlParse/IndexPage.vue') }
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
]

export default routes
