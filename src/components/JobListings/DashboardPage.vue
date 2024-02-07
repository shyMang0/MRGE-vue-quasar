<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as JobListingApi from '../../api/jobs'
import DialogPostJob from './DialogPostJob.vue'

const jobListings = ref(<JobListings[]>[])
const openDialogJob = ref(false)

interface JobListings {
	id: string
	title: string
	description: string
	created_by: string
	validated_at: string
}

onMounted(async () => {
	fetchDashboard()
})

async function fetchDashboard() {
	jobListings.value = await JobListingApi.getAllJobListings()
}

function DialogJobClosed(val: boolean) {
	openDialogJob.value = false
	if (val) {
		fetchDashboard()
	}
}
</script>
<template>
	<q-btn class="q-ml-xl q-mt-md" outline color="indigo" @click="openDialogJob = true">Create New Job Listing</q-btn>
	<div class="row q-pa-md q-gutter-sm">
		<q-card v-for="jobs in jobListings" :key="jobs.id" class="my-card" flat bordered>
			<q-item>
				<q-item-section avatar>
					<q-avatar>
						<q-icon name="account_circle" />
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label class="ellipsis">{{ jobs.title }}</q-item-label>
					<q-item-label class="text-indigo ellipsis"> {{ jobs.created_by }} </q-item-label>
				</q-item-section>
			</q-item>
			<q-separator />
			<q-card-section> {{ jobs.description }} </q-card-section>
			<template v-if="!jobs.validated_at">
				<q-separator />
				<q-card-actions>
					<q-btn flat color="indigo">Approve</q-btn>
					<q-btn flat color="red-8">Decline</q-btn>
				</q-card-actions>
			</template>
			<q-card-actions v-else class="text-italic text-green-6 text-weight-light text-caption"> validated @ {{ jobs.validated_at }}</q-card-actions>
		</q-card>
	</div>
	<DialogPostJob :dialog="openDialogJob" @closeForm="DialogJobClosed" />
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
