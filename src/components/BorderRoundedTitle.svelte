<script lang="ts">
	export let className = '',
		id = '';

	interface $$Slots {
		default: {};
		customTag: {};
	}
</script>

<div class="border-rounded-title {className}" {id}>
	{#if $$slots?.default}
		<h1 class="mb-0">
			<slot />
		</h1>
	{:else if $$slots.customTag}
		<slot name="customTag" />
	{/if}
</div>

<style lang="scss">
	@use '../scss/utils/' as *;

	.border-rounded-title {
		border-radius: 1rem 1rem 0 0;
		border: 2px solid $warning;
		padding: 0.5rem 1rem;
		font-family: $font-roboto-con;

		@include media-breakpoint-down(md) {
			border-radius: 0px;
			border-width: 2px 0px;
			background: lighten($color: $warning, $amount: 58);
			text-align: center;
		}

		h1 {
			font-size: 1.8rem;
			color: $warning;
			font-weight: 700;

			@include media-breakpoint-down(sm) {
				font-size: 1.1rem;
			}
		}
	}
</style>
