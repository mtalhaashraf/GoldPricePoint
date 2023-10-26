<script>
	let show = false;

	const showDropdown = () => {
		show = true;
	};

	const hideDropdown = () => {
		show = false;
	};
</script>

<div on:mouseover={showDropdown} on:mouseleave={hideDropdown} class="dropdown">
	<a class="navbar-link dropdown-toggle" type="button"> Dropdown button </a>
	<ul class="dropdown-menu" class:d-block={show}>
		<li><a class="dropdown-item" href="#">Action</a></li>
		<li>
			<a class="dropdown-item" href="#">Another action</a>
		</li>
		<li>
			<a class="dropdown-item" href="#"> Submenu &raquo; </a>
			<ul class="dropdown-menu dropdown-submenu">
				<li>
					<a class="dropdown-item" href="#">Submenu item 1</a>
				</li>
				<li>
					<a class="dropdown-item" href="#">Submenu item 2</a>
				</li>
				<li>
					<a class="dropdown-item" href="#">Submenu item 3 &raquo; </a>
					<ul class="dropdown-menu dropdown-submenu">
						<li>
							<a class="dropdown-item" href="#">Multi level 1</a>
						</li>
						<li>
							<a class="dropdown-item" href="#">Multi level 2</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="dropdown-item" href="#">Submenu item 4</a>
				</li>
				<li>
					<a class="dropdown-item" href="#">Submenu item 5</a>
				</li>
			</ul>
		</li>
	</ul>
</div>

<style>
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
