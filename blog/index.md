---
layout: default
title: Blog
---

<h1>Joel’s Blog</h1>
<div class="blog-posts">
  {% for post in site.posts %}
    <div class="blog-post">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html }}</p>
      <span class="date">Posted: {{ post.date | date: "%B %d, %Y" }}</span>
    </div>
  {% endfor %}
</div>
