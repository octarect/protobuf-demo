.PHONY: all

all:

%.pb.go:
	protoc -Iproto --go_out=plugins=grpc:api proto/$*.proto
