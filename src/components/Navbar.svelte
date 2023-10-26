<script lang="ts">
	let show_nav_content = false;
	import { userSelectedData } from '$lib/stores/userSelectedData';
	import { goto } from '$app/navigation';
	import countries from '@@asset/countries.json';
	import { has, pipe, prop, isEmpty, complement, both, filter, either, ifElse, always, is, propIs } from 'ramda';

	let show = false;

	let innerWidth: number;

	let isSmallScreen = false;

	$: isSmallScreen = innerWidth <= 991;

	const showDropdown = () => {
		show = true;
	};

	const hideDropdown = () => {
		show = false;
	};

	function handleCountryChange(route: any) {
		console.log(route);
		// goto('/' + route);
	}

	const isActive = ifElse(
		has('active'),
		pipe(ifElse(propIs(Boolean, 'active'), prop('active'), always(true))),
		always(true)
	);

	const filterNonActive = filter(isActive);

	const navigate = (e: any) => {
		hideDropdown()
		show_nav_content = false;
		goto(
			'/' + e.target.id
			// ,
			// {
			// 	replaceState: true
			// }
		);
	};

	const areRegionsExist = both(has('regions'), pipe(prop('regions'), complement(isEmpty)));
</script>

<svelte:window bind:innerWidth />

<nav class="navbar">
	<div class="navbar-inner">
		<div class="navbar-container">
			<div class="company-logo-container">
				<a href="/" style="text-decoration: none">
					<h5 style="color: black" class="company-logo">Company Logo</h5>
				</a>
			</div>
			<div class="mobile-menu-toggler d-lg-none" on:click={() => (show_nav_content = true)} on:keydown={null}>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"
					><path
						fill="currentColor"
						d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"
					/></svg
				>
			</div>
			<div class="navbar-items-wrapper" class:active={show_nav_content}>
				<div class="py-3 text-center d-lg-none">
					<button type="button" class="btn-close" on:click={() => (show_nav_content = false)} aria-label="Close" />
				</div>

				<ul class="navbar-item-list">
					<li class="navbar-item">
						<a
							id=""
							href="/"
							rel="noreferrer"
							on:click|preventDefault={navigate}
							class="navbar-link"
							data-sveltekit-preload-data="off">Home</a
						>
					</li>

					<!-- Dropdown -->
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					{#if isSmallScreen}
						{#each filterNonActive(countries) as country (country.id)}
							<li class="navbar-item">
								<a style="text-decoration: none;" id={`${country.id}`} href="/" rel="noreferrer" on:click|preventDefault={navigate} class="navbar-link"
									>{country.name}</a
								>
							</li>
						{/each}
					{:else}
						<li
							on:mouseover={showDropdown}
							on:mouseleave={hideDropdown}
							class="navbar-item dropdown"
						>
							<a href="/" referrerpolicy="no-referrer" class="navbar-link dropdown-toggle"> Countries </a>
							<ul class="dropdown-menu gold-dropdown" class:d-block={show}>
								{#each filterNonActive(countries) as country (country.id)}
									{#if areRegionsExist(country)}
										<li>
											<a
												class="dropdown-item"
												id={`${country.id}`}
												href="/"
												rel="noreferrer"
												on:click|preventDefault={navigate}>{country.name} &raquo;</a
											>
											<ul class="dropdown-menu dropdown-submenu">
												{#each filterNonActive(country.regions || []) as region (region.id)}
													<li>
														<a
															class="dropdown-item"
															id={`${country.id}/${region.id}`}
															href="/"
															rel="noreferrer"
															on:click|preventDefault={navigate}>{region.name}</a
														>
													</li>
												{/each}
											</ul>
										</li>
									{:else}
										<li>
											<a
												class="dropdown-item"
												id={`${country.id}`}
												href="/"
												rel="noreferrer"
												on:click|preventDefault={navigate}>{country.name}</a
											>
										</li>
									{/if}
								{/each}
							</ul>
						</li>
					{/if}

					<!--  -->

					<li class="navbar-item">
						<a id="about" href="/" rel="noreferrer" on:click|preventDefault={navigate} class="navbar-link">About Us</a>
					</li>
				</ul>
			</div>

			<div class="socials-icon">
				<a style="text-decoration: none; color:inherit;" target="_blank" href="https://youtube.com/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						class="bi bi-youtube"
						viewBox="0 0 16 16"
					>
						<path
							d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
						/>
					</svg>
				</a>

				<a style="text-decoration: none; color:inherit;" target="_blank" href="https://www.facebook.com/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						class="bi bi-facebook"
						viewBox="0 0 16 16"
					>
						<path
							d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	@use '../scss/components/navbar';

	.dropdown-menu li {
		position: relative;
	}
	.dropdown-menu .dropdown-submenu {
		display: none;
		position: absolute;
		left: 100%;
		top: -7px;
	}
	.dropdown-menu .dropdown-submenu-left {
		right: 100%;
		left: auto;
	}
	.dropdown-menu > li:hover > .dropdown-submenu {
		display: block;
	}
</style>
