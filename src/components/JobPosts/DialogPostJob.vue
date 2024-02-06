<script setup lang="ts">
import { ref, computed } from 'vue'
import { QForm, useQuasar } from 'quasar'
import * as JobListingApi from '../../api/jobs'

const props = defineProps({
	dialog: {
		type: Boolean,
		required: true
	}
})
const emit = defineEmits(['closeForm'])

const $q = useQuasar()
const myForm = ref<QForm | null>(null)
// DATA

const edit_state = ref({})

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
								<q-input v-model="edit_state.title" :rules="[(val: string) => (val && val.length > 0) || '']" outlined input-debounce="0" label="Title">
								</q-input>
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
								>
								</q-input>
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
