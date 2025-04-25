---
layout: default
title: Blog
---

<section>
  <h2>Latest Posts</h2>

  <div class="grid">
    {% for post in site.posts %}
      <div class="project-tile blog-post">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
        <p>{{ post.summary | default: post.excerpt | strip_html | truncate: 150 }}</p>
        <a href="{{ post.url }}">Read more →</a>
      </div>
    {% endfor %}
  </div>
</section>
