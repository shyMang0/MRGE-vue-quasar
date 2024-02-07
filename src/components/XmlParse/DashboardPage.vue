<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as XmlJobsApi from '../../api/xml'

const jobListings = ref(<any[]>[])
// function increment() {
// 	clickCount.value += 1
// 	return clickCount.value
// }

onMounted(async () => {
	fetchDashboard()
})

async function fetchDashboard() {
	const res = await XmlJobsApi.fetchXmlJobs()
	// console.log('rows', res['workzag-jobs'])
	jobListings.value = res['workzag-jobs']?.position
}

function openJobLink(jobId: string) {
	window.open(`http://example.com/jobs/${jobId}`, '_blank')
}
</script>
<template>
	<!-- q-gutter-sm -->
	<div class="row q-pa-md q-gutter-sm">
		<!-- <q-card v-for="jobs in jobListings" :key="jobs.id" class="my-card" flat bordered>
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
		</q-card> -->
		<div class="q-pa-md my-card" v-for="jobs in jobListings" :key="jobs.id">
			<q-card bordered>
				<q-card-section>
					<div class="text-h6">{{ jobs.name }}</div>
					<div class="text-subtitle2">{{ jobs.subcompany }} - {{ jobs.office }}</div>
				</q-card-section>

				<q-card-section class="q-pt-xs">
					<q-chip clickable color="indigo-5" text-color="white" size="small" class="text-capitalize" square> {{ jobs.employmentType }} </q-chip>
					<q-chip clickable color="blue-7" text-color="white" size="small" class="text-capitalize" square> {{ jobs.schedule }} </q-chip>
					<div class="text-body1 text-capitalize"><span class="text-caption">Department:</span> {{ jobs.department }}</div>
					<div class="text-body1 text-capitalize"><span class="text-caption">Occupation Category:</span> {{ jobs.occupationCategory.replace(/_/g, ' ') }}</div>
					<div class="text-body1 text-capitalize"><span class="text-caption">Occupation:</span> {{ jobs.occupation.replace(/_/g, ' ') }}</div>
					<div class="text-body1 text-capitalize"><span class="text-caption">Recruiting Category:</span> {{ jobs.recruitingCategory }}</div>
					<!-- <div class="text-body1"><span class="text-caption">Employment Type:</span> {{ jobs.employmentType }}</div> -->
					<div class="text-body1 text-capitalize"><span class="text-caption">Seniority:</span> {{ jobs.seniority }}</div>
					<!-- <div class="text-body1"><span class="text-caption">Schedule:</span> {{ jobs.schedule }}</div> -->
					<div class="text-body1 text-capitalize"><span class="text-caption">Years of Experience:</span> {{ jobs.yearsOfExperience }}</div>
					<div class="text-body1 text-capitalize"><span class="text-caption">Created At:</span> {{ jobs.createdAt }}</div>
				</q-card-section>

				<q-card-section>
					<div class="text-body2">Job Description:</div>
					<div class="text-body2">
						<ul v-if="jobs.jobDescriptions">
							<li v-for="(jd, i) in jobs.jobDescriptions.jobDescription" :key="i">
								{{ jd.name }}
								<p v-html="jd.value"></p>
							</li>
						</ul>
					</div>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat color="primary" label="Apply" @click="openJobLink(jobs.id)" />
					<q-btn flat color="grey-4" icon="more_vert" />
				</q-card-actions>
			</q-card>
		</div>
	</div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
