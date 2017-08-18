# path 경로 편하게 보기

```
echo $PATH | tr ":" "\n"
```

# linux while 이용해서 로그 찍기

```
while true; do [실행문]; sleep 2; done
```

# grep regex(정규식) 사용하기

```
keys *.category.shop | grep -ie "[0-9].*shop"
```

# 파일내에서 검색

```
grep -rnw '/path/to/somewhere/' -e "pattern"
```

-r or -R is recursive,
-n is line number, and
-w stands for match the whole word.
-l (lower-case L) can be added to just give the file name of matching files.

Along with these, --exclude, --include, --exclude-dir or --include-dir flags could be used for efficient searching:

This will only search through those files which have .c or .h extensions:
grep --include=\*.{c,h} -rnw '/path/to/somewhere/' -e "pattern"
This will exclude searching all the files ending with .o extension:
grep --exclude=*.o -rnw '/path/to/somewhere/' -e "pattern"
Just like exclude files, it's possible to exclude/include directories through --exclude-dir and --include-dir parameter. For example, this will exclude the dirs dir1/, dir2/ and all of them matching *.dst/:
grep --exclude-dir={dir1,dir2,*.dst} -rnw '/path/to/somewhere/' -e "pattern"
This works very well for me, to achieve almost the same purpose like yours.

For more options check man grep.

# 실시간 접속자

netstat -napt | grep 1883 | grep EST | wc -l

# 폴더별로 env를 관리해야 할 때

https://blog.outsider.ne.kr/1306
https://direnv.net/