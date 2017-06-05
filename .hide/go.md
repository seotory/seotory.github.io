# 환경변수 셋팅 
PATH 셋팅
```
$ export PATH=$PATH:$(go env GOPATH)/bin
```
GOPATH 셋팅해서 가상 환경 구축
```
$ export GOPATH=$(go env GOPATH)
```