# Sources:
# http://jasonseifer.com/2010/04/06/rake-tutorial
# http://elia.wordpress.com/2008/11/07/get-input-in-rake-tasks/
# http://www.layouts-the.me/rake/2011/04/23/rake_tasks_for_jekyll/

# Asking for title
def ask message
print message
STDIN.gets.chomp
end

namespace "post" do
  #Create new a post
  task :new do #default
    title = ask('Title: ')
    category = ask('Category: ')
    filename = category + (category ? "/" : "") + "#{Time.now.strftime('%Y-%m-%d')}-#{title.gsub(/\s/, '-').downcase}.markdown"
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
---
문서를 작성해주세요.
  EOS
    end

    # invoke Textmate to edit file
    # sh "mate #{path}"
  end
end