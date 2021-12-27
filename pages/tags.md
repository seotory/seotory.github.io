---
title: Tags
permalink: /tags/
---

{% for tag in site.tags %}
<div class="block">
	{% capture tag_name %}{{ tag | first }}{% endcapture %}
	<h4 id="#{{ tag_name | slugize }}">{{ tag_name }}</h4>
	<a name="{{ tag_name | slugize }}"></a>
	<ul>
	{% for post in site.tags[tag_name] %}
		<li><a href="{{ root_url }}{{ post.url }}">{{post.title}}</a></li>
	{% endfor %}
	</ul>
</div>
{% endfor %}
