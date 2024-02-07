<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import EssentialLink, { EssentialLinkProps } from '../components/EssentialLink.vue'

const route = useRoute()

const essentialLinks: EssentialLinkProps[] = [
	{
		title: 'Home',
		icon: 'home',
		link: '/'
	},
	{
		title: 'User Story 1',
		caption: 'Job Post Notification',
		icon: 'code',
		link: '/jobListings'
	},
	{
		title: 'User Story 2',
		caption: 'XML Parse',
		icon: 'rss_feed',
		link: '/xml'
	}
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

				<q-toolbar-title> {{ route.name ?? 'App' }}</q-toolbar-title>

				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="200" :breakpoint="1200">
			<q-list>
				<q-item-label header> Links </q-item-label>

				<EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>
