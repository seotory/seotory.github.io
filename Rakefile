# Sources:
# http://jasonseifer.com/2010/04/06/rake-tutorial
# http://elia.wordpress.com/2008/11/07/get-input-in-rake-tasks/
# http://www.layouts-the.me/rake/2011/04/23/rake_tasks_for_jekyll/

# Asking for title
def ask message
print message
STDIN.gets.chomp
end

# for post build.
namespace "post" do
  #Create new a post
  task :new do #default
    title = ask('Title: ')
    category = ask('Category: ')
    filename = category + (category ? "/" : "") + "#{Time.now.strftime('%Y-%m-%d')}-#{title.gsub(/\s/, '-').downcase}.markdown"

    puts 'title name: ' + title
    puts 'category name: ' + category

    # if is new folder? make folder.
    Dir.mkdir(File.join("_posts", category)) unless File.exists?(File.join("_posts", category))

    # make file
    path = File.join("_posts", filename)
    if File.exist? path; raise RuntimeError.new("File exists #{path}"); end
    File.open(path, 'w') do |file|
      file.write <<-EOS
---
layout: post
title: #{title}
date: #{Time.now.strftime('%Y-%m-%d %k:%M:%S')} +0900
categories: #{category}
published: false
comments: false
tags:
- ''
---
문서를 작성해주세요.
EOS
    puts '성공적으로 [' + path + ']경로에 파일을 생성하였습니다.'
    end

    # invoke Textmate to edit file
    # sh "mate #{path}"
  end
end



# for cate build.
namespace "cate" do
  #Create new cate index file
  task :new do #default
    category = ask('Category: ')
    filename = "index.html"

    if category == ''
      raise('category가 입력되지 않았습니다. 작업에 실패하였습니다.')
    end

    puts 'category가 입력되었습니다. 하위에 index.html을 생성합니다.'

    # if is new folder? make folder.
    Dir.mkdir(category) unless File.exists?(category)

    # make file
    path = File.join(category, filename)
    if File.exist? path; raise RuntimeError.new("File exists #{path}"); end
    File.open(path, 'w') do |file|
      file.write <<-EOS
---
layout: list
---

{% include cateList.html name="#{category}" %}
EOS
    puts '성공적으로 [' + path + ']경로에 파일을 생성하였습니다.'
    end
  end
end