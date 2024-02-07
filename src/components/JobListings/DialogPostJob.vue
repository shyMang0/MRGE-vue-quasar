<script setup lang="ts">
import { ref } from 'vue'
import { QForm, useQuasar } from 'quasar'
import * as JobListingApi from '../../api/jobs'

defineProps({
	dialog: {
		type: Boolean,
		required: true
	}
})
const emit = defineEmits(['closeForm'])

const $q = useQuasar()
const myForm = ref<QForm | null>(null)
// DATA

const edit_state = ref<JobListings>({
	created_by: '',
	title: '',
	description: ''
})

const loading = ref<boolean>(false)
async function dialogOpened() {
	edit_state.value = {
		created_by: '',
		title: '',
		description: ''
	}
}

function dialogClosed() {
	emit('closeForm', null)
}

async function saveChanges() {
	const isValid = myForm.value ? await myForm.value.validate() : false
	if (!isValid) {
		$q.notify({
			message: 'Please complete the required information.',
			position: 'top',
			color: 'red'
		})
		return
	}

	loading.value = true
	try {
		const res = await JobListingApi.insertJobListing(edit_state.value)
		console.log('save this', res)
		$q.notify({
			message: 'Successfully saved!',
			position: 'top',
			color: 'green'
		})
		emit('closeForm', true)
	} catch (error: any) {
		$q.notify({
			message: error.message || 'Error in saving information!',
			position: 'top',
			color: 'red'
		})
	}
	loading.value = false
}

function addTemplate() {
	edit_state.value.description =
		' Als Senior Customer Success Manager beim shopping24 commerce network übernimmst Du eine strategische Rolle bei der Entwicklung und Pflege unserer Advertiser. Du arbeitest eng mit bestehenden und potenziellen Partnern zusammen, um die Marketingziele zu verstehen und maßgeschneiderte Lösungen anzubieten. Deine Aufgaben umfassen:<ul><li>Partnerschaftsentwicklung: Identifikation, Akquisition und Betreuung neuer Geschäftspartner, einschließlich E-Commerce-Unternehmen, Brands und Retailer.</li><li>Strategische Beratung: Verstehen der Geschäftsanforderungen der Partner und Beratung hinsichtlich der bestmöglichen Integration in unser commerce network Entwicklung von individuellen Strategien zur Steigerung der Sichtbarkeit und des Umsatzes unserer Partner.</li><li>Beziehungsaufbau mit Shops und passenden Publishern: Aufbau und Pflege langfristiger Partnerschaften. Regelmäßiger Austausch, Beziehungspflege und proaktive Kommunikation, um Partnerschaften zu stärken.</li><li>KPI Management: Analyse der Leistung von Partnerschaften. Identifikation von Chancen zur Optimierung von Programmen und zur Erreichung der definierten Ziele.</li><li>Verhandlungsführung: Verhandlungen von Partnerschaftsverträgen, Konditionen und Vereinbarungen. Sicherstellen einer Win-Win-Situation für unsere Partner und uns.</li><li>Teamübergreifende Zusammenarbeit: Zusammenarbeit mit internen Teams wie Sales, Marketing und Technologie, um sicherzustellen, dass Partneranforderungen erfüllt und optimale Lösungen angeboten werden.</li><li>Projektmanagement: Entwicklung neuer potentieller Geschäftsbereiche in Zusammenarbeit mit den Tech-Teams.</li><li>Marktbeobachtung: Kontinuierliche Beobachtung der E-Commerce- und digitalen Marketingbranche, um Trends und Entwicklungen zu identifizieren, die für die Partnerschaftsstrategie relevant sein könnten.</li></ul>'
}

interface JobListings {
	id?: string
	title: string
	description: string
	created_by: string
	validated_at?: string
}
</script>

<template>
	<q-dialog :model-value="dialog" @show="dialogOpened" @hide="dialogClosed" position="top" style="background-color: rgba(0, 0, 0, 0.5)">
		<q-card style="width: 500px; max-width: 900px; overflow-y: none">
			<q-toolbar class="bg-primary text-white">
				<q-toolbar-title class="ellipsis text-body1">Create a JobListing</q-toolbar-title>
				<q-space />
				<!-- <q-btn push @click="returnPatient(null)" icon="sym_o_close" flat dense size="md" class="row justify-end slim-button" /> -->
			</q-toolbar>
			<q-card-section v-if="edit_state" class="">
				<q-form ref="myForm">
					<q-card flat bordered class="q-mb-md">
						<q-card-section class="row q-px-sm q-py-sm q-col-gutter-xs">
							<div class="col-sm-12 col-xs-12">
								<q-input
									v-model="edit_state.created_by"
									:rules="[(val: string) => (val && val.length > 0) || '']"
									outlined
									autofocus
									input-debounce="0"
									label="Email"
								>
								</q-input>
							</div>
						</q-card-section>
						<q-card-section class="row q-px-sm q-py-sm q-col-gutter-xs">
							<div class="col-sm-12 col-xs-12">
								<q-input
									v-model="edit_state.title"
									:rules="[(val: string) => (val && val.length > 0) || '']"
									outlined
									input-debounce="0"
									label="Title"
									list="browsers"
								>
								</q-input>
								<datalist id="browsers">
									<option value="Customer Success Manager (m/w/d)"></option>
									<option value="Strategic Partnership Manager (m/w/d)"></option>
									<option value="Technical Sales Engineer (m/f/d)"></option>
									<option value="Customer Success Manager (m/w/d)"></option>
								</datalist>
							</div>
						</q-card-section>
						<q-separator class="q-my-sm" />

						<q-card-section class="row q-px-sm q-py-sm q-col-gutter-xs" style="">
							<div class="col-sm-12 col-xs-12">
								<q-input
									v-model="edit_state.description"
									:rules="[(val: string) => (val && val.length > 0) || '']"
									type="textarea"
									outlined
									input-debounce="0"
									label="Description"
									hide-bottom-space
								>
								</q-input>
								<q-btn size="xs" flat color="indigo" @click="addTemplate">add template</q-btn>
							</div>
						</q-card-section>
					</q-card>
				</q-form>
				<div class="row justify-end">
					<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
						<q-fab v-if="!loading" color="indigo-6" icon="how_to_reg" direction="left" padding="sm">
							<template v-slot:label="{ opened }">
								<div :class="{ 'example-fab-animate--hover': opened !== true }">
									{{ opened !== true ? 'Save' : 'Cancel' }}
								</div>
							</template>

							<q-fab-action color="teal-6" @click="saveChanges()" icon="check" label="Confirm" />
						</q-fab>
					</transition>
				</div>
			</q-card-section>
			<q-inner-loading :showing="loading && !!edit_state" label="Please wait...">
				<q-spinner-gears size="50px" color="primary" />
				Loading...
			</q-inner-loading>
		</q-card>
	</q-dialog>
</template>
