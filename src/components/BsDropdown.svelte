<script lang="ts">
	import type { Dropdown as TDropdown } from 'bootstrap';
	import { onMount } from 'svelte';
	import { nanoid } from 'nanoid';

	type DropdownItems = {
		label: string;
		value?: any;
	};

	export let id = `modal-${nanoid(10)}`,
		label = 'Dropdown',
		className = '',
		btnClassName = '',
		items: DropdownItems[] = [];
	export let selectedItem: DropdownItems | null = null;

	let dropdown: TDropdown;

	onMount(async () => {
		const DropDown = (await import('bootstrap')).Dropdown;
		dropdown = new DropDown(window.document.querySelector(`#${id} .dropdown-toggle`)!);
	});
</script>

<div class="dropdown {className}" {id}>
	<button class="btn dropdown-toggle {btnClassName}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		{selectedItem?.label || label}
	</button>
	<ul class="dropdown-menu">
		{#each items as item}
			<li on:click={() => (selectedItem = item)} on:keypress={null}>
				<span class="dropdown-item">{item.label}</span>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
</style>
