

<% if(typeof(items) === 'undefined'){ %>
	
	<h1 class="home-video-empty">No video</h1>

<% }else{

	_.each(items, function(item){ %>

		<div class="home-video-thumb" data-id="<%= item._id %>">
			<h4 class="home-video-thumb-title"><%= item.title %></h4>
		</div>

	<%}); 

} %>

