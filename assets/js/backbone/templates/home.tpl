
<h1>my video</h1>



<%
if(typeof(items)=="undefined"){ %>
	
	<div class="home-video-empty">No video</div>

<% }else{
	_.each(items, function(item){ %>

		<div class="home-video-thumb">
			<h4 class="home-video-thumb-title"><%= item.title %></h4>
		</div>

<% 	}); 
} %>

