---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-09-06 12:04:16
categories: dev
published: true
---
# hi {#header1}
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:


{% highlight ruby linenos %}
def print_hi(name)
	puts "Hi, #{name}"
end
print_hi('Tom')
# prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

~~~ javascript
function test() 
{

}
~~~

test

~~~ javascript linenos
function test() 
{

}
~~~

## test

``` javascript
function test() 
{

}
```

- test
    - 1.1 인가?
{% highlight javascript %}
function test() 
{

}
{% endhighlight %}

> This is a blockquote.
>     on multiple lines
that may be lazy.
>
> This is the second paragraph

> This is a paragraph.
>
> > A nested blockquote.
>
> ## Headers work
>
> * lists too
>
> and all other block-level elements

> A code block:
>
> >
``` javscript
function test() {}
```
>

> This is a paragraph inside
a blockquote.
>
> > This is a nested paragraph
that continues here
> and here
> > and here

``` javascript
function test(){} 
```

>     ruby -e 'puts :works'

~~~
def what?
  42
end
~~~
{: .language-ruby}

- First item A second paragraph
  - nested list

    > blockquote

### test

*   Second item

* {:.cls} This item has the class "cls".
  Here continues the above paragraph.

* This is a normal list item.

- 1qjs
- 2qjs

<span class="icon green">
  <i class="fa fa-rss"></i>한글test
</span>

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$


[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
