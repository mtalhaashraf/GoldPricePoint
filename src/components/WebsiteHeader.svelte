<script lang="ts">
	import { userSelectedData } from '$lib/stores/userSelectedData';
	import { generateDateString } from '$lib/utils/generateDateString';
	import { IMG_HEADER_BANNER } from '@@asset/img';
	import { onMount } from 'svelte';
	// import type { Datepicker as TDatePicker } from 'vanillajs-datepicker';
	// import 'vanillajs-datepicker/sass/datepicker.scss';
	import 'vanillajs-datepicker/css/datepicker-bs5.css';
	import 'vanillajs-datepicker/css/datepicker.css';

	onMount(async () => {
		let DatePicker = (await import('vanillajs-datepicker')).Datepicker;
		const datepicker_element = document.getElementById('history-date-picker');
		// const history_datepicker_box = document.getElementById('history-date-picker-box');

		const datepicker = new DatePicker(datepicker_element as HTMLInputElement, {
			buttonClass: 'btn',
			updateOnBlur: true,
			showDaysOfWeek: true,
			showOnClick: true,
			showOnFocus: true,
			defaultViewDate: $userSelectedData.dateString,
			autohide: true
		});

		function eventListener() {
			const selected_date = new Date(datepicker.dates[0]);
			$userSelectedData.date = selected_date;
			$userSelectedData.dateString = generateDateString(selected_date);
		}

		datepicker_element?.addEventListener('hide', eventListener);

		return () => {
			datepicker_element?.removeEventListener('hide', eventListener);
		};
	});
</script>

<header class="website-header">
	<div class="header-wrapper">
		<div class="header-banner">
			<img draggable="false" src={IMG_HEADER_BANNER} class="h-100" alt="" />
		</div>
		<label class="header-date-picker" for="history-date-picker" tabindex="-1">
			<div class="date-picker__wrapper">
				<div class="date-picker__icon">
					<svg width="36" height="43" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M32 4.43953H30.25V0.621399H26.75V4.43953H9.25001V0.621399H5.75001V4.43953H4.00001C2.07501 4.43953 0.500008 6.15768 0.500008 8.25765V38.8027C0.500008 40.9026 2.07501 42.6208 4.00001 42.6208H32C33.925 42.6208 35.5 40.9026 35.5 38.8027V8.25765C35.5 6.15768 33.925 4.43953 32 4.43953ZM32 8.25765V13.9848H4.00001V8.25765H32ZM4.00001 38.8027V17.803H32V38.8027H4.00001Z"
							fill="#B07818"
						/>
						<path opacity="0.3" d="M3.99999 8.27679H32V13.9849H3.99999V8.27679Z" fill="#4D4D4D" />
					</svg>
				</div>
				<div class="date-picker__date" id="">
					<input
						class="mb-0 text-warning"
						readonly
						id="history-date-picker"
						bind:value={$userSelectedData.dateString}
					/>
					<p class="mb-0 text-warning">{$userSelectedData.dateString}</p>
				</div>
				<div class="date-picker__down-arrow">
					<svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16.9642 0.615164C16.3717 0.0100847 15.3978 0.00955396 14.8046 0.613987L10.4275 5.07443C9.64349 5.87333 8.35651 5.87332 7.57252 5.07443L3.19535 0.613986C2.60221 0.00955297 1.62833 0.0100854 1.03584 0.615165V0.615165C0.460274 1.20297 0.460274 2.14307 1.03584 2.73087L7.571 9.40489C8.35531 10.2059 9.64469 10.2059 10.429 9.40489L16.9642 2.73087C17.5397 2.14307 17.5397 1.20296 16.9642 0.615164V0.615164Z"
							fill="#B07818"
						/>
					</svg>
				</div>
			</div>
		</label>
	</div>
</header>

<style lang="scss">
	@use '../scss/components/websiteHeader' as *;
</style>
