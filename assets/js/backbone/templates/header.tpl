
<!-- Navigation Toggle Button -->			
<div class="header-navigation-button"></div>

<!-- Vidi Search Input -->
<div class="header-search">
	<input class="header-search-input" type="text" placeholder="kittens">
</div>

<!-- Header Title -->
<div class="header-title">vidi</div>

<!-- Login & SignUp Form -->
<div class="header-form-toggle header-form-login-toggle"></div>
<div class="header-form-container header-form-login-container">
	<form class="header-form header-form-login" method="post">
		
		<!-- form input -->
		<input autocomplete="off" placeholder="username" name="user-name" class="header-form-input header-form-name-input" type="text">
		<input placeholder="password" name="user-password" class="header-form-input header-form-password-input" type="password">
		
		<!-- form button -->
		<button class="header-form-input-button" type='submit'>Login</button>
		<div class="header-form-separator">or</div>
		<button class="header-form-input-button header-form-create-user">Sign up</button>

		<!-- form node alert -->
		<div class="header-form-alert"></div>
	</form>				
</div>

<!-- Log Out Form Toggle -->
<div class="header-form-toggle header-form-logout-toggle" title="Log Out"></div>
<!-- Log Out Form -->
<div class="header-form-container header-form-logout-container">
	<form action="" class="header-form header-form-logout">
		<p>Log Out ?</p>
		<button class="header-form-input-button header-form-logout-confirm">yes</button>
		<button class="header-form-input-button header-form-logout-hide">no</button>
	</form>
</div>

<!-- Video Upload Form Toggle -->
<div class="header-form-toggle header-form-upload-toggle"></div>
<!-- Video Upload Form -->
<div class="header-form-container header-form-upload-container">
	<form method="post" action="/post" class="header-form header-form-upload" enctype="multipart/form-data">
		<div class="header-form-input-button header-form-upload-input-overlay">Upload Video</div>
		<input class="header-form-input-button header-form-upload-input" name="video" type="file">
		<div class="header-form-upload-drop">drop video</div>
		<div class="header-form-upload-progress"></div>
	</form>
</div>