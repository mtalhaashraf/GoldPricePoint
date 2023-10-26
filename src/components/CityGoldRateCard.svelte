<script lang="ts">
	import { cityIcons, type CityIcon } from '../assets/img/cities';

	export let image: CityIcon;
	export let title = '';
	export let path = '';
</script>

<div>
	<img src={cityIcons[image]} alt={title} />

	<a href={path}>{title}</a>
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		gap: 3rem;

		img {
			width: 6rem;
		}

		a {
			font-size: 1.5rem;
			color: #ff0909;
		}
	}
</style>
