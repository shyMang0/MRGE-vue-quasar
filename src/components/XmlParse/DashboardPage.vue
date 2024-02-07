<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as XmlJobsApi from '../../api/xml'

const jobListings = ref(<any[]>[])

onMounted(async () => {
	fetchDashboard()
})

async function fetchDashboard() {
	const res = await XmlJobsApi.fetchXmlJobs()
	jobListings.value = res['workzag-jobs']?.position
}

function openJobLink(jobId: string) {
	window.open(`http://example.com/jobs/${jobId}`, '_blank')
}
</script>
<template>
	<!-- q-gutter-sm -->
	<div class="q-pa-sm q-pb-none q-mx-lg">
		<q-banner inline-actions rounded class="bg-indigo-3"> https://mrge-group-gmbh.jobs.personio.de/xml </q-banner>
	</div>
	<div class="row q-pa-md q-gutter-sm">
		<div class="q-pa-md my-card" v-for="jobs in jobListings" :key="jobs.id">
			<q-card bordered>
				<q-card-section class="q-pb-none">
					<div class="text-h6">{{ jobs.name }}</div>
					<div class="text-subtitle2">{{ jobs.subcompany }} - {{ jobs.office }}</div>
				</q-card-section>

				<q-card-section class="q-pt-xs">
					<q-chip clickable color="indigo-5" text-color="white" size="small" class="text-capitalize" square> {{ jobs.employmentType }} </q-chip>
					<q-chip clickable color="blue-8" text-color="white" size="small" class="text-capitalize" square> {{ jobs.schedule }} </q-chip>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Department:</span> <span class="text-body2">{{ jobs.department }}</span>
					</div>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Occupation Category:</span> <span class="text-body2">{{ jobs.occupationCategory.replace(/_/g, ' ') }}</span>
					</div>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Occupation:</span> <span class="text-body2 text-capitalize">{{ jobs.occupation.replace(/_/g, ' ') }}</span>
					</div>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Recruiting Category:</span> <span class="text-body2">{{ jobs.recruitingCategory }}</span>
					</div>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Seniority:</span> <span class="text-body2">{{ jobs.seniority }}</span>
					</div>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Years of Experience:</span> <span class="text-body2">{{ jobs.yearsOfExperience }}</span>
					</div>
					<div class="text-body1 text-capitalize">
						<span class="text-caption">Created At:</span> <span class="text-body2">{{ jobs.createdAt }}</span>
					</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<div class="text-body2">Job Description</div>
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
